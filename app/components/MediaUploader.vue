<template>
  <div>
    <section>
      <label class="upload-label" :for="fileUploadId">Upload files</label>
      <input
        :id="fileUploadId"
        class="upload-input"
        type="file"
        multiple
        :accept="acceptedFileTypes"
        @change="handleFileSelect"
      />
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

function fileIsTooBig(file: File) {
  const maxSize = file.type.startsWith("video/")
    ? MAX_VIDEO_SIZE
    : MAX_IMAGE_SIZE
  return file.size > maxSize
}

const fileUploadId = useId()

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
</style>
