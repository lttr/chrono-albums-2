<template>
  <div class="timeline-page">
    <header class="timeline-header">
      <h1>Photo Albums</h1>
    </header>

    <main class="timeline-content p-flow">
      <YearSection
        v-for="{ year, albums } of timeline?.years"
        :key="year"
        :year="year"
        :albums="albums"
      />

      <div v-if="!timeline?.years.length" class="empty-state">
        <p>No albums yet.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { data: timeline } = await useFetch("/api/timeline")

useHead({
  title: "Photo Albums",
  meta: [{ name: "description", content: "Browse photo albums by year" }],
})
</script>

<style scoped>
.timeline-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-4);
}

.timeline-header {
  margin-bottom: var(--space-6);
}

.timeline-header h1 {
  margin: 0;
  font-size: var(--font-size-5);
  font-weight: 600;
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
