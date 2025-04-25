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
        @drop="isDragging = false"
      >
        <Icon name="uil-cloud-upload" class="icon" />
        <div class="p-heading-4">Nahraj fotky a videa</div>
        <div class="upload-hint p-secondary-text-regular">
          Přetáhni sem soubory nebo klikni na tlačítko. Přijímá soubory ve
          formátech JPEG, HEIC, MP4 a MOV.
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
      <div v-for="(file, index) of files" :key="file.name">
        {{ file.name }}
        <div class="preview">
          <img
            v-if="previews[index]?.type === 'image'"
            :src="previews[index].url"
            alt=""
          />
          <video v-if="previews[index]?.type === 'video'" controls>
            <source :src="previews[index].url" />
          </video>
        </div>
        <span v-if="fileIsTooBig(file)">(too big)</span>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const acceptedFileTypes = ALLOWED_MIME_TYPES.concat(
  ALLOWED_FILE_EXTENSIONS,
).join(",")

const files = ref<File[]>([])

const isDragging = ref(false)

const fileUploadId = useId()

async function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const filesAsArray = Array.from(input?.files ?? [])

  await processFiles(filesAsArray)

  files.value = files.value.concat(filesAsArray)
}

async function processFiles(files: File[]) {
  const formData = new FormData()
  files.forEach((file) => formData.append(file.name, file))
  const response = await $fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response) {
    throw new Error("Failed to upload files")
  }

  console.log(response)
}

const fileInput = templateRef<HTMLInputElement>("fileInput")

function openFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

function fileIsTooBig(file: File) {
  const maxSize = file.type.startsWith("video/")
    ? MAX_VIDEO_SIZE
    : MAX_IMAGE_SIZE
  return file.size > maxSize
}

type Preview = {
  type: "image" | "video"
  url: string
} | null

const previews = computed<Preview[]>((oldPreviews) => {
  if (oldPreviews) {
    cleanupObjectURLs(oldPreviews)
  }

  return files.value.map((file) => {
    if (file.type.startsWith("image/")) {
      return {
        type: "image",
        url: URL.createObjectURL(file),
      }
    } else if (file.type.startsWith("video/")) {
      return {
        type: "video",
        url: URL.createObjectURL(file),
      }
    }
    return null
  })
})

function cleanupObjectURLs(previews: Preview[]) {
  previews.forEach((preview) => {
    if (preview?.url) {
      URL.revokeObjectURL(preview.url)
    }
  })
}

// Cleanup old previews
onUnmounted(() => {
  cleanupObjectURLs(previews.value)
})
</script>

<style scoped>
.preview {
  max-height: 20rem;
  max-width: 20rem;
}

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
