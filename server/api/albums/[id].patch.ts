import { eq } from "drizzle-orm"
import { z } from "zod"
import { db, schema } from "hub:db"

const updateSchema = z.object({
  sortOrder: z.enum(["date", "name"]),
})

export default defineEventHandler(async (event) => {
  const session = await getAuthSession(event)
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    })
  }

  const id = getRouterParam(event, "id")
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Album ID is required",
    })
  }

  const body = await readValidatedBody(event, updateSchema.parse)

  const result = await db
    .update(schema.album)
    .set({ sortOrder: body.sortOrder })
    .where(eq(schema.album.id, id))
    .returning({ id: schema.album.id, sortOrder: schema.album.sortOrder })

  if (!result.length) {
    throw createError({
      statusCode: 404,
      message: "Album not found",
    })
  }

  return result[0]
})
