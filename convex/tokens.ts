import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { authComponent, DEFAULT_TOKEN_COUNT } from './auth'

export const getTokenCount = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx)
    if (!authUser) return null

    const user = await ctx.db
      .query('users')
      .withIndex('by_authId', (q) => q.eq('authId', authUser._id))
      .unique()

    return user?.tokenCount ?? DEFAULT_TOKEN_COUNT
  },
})

export const deductTokens = mutation({
  args: { amount: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const amount = args.amount ?? 1

    if (!Number.isInteger(amount) || amount <= 0) {
      throw new ConvexError({
        code: 'INVALID_AMOUNT',
        message: 'Amount must be a positive integer',
      })
    }

    const authUser = await authComponent.safeGetAuthUser(ctx)

    if (!authUser) {
      throw new ConvexError({
        code: 'UNAUTHENTICATED',
        message: 'Not signed in',
      })
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_authId', (q) => q.eq('authId', authUser._id))
      .unique()

    if (!user) {
      throw new ConvexError({
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    const balance = user.tokenCount

    if (balance < amount) {
      throw new ConvexError({
        code: 'INSUFFICIENT_TOKENS',
        message: 'Not enough tokens',
        balance,
      })
    }

    const remaining = balance - amount
    await ctx.db.patch(user._id, { tokenCount: remaining })

    return remaining
  },
})
