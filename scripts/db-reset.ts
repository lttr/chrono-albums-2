import { drizzle } from "drizzle-orm/libsql"
import { reset } from "drizzle-seed"
import config from "../database/drizzle.config"
import * as schema from "../database/schema"

async function main() {
  const db = drizzle(`file:${config.dbCredentials.url}`)

  console.log("Resetting database...")
  await reset(db, schema)
  console.log("Database reset successfully!")
}

main().catch((error) => {
  console.error("Error resetting database:", error)
  process.exit(1)
})
