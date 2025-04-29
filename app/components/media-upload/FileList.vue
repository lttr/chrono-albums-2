<template>
  <div class="file-list p-stack">
    <FileItem
      v-for="fileStatus of fileStatuses"
      :key="fileStatus.file.name"
      :file-status="fileStatus"
    />
  </div>
</template>

<script lang="ts" setup>
import type { FileStatus } from "./types"

const { fileStatuses } = defineProps<{
  fileStatuses: FileStatus[]
}>()
</script>

<style scoped>
.file-list {
  --stack-space: var(--space-2);
}
</style>
