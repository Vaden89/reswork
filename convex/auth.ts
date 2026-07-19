import authConfig from './auth.config'
import { components, internal } from './_generated/api'
import { betterAuth } from 'better-auth/minimal'
import { createClient } from '@convex-dev/better-auth'
import type { DataModel } from './_generated/dataModel'
import { query } from './_generated/server'
import { crossDomain, convex } from '@convex-dev/better-auth/plugins'

import type { GenericCtx, AuthFunctions } from '@convex-dev/better-auth'

const siteUrl = process.env.SITE_URL!

console.log(siteUrl)

export const DEFAULT_TOKEN_COUNT = 10

const authFunctions: AuthFunctions = internal.auth

export const authComponent = createClient<DataModel>(components.betterAuth, {
  triggers: {
    user: {
      onCreate: async (ctx, authUser) => {
        await ctx.db.insert('users', {
          authId: authUser._id,
          tokenCount: DEFAULT_TOKEN_COUNT,
        })
      },
      onDelete: async (ctx, authUser) => {
        const user = await ctx.db
          .query('users')
          .withIndex('by_authId', (q) => q.eq('authId', authUser._id))
          .unique()
        if (user) await ctx.db.delete(user._id)
      },
    },
  },
  authFunctions: {
    onCreate: authFunctions.onCreate,
    onDelete: authFunctions.onDelete,
  },
})

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi()

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    trustedOrigins: [siteUrl],
    database: authComponent.adapter(ctx),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [crossDomain({ siteUrl }), convex({ authConfig })],
  })
}

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx)
  },
})
