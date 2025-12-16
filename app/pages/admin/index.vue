<template>
  <div>
    <div v-if="user" class="greeting-card">
      <h1 class="greeting-text">Ahoj, {{ user.name }}</h1>
    </div>

    <h2 class="p-heading-3">Přehled</h2>
    <p class="intro-text">
      Vyberte projekt v postranním panelu nebo vytvořte nový.
    </p>

    <div class="p-auto-grid stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ projects?.length || 0 }}</div>
        <div class="stat-label">Projektů</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ categories?.length || 0 }}</div>
        <div class="stat-label">Kategorií</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ albums?.length || 0 }}</div>
        <div class="stat-label">Alb</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
})

const { user } = useUser()

const { data: projects } = useFetch("/api/projects")
const { data: categories } = useFetch("/api/categories")
const { data: albums } = useFetch("/api/albums")
</script>

<style scoped>
.greeting-card {
  margin-bottom: var(--space-5);
}

.greeting-text {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-6);
  margin: 0;
}

.intro-text {
  margin-bottom: var(--space-5);
  color: var(--text-color-2);
}

.stats-grid {
  --auto-grid-min: 150px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-4);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
}

.stat-value {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-7);
  color: var(--brand-color);
}

.stat-label {
  font-size: var(--font-size--1);
  color: var(--text-color-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
