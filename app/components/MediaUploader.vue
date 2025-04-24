<template>
  <div>
    <label class="upload-label" :for="fileUploadId">Upload files</label>
    <input :id="fileUploadId" class="upload-input" type="file" multiple />
  </div>
</template>

<script lang="ts" setup>
const fileUploadId = useId()
</script>

<style scoped></style>
