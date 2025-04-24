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
const allowedMimeTypes = ["image/jpeg", "image/heif", "video/mp4", "video/mov"]
const acceptedFileTypes = allowedMimeTypes
  .concat([".jpeg", ".jpg", ".heic", ".mov", ".mp4"])
  .join(",")

const MAX_VIDEO_SIZE = 1024 * 1024 * 10 // 10 MB
const MAX_IMAGE_SIZE = 1024 * 1024 * 100 // 200 MB

const files = ref<File[]>([])

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    files.value = files.value.concat(Array.from(target.files))
  }
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
