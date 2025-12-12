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
        <NuxtLink
          :to="`/p/${project.slug}`"
          class="public-link"
          title="Veřejný odkaz"
          target="_blank"
        >
          <Icon name="uil:external-link-alt" />
          Veřejný odkaz
        </NuxtLink>
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
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  border: var(--border-2);
  border-radius: var(--radius-2);
  padding: var(--space-4);
  box-shadow: var(--shadow-2);
}

.public-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size--1);
  color: var(--text-color-2);
  text-decoration: none;
}

.public-link:hover {
  color: var(--brand-color);
}
</style>
