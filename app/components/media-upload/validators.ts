import attr from "attr-accept"

export const attrAccept = attr

export function fileIsTooBig(file: File) {
  const maxSize = file.type.startsWith("video/")
    ? MAX_VIDEO_SIZE
    : MAX_IMAGE_SIZE
  return file.size > maxSize
}
