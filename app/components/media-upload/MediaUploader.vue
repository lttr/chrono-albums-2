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
import type { FileStatus, MediaUploadData } from "./types"
import { formatError } from "~~/shared/utils/errors"
import { parseExifData } from "./exif"
import { getImageDimensions } from "./dimensions"
import { isHeic, convertHeicToJpeg } from "./heic"
import { compressJpeg } from "./compress"
import type { NewMedia, NewAlbum } from "~~/server/database/schema"

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

  let imageUploadData: Partial<MediaUploadData> = {}
  if (fileStatus.kind === "image") {
    // handle HEIC images
    let jpegBlob: Blob
    if (isHeic(fileStatus.file)) {
      jpegBlob = await convertHeicToJpeg(fileStatus.file)
    } else {
      // expected to be a jpeg file
      jpegBlob = fileStatus.file
    }

    fileStatus.file = new File([jpegBlob], fileStatus.file.name, {
      type: "image/jpeg",
    })

    const dimensions = await getImageDimensions(jpegBlob)
    const exifData = await parseExifData(fileStatus.file)
    const unifiedFileName = `${fileStatus.file.name.split(".")[0]}.jpg`

    imageUploadData = {
      fileName: unifiedFileName,
      mimeType: "image/jpeg",
      dateTaken: exifData.dateTaken,
      file: await compressJpeg(jpegBlob),
      height: dimensions?.height,
      location: exifData.gps,
      width: dimensions?.width,
    }
  }

  const mediaUploadData: MediaUploadData = {
    originalName: fileStatus.file.name,
    album: params,
    albumId: params.id,
    file: fileStatus.file,
    fileName: fileStatus.file.name,
    fileSize: fileStatus.file.size,
    id: fileStatus.id,
    kind: fileStatus.kind,
    mimeType: fileStatus.file.type,
    projectId: params.projectId,
    ...imageUploadData,
  }

  // upload
  try {
    await postMetadata(mediaUploadData)
    await createAlbum(mediaUploadData)
    await uploadFile(mediaUploadData, fileStatus)
  } catch (error) {
    fileStatus.status = "error"
    if (error instanceof Error) {
      fileStatus.error = error.message || "Upload failed"
      console.error("Upload error:", error.message)
    } else {
      fileStatus.error = "Upload failed"
      console.error("Upload error:", error)
    }
    setError(fileStatus.error)
  }
}

//
// Upload a single file
//

async function createAlbum(data: MediaUploadData) {
  try {
    await $fetch("/api/albums", {
      method: "POST",
      body: data.album satisfies NewAlbum,
    })
  } catch (error) {
    console.error("Failed to create album:", error)
    throw error
  }
}

async function postMetadata(data: MediaUploadData) {
  try {
    const metadata = {
      id: data.id,
      albumId: data.album.id,
      kind: data.kind,
      dateTaken: data.dateTaken?.toISOString(),
      fileName: data.fileName,
      fileSize: data.fileSize,
      height: data.height,
      width: data.width,
      mimeType: data.mimeType,
      originalName: data.originalName,
      locationLat: data.location?.Latitude,
      locationLon: data.location?.Longitude,
      locationAlt: data.location?.Altitude,
    } satisfies NewMedia

    await $fetch("/api/media", {
      method: "POST",
      body: metadata,
    })
  } catch (error) {
    console.error("Failed to post metadata:", error)
    throw error
  }
}

async function uploadFile(data: MediaUploadData, fileStatus: FileStatus) {
  const formData = new FormData()
  const file = new File([data.file], data.fileName, {
    type: data.mimeType,
  })
  formData.append("file", file)
  formData.append("id", data.id)
  formData.append("albumId", data.album.id)

  try {
    await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
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
