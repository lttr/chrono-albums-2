export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path")

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: "Photo path is required",
    })
  }

  // Set immutable cache headers for static photo assets
  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable")

  return blob.serve(event, `photos/${path}`)
})
