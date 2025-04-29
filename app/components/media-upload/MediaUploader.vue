<template>
  <div>
    <section class="p-flow">
      <DropZone :has-error="hasError" @files-selected="onFilesSelected" />
    </section>
    <section>
      <FileList :file-statuses />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ACCEPTED_FILE_TYPES, MAX_FILES } from "~~/shared/utils/upload"
import type { FileStatus } from "./types"
import { fileIsTooBig, attrAccept } from "./validators"

const { params } = defineProps<{
  params: AlbumSearchParams
}>()

const acceptedFileTypes = ACCEPTED_FILE_TYPES
const maxFiles = MAX_FILES

const fileStatuses = ref<FileStatus[]>([])

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
// Validations
//

function validateFile(file: File): boolean {
  if (fileIsTooBig(file)) {
    setError(
      `Soubor je moc velký. Maximální velikost je ${MAX_IMAGE_SIZE_MB} MB pro
obrázky a ${MAX_VIDEO_SIZE_MB} MB pro videa.`,
    )
    return false
  }
  if (!attrAccept(file, acceptedFileTypes)) {
    setError(`Tento typ souboru není podporován. Povolené typy souborů jsou
${ALLOWED_FILE_EXTENSIONS.join(", ")}.`)
    return false
  }
  return true
}

//
// File processing
//

async function onFilesSelected(files: File[]) {
  clearError()

  if (fileStatuses.value.length + files.length > maxFiles) {
    setError(
      `Promiň, ale je povoleno nahrávat maximálně ${maxFiles} souborů najednou.`,
    )
    return
  }

  const newFileStatuses = files.map((file) => {
    return {
      file,
      id: crypto.randomUUID(),
      progress: 0,
      status: "pending" as const,
      type: file.type.startsWith("image/") ? "image" : "video",
    } satisfies FileStatus
  })

  fileStatuses.value = [...fileStatuses.value, ...newFileStatuses]

  const promises = newFileStatuses.map(processFile)
  await Promise.all(promises)
}

//
// Processing
//

async function processFile(fileStatus: FileStatus): Promise<void> {
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

  // Update the status in the array
  const index = fileStatuses.value.indexOf(fileStatus)
  if (index !== -1) {
    fileStatuses.value[index] = { ...fileStatus, status: "uploading" }
  }

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    const uploadedFile = result.files[0]

    // Update the status in the array
    if (index !== -1) {
      fileStatuses.value[index] = {
        ...fileStatus,
        status: "success",
        url: uploadedFile.url,
      }
    }

    return result
  } catch (error) {
    if (error instanceof Error) {
      console.error("Upload error:", error.message)
      // Update the status in the array
      if (index !== -1) {
        fileStatuses.value[index] = {
          ...fileStatus,
          status: "error",
          error: error?.message || "Upload failed",
        }
      }
    }
    setError(fileStatus.error || "Upload failed")
  }
}
</script>

<style scoped></style>
