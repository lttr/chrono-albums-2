<template>
  <div>
    <AppHeader />
    <main class="main p-container">
      <NuxtPage v-if="!error" />
      <slot v-else></slot>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
const error = useError()
</script>

<style scoped>
.main {
  margin-top: var(--space-5);
  padding-bottom: var(--space-7);
}
</style>
