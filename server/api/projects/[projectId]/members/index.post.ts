import { eq, and } from "drizzle-orm"
import { db, schema } from "hub:db"
import { z } from "zod/v4"

const inviteSchema = z.object({
  email: z.email(),
})

export default defineEventHandler(async (event) => {
  const projectId = getRouterParam(event, "projectId")

  if (!projectId) {
    throw createError({
      statusCode: 400,
      message: "Project ID is required",
    })
  }

  const session = await getAuthSession(event)

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    })
  }

  // Check if user is owner of this project
  const userMembership = await db
    .select()
    .from(schema.projectMembership)
    .where(
      and(
        eq(schema.projectMembership.projectId, projectId),
        eq(schema.projectMembership.userId, session.user.id),
      ),
    )
    .get()

  if (!userMembership || userMembership.role !== "owner") {
    throw createError({
      statusCode: 403,
      message: "Only project owners can invite members",
    })
  }

  // Parse and validate body
  const body = await readBody(event)
  const parsed = inviteSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid email address",
    })
  }

  const { email } = parsed.data

  // Find user by email
  const invitedUser = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .get()

  if (!invitedUser) {
    throw createError({
      statusCode: 404,
      message:
        "User not found. They must sign in at least once before being invited.",
    })
  }

  // Check if already a member
  const existingMembership = await db
    .select()
    .from(schema.projectMembership)
    .where(
      and(
        eq(schema.projectMembership.projectId, projectId),
        eq(schema.projectMembership.userId, invitedUser.id),
      ),
    )
    .get()

  if (existingMembership) {
    throw createError({
      statusCode: 409,
      message: "User is already a member of this project",
    })
  }

  // Add membership
  await db.insert(schema.projectMembership).values({
    userId: invitedUser.id,
    projectId,
    role: "member",
  })

  return {
    success: true,
    userId: invitedUser.id,
    name: invitedUser.name,
    email: invitedUser.email,
  }
})
