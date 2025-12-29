import { sql, desc, eq } from "drizzle-orm"
import { db, schema } from "hub:db"

export default defineEventHandler(async (event) => {
  // TODO: Add auth check for admin role
  const query = getQuery(event)
  const status = query.status as string | undefined

  let jobs
  if (status) {
    jobs = await db
      .select()
      .from(schema.job)
      .where(
        eq(
          schema.job.status,
          status as (typeof schema.job.status.enumValues)[number],
        ),
      )
      .orderBy(desc(schema.job.createdAt))
      .limit(100)
  } else {
    jobs = await db
      .select()
      .from(schema.job)
      .orderBy(desc(schema.job.createdAt))
      .limit(100)
  }

  const [stats] = await db
    .select({
      pending: sql<number>`sum(case when status = 'pending' then 1 else 0 end)`,
      processing: sql<number>`sum(case when status = 'processing' then 1 else 0 end)`,
      completed: sql<number>`sum(case when status = 'completed' then 1 else 0 end)`,
      failed: sql<number>`sum(case when status = 'failed' then 1 else 0 end)`,
    })
    .from(schema.job)

  return {
    jobs,
    stats,
  }
})
