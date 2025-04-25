export interface FileStatus {
  file: File
  type: "video" | "image"
  status: "pending" | "uploading" | "success" | "error"
  error?: string
  url?: string
  previewUrl?: string
}
