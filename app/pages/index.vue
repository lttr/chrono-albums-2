<template>
  <div class="welcome-page">
    <main class="welcome-content">
      <h1 class="welcome-title">Chrono Albums</h1>
      <p class="welcome-subtitle">Chronologická alba fotek a videí</p>

      <p class="welcome-hint">
        Máte-li odkaz na konkrétní album, použijte jej přímo.
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Chrono Albums",
  meta: [{ name: "description", content: "Chronologická alba fotek a videí" }],
})
</script>

<style scoped>
.welcome-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: var(--space-4);
}

.welcome-content {
  text-align: center;
  max-width: 480px;
}

.welcome-title {
  margin: 0;
  font-size: var(--font-size-6);
  font-weight: 700;
  color: var(--text-color-1);
}

.welcome-subtitle {
  margin: var(--space-3) 0 0;
  font-size: var(--font-size-2);
  color: var(--text-color-2);
}

.welcome-hint {
  margin-top: var(--space-6);
  font-size: var(--font-size--1);
  color: var(--text-color-3);
}
</style>
