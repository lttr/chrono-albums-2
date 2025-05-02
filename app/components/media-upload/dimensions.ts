export async function getImageDimensions(file: File): Promise<void> {
  try {
    // Check if it's a HEIC file
    if (
      file.type === "image/heic" ||
      file.name.endsWith(".heic") ||
      file.name.endsWith(".HEIC")
    ) {
      const { default: heic2any } = await import("heic2any")
      // Convert HEIC to JPEG using heic2any
      const blobs = await heic2any({
        blob: file,
        toType: "image/jpeg",
      })

      // Create URL from the converted JPEG
      const jpegBlob = Array.isArray(blobs) ? blobs[0] : blobs
      if (!jpegBlob) {
        throw new Error("Conversion failed")
      }

      const imageUrl = URL.createObjectURL(jpegBlob)

      // Get dimensions from the converted image
      const img = new Image()
      img.onload = function () {
        console.log(`HEIC image dimensions: ${img.width}x${img.height}`)
        URL.revokeObjectURL(imageUrl)
      }
      img.src = imageUrl
    } else {
      // Handle normal images as before
      const imageUrl = URL.createObjectURL(file)
      const img = new Image()
      img.onload = function () {
        console.log(`Image dimensions: ${img.width}x${img.height}`)
        URL.revokeObjectURL(imageUrl)
      }
      img.src = imageUrl
    }
  } catch (error) {
    console.error("Error processing image:", error)
  }
}
