import attr from "attr-accept"

export const attrAccept = attr

export function fileIsTooBig(file: File) {
  const maxSize = file.type.startsWith("video/")
    ? MAX_VIDEO_SIZE_MB * 1024 * 1024
    : MAX_IMAGE_SIZE_MB * 1024 * 1024
  return file.size > maxSize
}
