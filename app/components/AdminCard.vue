<template>
  <component :is="to ? NuxtLink : 'div'" :to="to" class="admin-card">
    <div class="card-header">
      <div class="card-title-row">
        <strong class="card-title">{{ title }}</strong>
        <span v-if="badge" class="card-badge">{{ badge }}</span>
      </div>
      <slot name="subtitle"></slot>
    </div>

    <div v-if="$slots.default" class="card-body">
      <slot></slot>
    </div>

    <div v-if="$slots.actions" class="card-actions">
      <slot name="actions"></slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router"

defineProps<{
  title: string
  badge?: string
  to?: RouteLocationRaw
}>()

const NuxtLink = resolveComponent("NuxtLink")
</script>

<style scoped>
.admin-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
  text-decoration: none;
  color: inherit;
  transition: background-color 0.15s;
}

.admin-card:hover {
  background: var(--surface-1);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.card-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.card-title {
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-badge {
  flex-shrink: 0;
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.card-body {
  padding-top: var(--space-2);
  border-top: var(--border-1);
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.card-actions {
  display: flex;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-2);
}
</style>
