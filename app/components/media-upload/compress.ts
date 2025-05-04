import Compressor from "compressorjs"
import {
  TARGET_JPEG_QUALITY,
  TARGET_IMAGE_DIMENSION,
} from "~~/shared/types/media"

export async function compressJpeg(jpegBlob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(jpegBlob, {
      quality: TARGET_JPEG_QUALITY,
      retainExif: true,
      maxWidth: TARGET_IMAGE_DIMENSION,
      maxHeight: TARGET_IMAGE_DIMENSION,
      mimeType: "image/jpeg",

      success(result) {
        resolve(result)
      },
      error(err) {
        console.error(err.message)
        reject(err)
      },
    })
  })
}
