<template>
  <div class="timeline-page">
    <header class="timeline-header">
      <h1>Všechna alba</h1>
      <p class="subtitle">Alba ze všech vašich projektů</p>
    </header>

    <main class="timeline-content p-flow">
      <YearSection
        v-for="{ year, albums } of timeline?.years"
        :key="year"
        :year="year"
        :albums="albums"
      />

      <div v-if="!timeline?.years.length" class="empty-state">
        <p>Zatím žádná alba.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
})

useHead({
  title: "Všechna alba | Admin",
})

const { data: timeline } = await useFetch("/api/admin/timeline")
</script>

<style scoped>
.timeline-header {
  margin-bottom: var(--space-6);
}

.timeline-header h1 {
  margin: 0;
  font-size: var(--font-size-4);
  font-weight: 600;
}

.subtitle {
  margin: var(--space-1) 0 0;
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.timeline-content {
  --flow-space: var(--space-8);
}

.empty-state {
  color: var(--text-color-2);
  font-style: italic;
  text-align: center;
  padding: var(--space-8) 0;
}
</style>
