import { H3Error } from "h3"
import { MAX_IMAGE_SIZE } from "~~/shared/utils/upload"

export default defineEventHandler(async (event) => {
  // Parse multipart form data
  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No files uploaded",
    })
  }

  // Get storage instance
  const storage = useStorage("uploads")
  const uploadedFiles = []

  try {
    // Process each file in the form data
    for (const file of formData) {
      // Validate file size
      if (
        (file.type?.startsWith("image/") &&
          file.data.length > MAX_IMAGE_SIZE) ||
        (file.type?.startsWith("video/") && file.data.length > MAX_VIDEO_SIZE)
      ) {
        throw createError({
          statusCode: 400,
          statusMessage: `File ${file.filename} exceeds maximum size of ${MAX_IMAGE_SIZE / 1024 / 1024} MB`,
        })
      }

      // Validate file type
      if (!file.type || !ALLOWED_MIME_TYPES.includes(file.type)) {
        throw createError({
          statusCode: 400,
          statusMessage: `File type ${
            file.type || "unknown"
          } not allowed. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
        })
      }

      if (!file || !file.filename) {
        console.warn("Skipping invalid file entry")
        continue
      }

      // Store file using useStorage
      const fileName = `${Date.now()}-${file.filename}`
      await storage.setItemRaw(`${fileName}`, file.data)
      uploadedFiles.push({
        filename: fileName,
        url: `/uploads/${fileName}`,
      })
    }

    return {
      files: uploadedFiles,
    }
  } catch (error) {
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error uploading files",
    })
  }
})
