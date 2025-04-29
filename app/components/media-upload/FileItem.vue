<template>
  <div class="file-item">
    <div class="progress"></div>
    <div class="media">
      <div class="name">{{ fileStatus.file.name }}</div>
      <div class="preview">
        <img v-if="fileStatus?.type === 'image'" :src="previewUrl" alt="" />
        <video v-if="fileStatus?.type === 'video'" controls>
          <source :src="previewUrl" />
        </video>
      </div>
      <div class="errors">
        <span v-if="fileIsTooBig(fileStatus.file)">(too big)</span>
        <span v-if="!attrAccept(fileStatus.file, ACCEPTED_FILE_TYPES)"
          >(wrong format)</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { attrAccept, fileIsTooBig } from "./validators"
import type { FileStatus } from "./types"

const { fileStatus } = defineProps<{
  fileStatus: FileStatus
}>()

const previewUrl = computed(() => {
  return URL.createObjectURL(fileStatus.file)
})

onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>

<style scoped>
.file-item {
  border: var(--border-1);
  border-radius: var(--radius-3);
  padding-inline: var(--space-3);
  padding-block: var(--space-1);
  max-width: var(--size-content-3);
}

.media {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  align-items: center;
  gap: var(--space-3);
  max-height: 4rem;
}

.preview * {
  height: 3rem;
}

.name {
  font-size: var(--font-size--1);
  max-width: 15ch;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
