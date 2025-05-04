export async function getImageDimensions(
  blob: Blob,
): Promise<{ width: number; height: number } | undefined> {
  try {
    return new Promise((resolve, reject) => {
      // Handle normal images as before
      const imageUrl = URL.createObjectURL(blob)
      const img = new Image()

      img.onload = function () {
        const dimensions = {
          width: img.width,
          height: img.height,
        }
        URL.revokeObjectURL(imageUrl)
        resolve(dimensions)
      }

      img.onerror = function () {
        URL.revokeObjectURL(imageUrl)
        reject(new Error("Failed to load image"))
      }

      img.src = imageUrl
    })
  } catch (error) {
    console.error("Error getting image dimensions:", error)
    return undefined
  }
}
