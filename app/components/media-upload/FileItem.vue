<template>
  <div class="file-item">
    <div class="progress"></div>
    <div class="media">
      <Icon v-if="fileStatus.kind === 'image'" name="uil-image" />
      <Icon v-if="fileStatus.kind === 'video'" name="uil-video" />
      <div class="name" :title="fileStatus.file.name">
        {{ fileStatus.file.name }}
      </div>
      <div class="preview">
        <template v-if="!fileStatus.error">
          <img v-if="fileStatus?.kind === 'image'" :src="previewUrl" alt="" />
          <video v-if="fileStatus?.kind === 'video'">
            <source :src="previewUrl" />
          </video>
        </template>
      </div>
      <div class="errors">
        <div v-if="fileStatus.status === 'success'" class="success">
          <Icon name="uil:check-circle" />
        </div>
        <div v-if="fileStatus.error" class="error">
          <Icon
            name="uil:exclamation-triangle"
            class="icon"
            :title="fileStatus.error"
          />
        </div>
      </div>
    </div>
    <div class="error-text">
      <pre>{{ fileStatus.error }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
  grid-template-columns: 1em repeat(3, minmax(5rem, 1fr));
  align-items: center;
  gap: var(--space-3);
}

.preview * {
  height: 2rem;
}

.name {
  font-size: var(--font-size--1);
  max-width: 15ch;
  overflow: hidden;
  text-overflow: ellipsis;
}

.error {
  color: var(--error-alert-color);
}

.success {
  color: var(--positive-color);
}

.error-text {
  color: var(--error-alert-color);
  font-size: var(--font-size--2);
  margin-inline: var(--space-5);
}
</style>
