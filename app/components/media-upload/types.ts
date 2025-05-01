export interface FileStatus {
  error?: string
  dateTaken?: string
  file: File
  id: string
  location?: [number, number]
  previewUrl?: string
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  kind: "video" | "image"
  valid: boolean
  url?: string
}
