<template>
  <div>
    {{ fileStatus.file.name }}
    <div class="preview">
      <img v-if="fileStatus?.type === 'image'" :src="previewUrl" alt="" />
      <video v-if="fileStatus?.type === 'video'" controls>
        <source :src="previewUrl" />
      </video>
    </div>
    <span v-if="fileIsTooBig(fileStatus.file)">(too big)</span>
    <span v-if="!attrAccept(fileStatus.file, ACCEPTED_FILE_TYPES)"
      >(wrong format)</span
    >
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
.preview {
  max-height: 20rem;
  max-width: 20rem;
}
</style>
