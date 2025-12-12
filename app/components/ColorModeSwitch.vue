<template>
  <div class="color-mode-switch p-cluster">
    <button
      v-for="mode of modes"
      :key="mode.value"
      type="button"
      class="mode-btn"
      :class="{ active: preference === mode.value }"
      :aria-pressed="preference === mode.value"
      :title="mode.label"
      @click="setPreference(mode.value)"
    >
      <Icon :name="mode.icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const modes = [
  { value: "light", icon: "uil-sun", label: "Light mode" },
  { value: "dark", icon: "uil-moon", label: "Dark mode" },
  { value: "system", icon: "uil-desktop", label: "System preference" },
]

const preference = computed(() => colorMode.preference ?? "system")

function setPreference(mode: string) {
  colorMode.preference = mode
}
</script>

<style scoped>
.color-mode-switch {
  --cluster-gap: var(--space-1);
}

.mode-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1);
  border: none;
  border-radius: var(--radius-2);
  background: transparent;
  color: var(--color-text-2);
  cursor: pointer;
  font-size: 1.25rem;
  transition:
    background-color 0.15s,
    color 0.15s;

  &:hover {
    background: var(--color-surface-2);
  }

  &.active {
    background: var(--color-surface-3);
    color: var(--color-text-1);
  }
}
</style>
