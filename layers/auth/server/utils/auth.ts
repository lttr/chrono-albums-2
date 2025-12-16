import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "hub:db"
import * as authSchema from "../db/schema"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: authSchema,
  }),
  socialProviders: {
    google: {
      clientId: useRuntimeConfig().auth.google.clientId,
      clientSecret: useRuntimeConfig().auth.google.clientSecret,
    },
  },
  secret: useRuntimeConfig().auth.secret,
  baseURL: useRuntimeConfig().public.authUrl,
  trustedOrigins: [useRuntimeConfig().public.authUrl].filter(Boolean),
})

export type Auth = typeof auth
