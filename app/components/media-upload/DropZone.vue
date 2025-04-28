<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    class="upload-label p-center p-flow"
    :class="{ 'is-dragging': isDragging, 'has-error': hasError }"
    tabindex="0"
    @keydown.enter="openFileInput"
    @click="openFileInput"
    @dragenter.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <Icon name="uil-image-upload" class="icon" />
    <label class="label p-center p-flow">
      <div class="p-heading-4">Nahraj fotky a videa</div>
      <div class="upload-hint p-secondary-text-regular">
        Přetáhni sem soubory nebo klikni. Přijímá soubory ve formátech JPEG,
        HEIC, MP4 a MOV.
      </div>
      <input
        ref="fileInput"
        class="upload-input"
        type="file"
        multiple
        :accept="acceptedFileTypes"
        @change="handleFileSelect"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ACCEPTED_FILE_TYPES } from "~~/shared/utils/upload"

defineProps<{
  hasError: boolean
}>()

const emit = defineEmits<{
  filesSelected: [files: File[]]
}>()

const acceptedFileTypes = ACCEPTED_FILE_TYPES

const isDragging = ref(false)

// Handle file selection
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) {
    return
  }
  emit("filesSelected", Array.from(input.files))
}

// Handle drop
function onDrop(event: DragEvent) {
  isDragging.value = false
  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  emit("filesSelected", droppedFiles)
}

const fileInput = templateRef<HTMLInputElement>("fileInput")

function openFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
</script>

<style scoped>
.upload-label {
  padding-block: var(--space-6);
  padding-inline: var(--space-3);
  border: var(--border-size-2) dashed var(--text-color-2);
  border-radius: var(--radius-3);
  box-shadow: var(--inner-shadow-3);
  cursor: pointer;

  &.is-dragging,
  &:hover {
    border: var(--border-size-2) dashed var(--text-color-1);
    box-shadow: var(--inner-shadow-0);
    background: var(--surface-1);
  }
}

.label {
  cursor: pointer;
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
