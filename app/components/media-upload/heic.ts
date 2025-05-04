export async function convertHeicToJpeg(file: Blob): Promise<Blob> {
  const { default: heic2any } = await import("heic2any")
  let jpegBlob
  try {
    const blobs = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92,
    })
    jpegBlob = Array.isArray(blobs) ? blobs[0] : blobs
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error converting HEIC to JPEG:", error.message)
    }
  }
  if (!jpegBlob) {
    throw new Error("Conversion failed")
  }
  return jpegBlob
}

export function isHeic(file: File): boolean {
  return file.type === "image/heif" || file.name.endsWith(".heic")
}
