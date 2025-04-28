<template>
  <div>
    <section class="p-flow">
      <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
      <label
        class="upload-label p-center p-flow"
        :class="{ 'is-dragging': isDragging }"
        :for="fileUploadId"
        tabindex="0"
        @keydown.enter="openFileInput"
        @dragenter="isDragging = true"
        @dragover="isDragging = true"
        @dragleave="isDragging = false"
        @drop="onDrop"
      >
        <Icon name="uil-image-upload" class="icon" />
        <div class="p-heading-4">Nahraj fotky a videa</div>
        <div class="upload-hint p-secondary-text-regular">
          Přetáhni sem soubory nebo klikni. Přijímá soubory ve formátech JPEG,
          HEIC, MP4 a MOV.
        </div>
        <input
          :id="fileUploadId"
          ref="fileInput"
          class="upload-input"
          type="file"
          multiple
          :accept="acceptedFileTypes"
          @change="handleFileSelect"
        />
      </label>
    </section>
    <section>
      <FileList :file-statuses />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { FileStatus } from "./types"
import { fileIsTooBig, attrAccept } from "./validators"

const acceptedFileTypes = ALLOWED_MIME_TYPES.concat(
  ALLOWED_FILE_EXTENSIONS,
).join(",")

const maxFiles = 500

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
      `Soubor je moc velký. Maximální velikost je ${MAX_IMAGE_SIZE} MB pro obrázky a ${MAX_VIDEO_SIZE} MB pro videa.`,
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

async function processFiles(files: File[]) {
  clearError()

  if (fileStatuses.value.length + files.length > maxFiles) {
    setError(
      `Promiň, ale je povoleno nahrávat maximálně ${maxFiles} souborů najednou.`,
    )
    return
  }

  const validFiles = files.filter(validateFile)
  if (validFiles.length) {
    const newFileStatuses: FileStatus[] = validFiles.map((file) => ({
      file,
      type: file.type.startsWith("image/") ? "image" : "video",
      status: "pending" as const,
      progress: 0,
    }))

    fileStatuses.value = [...fileStatuses.value, ...newFileStatuses]

    uploadFiles(newFileStatuses)
  }
}

//
// Uploading
//

async function uploadFiles(files: FileStatus[]) {
  const formData = new FormData()
  for (const file of files) {
    if (!fileIsTooBig(file) && attrAccept(file, acceptedFileTypes)) {
      formData.append(file.name, file)
    }
  }

  if (Array.from(formData.values()).length === 0) {
    // no validated files
    return
  }

  if (!response) {
    throw new Error("Failed to upload files")
  }

  console.log(response)
}

// Album metadata

const route = useRoute()
const albumId = route.query.id
const albumTitle = route.query.title
const albumYear = route.query.year
const albumMonth = route.query.month
const albumCategory = route.query.category

// Upload a single file
async function uploadFile(fileStatus: FileStatus) {
  const formData = new FormData()
  formData.append("file", fileStatus.file)
  formData.append("type", fileStatus.type)

  const query = useRoute().query
  formData.append("albumId", albumId)
  formData.append("albumTitle", albumTitle)
  formData.append("albumYear", albumYear)
  formData.append("albumMonth", albumMonth)
  formData.append("albumCategory", albumCategory)

  // Update the status in the array
  const index = selectedFiles.value.indexOf(fileStatus)
  if (index !== -1) {
    selectedFiles.value[index] = { ...fileStatus, status: "uploading" }
  }

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const result: UploadResponse = await response.json()
    const uploadedFile = result.files[0]

    // Update the status in the array
    if (index !== -1) {
      selectedFiles.value[index] = {
        ...fileStatus,
        status: "success",
        url: uploadedFile.url,
      }
    }

    emit("upload-success", result)
    return result
  } catch (error) {
    console.error("Upload error:", error.message)
    // Update the status in the array
    if (index !== -1) {
      selectedFiles.value[index] = {
        ...fileStatus,
        status: "error",
        error: error?.message || "Upload failed",
      }
    }

    setError(fileStatus.error || "Upload failed")
    emit(
      "upload-error",
      error instanceof Error
        ? error
        : new Error(fileStatus.error || "Upload failed"),
    )
  }
}

//
// Drag and drop
//
const isDragging = ref(false)

const fileUploadId = useId()

async function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const filesAsArray = Array.from(input?.files ?? [])

  await processFiles(filesAsArray)

  fileStatuses.value = fileStatuses.value.concat(
    filesAsArray.map((file) => {
      return {
        file,
        type: file.type.startsWith("image/") ? "image" : "video",
        status: "pending",
      }
    }),
  )
}

function onDrop(event: DragEvent) {
  console.log(event)
}

const fileInput = templateRef<HTMLInputElement>("fileInput")

function openFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
</script>

<style scoped>
.upload-label {
  padding-block: var(--space-6);
  padding-inline: var(--space-3);
  border: var(--border-size-2) dashed var(--text-color-2);
  border-radius: var(--radius-3);
  box-shadow: var(--inner-shadow-3);

  &.is-dragging,
  &:hover {
    border: var(--border-size-2) dashed var(--text-color-1);
    box-shadow: var(--inner-shadow-0);
    background: var(--surface-1);
  }
}

.upload-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.icon {
  font-size: 3rem;
}
</style>
