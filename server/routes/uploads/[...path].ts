export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path")

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Path is required",
    })
  }

  return blob.serve(event, path)
})
