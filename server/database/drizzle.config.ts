import type { Config } from "drizzle-kit"

export default {
  schema: "./server/database/schema/index.ts",
  out: "./server/database/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "./.data/db.sqlite3", // This matches DB0's default location
  },
} satisfies Config
