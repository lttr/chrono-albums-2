<template>
  <div
    ref="dropZone"
    class="upload-label p-center p-flow"
    :class="{ 'is-dragging': isOverDropZone, 'has-error': hasError }"
  >
    <Icon name="uil-image-upload" class="icon" />
    <label class="label p-center p-flow">
      <div class="p-heading-4">Nahraj fotky a videa</div>
      <div class="upload-hint p-secondary-text-regular">
        Přetáhni sem soubory nebo klikni na tlačítko. Přijímá soubory ve
        formátech JPEG, HEIC, MP4 a MOV.
      </div>
      <input
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
import { ACCEPTED_FILE_TYPES } from "~~/shared/types/media"
import { useDropZone } from "@vueuse/core"

defineProps<{
  hasError: boolean
}>()

const emit = defineEmits<{
  filesSelected: [files: File[]]
}>()

const acceptedFileTypes = ACCEPTED_FILE_TYPES

const dropZone = templateRef<HTMLDivElement>("dropZone")

const { isOverDropZone } = useDropZone(dropZone, { onDrop })

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) {
    return
  }
  emit("filesSelected", Array.from(input.files))
}

function onDrop(droppedFiles: File[] | null) {
  emit("filesSelected", droppedFiles || [])
}
</script>

<style scoped>
.upload-label {
  padding-block: var(--space-6);
  padding-inline: var(--space-3);
  border: var(--border-size-2) dashed var(--text-color-2);
  border-radius: var(--radius-3);
  box-shadow: var(--inner-shadow-3);

  &.is-dragging {
    border: var(--border-size-2) dashed var(--text-color-1);
    box-shadow: var(--inner-shadow-0);
    background: var(--surface-1);
  }
}

.label {
  cursor: pointer;
}

.upload-input {
  margin-inline: auto;
  border: none;
  box-shadow: none;
  cursor: pointer;
}

.icon {
  font-size: 3rem;
}
</style>
