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

const fileStatuses = ref<FileStatus[]>([])

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

async function processFiles(files: File[]) {
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

  const response = await $fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response) {
    throw new Error("Failed to upload files")
  }

  console.log(response)
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
