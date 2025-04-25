<template>
  <div v-for="fileStatus of fileStatuses" :key="fileStatus.file.name">
    <FileItem :file-status="fileStatus" />
  </div>
</template>

<script lang="ts" setup>
import type { FileStatus } from "./types"

const { fileStatuses } = defineProps<{
  fileStatuses: FileStatus[]
}>()
</script>

<style scoped></style>
