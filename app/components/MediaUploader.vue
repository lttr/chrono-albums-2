<template>
  <div>
    <section>
      <label class="upload-label" :for="fileUploadId">Upload files</label>
      <input
        :id="fileUploadId"
        class="upload-input"
        type="file"
        multiple
        @change="handleFileSelect"
      />
    </section>
    <section>
      <p v-for="file of files" :key="file.name">{{ file.name }}</p>
    </section>
  </div>
</template>

<script lang="ts" setup>
const files = ref<File[]>([])

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    files.value = files.value.concat(Array.from(target.files))
  }
}

const fileUploadId = useId()
</script>

<style scoped></style>
