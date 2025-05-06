import type { GpsTags } from "./exif"

export interface FileStatus {
  dateTaken?: Date
  error?: string
  file: File
  height?: number
  id: string
  kind: "video" | "image"
  location?: GpsTags
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  valid: boolean
  width?: number
}
