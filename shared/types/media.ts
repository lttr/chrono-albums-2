import * as z from "@zod/mini"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/heif", "image/heic"]
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/mov", "video/quicktime"]
export const ACCEPTED_MIME_TYPES = [
  ...ACCEPTED_IMAGE_TYPES,
  ...ACCEPTED_VIDEO_TYPES,
]

const ACCEPTED_IMAGE_EXTENSIONS = [".jpeg", ".jpg", ".heic"]
const ACCEPTED_VIDEO_EXTENSIONS = [".mp4", ".mov"]
export const ACCEPTED_FILE_EXTENSIONS = [
  ...ACCEPTED_IMAGE_EXTENSIONS,
  ...ACCEPTED_VIDEO_EXTENSIONS,
]

export const ACCEPTED_FILE_TYPES = ACCEPTED_MIME_TYPES.concat(
  ACCEPTED_FILE_EXTENSIONS,
).join(",")

export const MAX_VIDEO_SIZE_MB = 100
export const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024

export const MAX_IMAGE_SIZE_MB = 10
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024

export const MAX_FILES = 500

export const TARGET_JPEG_QUALITY = 0.85
export const TARGET_IMAGE_DIMENSION = 3000

export const ImageSchema = z
  .file("Toto není soubor")
  .check(
    z.maxSize(
      MAX_IMAGE_SIZE_BYTES,
      `Maximální velikost obrázku je ${MAX_IMAGE_SIZE_MB} MB`,
    ),
    z.mime(
      ACCEPTED_IMAGE_TYPES,
      `Tento typ obrázku není podporován. Podporované typy jsou ${ACCEPTED_IMAGE_EXTENSIONS.join(
        ", ",
      )}.`,
    ),
  )

export const VideoSchema = z
  .file("Toto není soubor")
  .check(
    z.maxSize(
      MAX_VIDEO_SIZE_BYTES,
      `Maximální velikost videa je ${MAX_VIDEO_SIZE_MB} MB`,
    ),
    z.mime(
      ACCEPTED_VIDEO_TYPES,
      `Tento typ videa není podporován. Podporované typy jsou ${ACCEPTED_VIDEO_EXTENSIONS.join(
        ", ",
      )}.`,
    ),
  )

export const FileSchema = z.union([ImageSchema, VideoSchema])

export type FileType = z.infer<typeof FileSchema>

export interface GpsTags {
  Latitude?: number
  Longitude?: number
  Altitude?: number
}
