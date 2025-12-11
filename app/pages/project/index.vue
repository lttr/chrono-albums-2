<template>
  <div>
    <div class="p-cluster header-container">
      <h1 class="p-heading-2">Projekty</h1>
      <NuxtLink to="/project/new" class="p-button p-button-brand">
        Nový projekt
      </NuxtLink>
    </div>

    <div v-if="error" class="p-center error-message">
      Nastala chyba při načítání projektů: {{ error }}
    </div>

    <div v-else-if="!projects?.length" class="p-center empty-message">
      Žádné projekty. Vytvořte nový projekt pro začátek.
    </div>

    <div v-else class="p-auto-grid">
      <div v-for="project of projects" :key="project.id" class="project-card">
        <h3 class="p-heading-3">{{ project.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: projects, error } = await useFetch("/api/projects")
</script>

<style scoped>
.header-container {
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.error-message,
.empty-message {
  padding-block: var(--space-6);
}

.empty-message {
  color: var(--text-color-2);
}

.error-message {
  color: var(--negative-color);
}

.project-card {
  border: var(--border-2);
  border-radius: var(--radius-2);
  padding: var(--space-4);
  box-shadow: var(--shadow-2);
}
</style>
