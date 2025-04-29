export interface FileStatus {
  error?: string
  file: File
  id: string
  previewUrl?: string
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  type: "video" | "image"
  url?: string
}
