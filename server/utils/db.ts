import { drizzle } from "db0/integrations/drizzle"

let db: ReturnType<typeof drizzle> | null = null

/**
 * # Example usage
 *
 * ```ts
 * const a = useDb()
 * a.select().from(album)
 * ```
 */
export function useDb() {
  if (!db) {
    const db0 = useDatabase()
    db = drizzle(db0)
  }
  return db
}

/**
 * # Example usage
 *
 * ```ts
 * const db = useDatabase()
 * const albums = await db.sql`SELECT * FROM album`
 * ```
 */
export function useDb0() {
  return useDatabase()
}
