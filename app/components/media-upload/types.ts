import type { GpsTags } from "~~/shared/types/media"

export interface FileStatus {
  error?: string
  file: File
  id: string
  kind: "video" | "image"
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  valid: boolean
}

export interface MediaUploadData {
  album: AlbumSearchParams
  albumId: string
  dateTaken?: Date
  file: Blob
  fileName: string
  fileSize: number
  height?: number
  id: string
  kind: "image" | "video"
  location?: GpsTags
  mimeType: string
  originalName: string
  projectId: string
  width?: number
}
