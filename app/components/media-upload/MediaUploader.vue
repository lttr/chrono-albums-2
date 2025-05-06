<template>
  <div class="p-flow">
    <section class="p-flow">
      <DropZone :has-error="hasError" @files-selected="onFilesSelected" />
    </section>
    <section v-if="validFilesCount > 0" class="p-flow p-secondary-text-regular">
      <span>
        Nahráno {{ uploadedFilesCount }} z {{ validFilesCount }} souborů
      </span>
      <span v-if="invalidFilesCount > 0">
        ({{ invalidFilesCount }} souborů nebylo možné nahrát)
      </span>
    </section>
    <section>
      <FileList :file-statuses />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { MAX_FILES, ImageSchema, VideoSchema } from "~~/shared/types/media"
import type { FileStatus } from "./types"
import { formatError } from "~~/shared/utils/errors"
import { parseExifData } from "./exif"
import { getImageDimensions } from "./dimensions"
import { isHeic, convertHeicToJpeg } from "./heic"
import { compressJpeg } from "./compress"

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

const invalidFilesCount = computed(() => {
  return fileStatuses.value.filter((file) => !file.valid).length
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
    const kind = file.type.startsWith("image/") ? "image" : "video"
    let validationResult
    if (kind === "image") {
      validationResult = ImageSchema.safeParse(file)
    } else {
      validationResult = VideoSchema.safeParse(file)
    }
    let error
    if (!validationResult.success) {
      error = formatError(validationResult.error)
    }
    return {
      error,
      file,
      id: crypto.randomUUID(),
      progress: 0,
      status: "pending" as const,
      kind,
      valid: validationResult.success,
    } satisfies FileStatus
  })

  fileStatuses.value = [...fileStatuses.value, ...newFileStatuses]

  await Promise.all(
    newFileStatuses
      .filter((fileStatus) => fileStatus.valid)
      .map((fileStatus) =>
        processValidFile(
          // make sure the passed array is reactive
          fileStatuses.value.find((status) => status.id === fileStatus.id)!,
        ),
      ),
  )
}

//
// Processing
//

async function processValidFile(fileStatus: FileStatus): Promise<void> {
  // update status
  fileStatus.status = "uploading"

  if (fileStatus.kind === "image") {
    // handle HEIC images
    let jpegBlob: Blob
    if (isHeic(fileStatus.file)) {
      jpegBlob = await convertHeicToJpeg(fileStatus.file)
    } else {
      jpegBlob = fileStatus.file
    }

    // get dimensions
    const dimensions = await getImageDimensions(jpegBlob)
    fileStatus.width = dimensions?.width
    fileStatus.height = dimensions?.height

    // parse EXIF data
    const exifData = await parseExifData(fileStatus.file)
    fileStatus.dateTaken = exifData.dateTaken
    fileStatus.location = exifData.gps

    // compress JPEG
    const resultData = await compressJpeg(jpegBlob)

    // prepare image file for upload
    fileStatus.file = new File([resultData], fileStatus.file.name, {
      type: fileStatus.file.type,
    })
  }

  // upload
  await uploadFile(fileStatus)
}

//
// Upload a single file
//

async function uploadFile(fileStatus: FileStatus) {
  const formData = new FormData()
  formData.append("album", JSON.stringify(params))
  if (fileStatus.dateTaken) {
    formData.append("dateTaken", fileStatus.dateTaken.toISOString())
  }
  formData.append("file", fileStatus.file)
  if (fileStatus.height) {
    formData.append("height", fileStatus.height.toString())
  }
  formData.append("id", fileStatus.id)
  formData.append("kind", fileStatus.kind)
  if (fileStatus.location) {
    formData.append("location", JSON.stringify(fileStatus.location))
  }
  if (fileStatus.width) {
    formData.append("width", fileStatus.width.toString())
  }

  try {
    const response = await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (response?.status && response.status >= 400) {
      throw new Error(`Upload failed: ${response.body.error}`)
    }

    fileStatus.status = "success"
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
