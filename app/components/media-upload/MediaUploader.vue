<template>
  <div class="p-flow">
    <section class="p-flow">
      <DropZone :has-error="hasError" @files-selected="onFilesSelected" />
    </section>
    <section v-if="validFilesCount > 0" class="p-flow">
      Nahráno {{ uploadedFilesCount }} z {{ validFilesCount }} souborů
    </section>
    <section>
      <FileList :file-statuses />
    </section>
  </div>
</template>

<script lang="ts" setup>
import * as z from "@zod/mini"
import { MAX_FILES, ImageSchema, VideoSchema } from "~~/shared/types/media"
import type { FileStatus } from "./types"

const { params } = defineProps<{
  params: AlbumSearchParams
}>()

const maxFiles = MAX_FILES

const fileStatuses = ref<FileStatus[]>([])

const uploadedFilesCount = computed(() => {
  return fileStatuses.value.filter((file) => file.status === "success").length
})

const validFilesCount = computed(() => {
  return fileStatuses.value.filter((file) => file.valid).length
})

//
// Errors
//

const hasError = ref(false)
const errorMessage = ref("")
let errorTimeout: number | null = null
// Clear error state
const clearError = () => {
  hasError.value = false
  errorMessage.value = ""
}
// Set error with auto-clear
const setError = (message: string) => {
  // Clear any existing timeout
  if (errorTimeout) {
    window.clearTimeout(errorTimeout)
  }

  // Set new error
  errorMessage.value = message
  hasError.value = true
  // emit("error", message)

  // Set timeout to clear error after 3 seconds
  errorTimeout = window.setTimeout(() => {
    clearError()
  }, 3000)
}

//
// File processing
//

async function onFilesSelected(files: File[]) {
  if (fileStatuses.value.length + files.length > maxFiles) {
    setError(
      `Promiň, ale je povoleno nahrávat maximálně ${maxFiles} souborů najednou.`,
    )
    return
  }

  const newFileStatuses = files.map((file) => {
    const type = file.type.startsWith("image/") ? "image" : "video"
    let validationResult
    if (type === "image") {
      validationResult = ImageSchema.safeParse(file)
    } else {
      validationResult = VideoSchema.safeParse(file)
    }
    const error =
      validationResult.error && z.prettifyError(validationResult.error)
    return {
      error,
      file,
      id: crypto.randomUUID(),
      progress: 0,
      status: "pending" as const,
      type,
      valid: validationResult.success,
    } satisfies FileStatus
  })

  fileStatuses.value = [...fileStatuses.value, ...newFileStatuses]

  await Promise.all(
    newFileStatuses
      .filter((fileStatus) => fileStatus.valid)
      .map((fileStatus) => processFile(fileStatus)),
  )
}

//
// Processing
//

async function processFile(fileStatus: FileStatus): Promise<void> {
  // update status
  fileStatus.status = "uploading"
  // convert
  // TODO
  // upload
  await uploadFile(fileStatus)
}

//
// Upload a single file
//

async function uploadFile(fileStatus: FileStatus) {
  const formData = new FormData()
  formData.append("file", fileStatus.file)
  formData.append("type", fileStatus.type)

  formData.append("albumId", params.id)
  formData.append("albumTitle", params.title)
  formData.append("albumYear", params.year.toString())
  formData.append("albumMonth", params.month.toString())
  formData.append("albumCategory", params.category)

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const result = (await response.json()) as { files: { url: string }[] }
    const uploadedFile = result.files[0]

    if (!uploadedFile) {
      throw new Error("Upload failed")
    }

    fileStatus.status = "success"
    fileStatus.url = uploadedFile.url

    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error("Upload error:", error.message)
      fileStatus.status = "error"
      fileStatus.error = error?.message || "Upload failed"
    }
    setError(fileStatus.error || "Upload failed")
  }
}
</script>

<style scoped></style>
