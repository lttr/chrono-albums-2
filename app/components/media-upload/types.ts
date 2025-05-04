import type { GpsTags } from "./exif"

export interface FileStatus {
  dateTaken?: Date
  error?: string
  file: File
  height?: number
  id: string
  kind: "video" | "image"
  location?: GpsTags
  previewUrl?: string
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  url?: string
  valid: boolean
  width?: number
}
