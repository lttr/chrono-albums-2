import type { GpsTags } from "~~/shared/types/media"

export interface MediaUploadData {
  album?: AlbumSearchParams
  dateTaken?: string
  file?: Buffer
  fileName?: string
  fileSize?: number
  height?: number
  id?: string
  kind?: "video" | "image"
  location?: GpsTags
  mimeType?: string
  originalName?: string
  width?: number
}
