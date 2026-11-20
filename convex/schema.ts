import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    authId: v.string(),
    tokenCount: v.number(),
  }).index('by_authId', ['authId']),
})
