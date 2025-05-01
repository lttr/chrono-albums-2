import { H3Error } from "h3"
import { MAX_IMAGE_SIZE_BYTES, MAX_VIDEO_SIZE_BYTES, ACCEPTED_MIME_TYPES } from "~~/shared/types/media"

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

  const maxImageSize = MAX_IMAGE_SIZE_BYTES
  const maxVideoSize = MAX_VIDEO_SIZE_BYTES

  try {
    // Process each file in the form data
    for (const file of formData) {
      // Validate file size
      if (
        (file.type?.startsWith("image/") && file.data.length > maxImageSize) ||
        (file.type?.startsWith("video/") && file.data.length > maxVideoSize)
      ) {
        throw createError({
          statusCode: 400,
          statusMessage: `File ${file.filename} exceeds maximum size of ${maxImageSize} MB`,
        })
      }

      // Validate file type
      if (!file.type || !ACCEPTED_MIME_TYPES.includes(file.type)) {
        throw createError({
          statusCode: 400,
          statusMessage: `File type ${
            file.type || "unknown"
          } not allowed. Allowed types: ${ACCEPTED_MIME_TYPES.join(", ")}`,
        })
      }

      if (!file || !file.filename) {
        console.warn("Skipping invalid file entry")
        continue
      }

      // Store file using useStorage
      // const fileName = `${Date.now()}-${file.filename}`
      const fileName = `${file.filename}`
      await storage.setItemRaw(`${fileName}`, file.data)
      await storage.setItem(`${fileName}-metadata`, {
        filename: file.filename,
        size: file.name,
        type: file.type,
      })
      uploadedFiles.push({
        filename: fileName,
        url: `/uploads/${fileName}`,
      })
    }

    return {
      files: uploadedFiles,
    }
  } catch (error) {
    console.error(error)
    if (error instanceof H3Error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Error uploading files",
    })
  }
})
