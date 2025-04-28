<template>
  <div class="alert" :class="type">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  type: "success" | "error" | "info"
}>()
</script>

<style scoped>
.alert {
  padding-inline: var(--space-4);
  padding-block: var(--space-2);
  border-radius: var(--radius-default);

  &.success {
    background-color: var(--positive-alert-bg-color);
    color: var(--positive-alert-color);
  }

  &.error {
    background-color: var(--error-alert-bg-color);
    color: var(--error-alert-color);
  }

  &.info {
    background-color: var(--surface-1);
    color: var(--text-color-2);
  }
}
</style>
