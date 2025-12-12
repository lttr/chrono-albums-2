<template>
  <div>
    <div class="p-cluster header-container">
      <h1 class="p-heading-2">Projekty</h1>
      <NuxtLink to="/admin/projects/new" class="p-button p-button-brand">
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
      <AdminCard
        v-for="project of projects"
        :key="project.id"
        :title="project.name"
        :to="`/admin/projects/${project.id}`"
      >
        <template #actions>
          <NuxtLink
            :to="`/p/${project.slug}`"
            class="public-link"
            title="Veřejný odkaz"
            target="_blank"
            @click.stop
          >
            <Icon name="uil:external-link-alt" />
          </NuxtLink>
        </template>
      </AdminCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
})

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

.public-link {
  color: var(--text-color-2);
  opacity: 0.5;
  transition: opacity 0.15s;
}

.public-link:hover {
  opacity: 1;
  color: var(--brand-color);
}
</style>
