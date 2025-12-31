<template>
  <div>
    <div class="p-cluster header-container">
      <h1 class="p-heading-2">Kategorie</h1>
      <NuxtLink
        :to="`/admin/projects/${projectId}/categories/new`"
        class="p-button p-button-brand"
      >
        Nová kategorie
      </NuxtLink>
    </div>

    <div v-if="!projectCategories.length" class="p-center empty-message">
      Žádné kategorie v tomto projektu.
    </div>

    <div v-else class="p-auto-grid cards-grid">
      <AdminCard
        v-for="category of projectCategories"
        :key="category.id"
        :title="category.name"
        :to="`/admin/projects/${projectId}/categories/${category.id}`"
      >
        <template #actions>
          <NuxtLink
            :to="`/c/${category.slug}`"
            class="public-link"
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

const route = useRoute("admin-projects-projectId-categories")
const projectId = computed(() => route.params.projectId)

const { data: categories } = await useFetch("/api/categories")

const projectCategories = computed(
  () => categories.value?.filter((c) => c.projectId === projectId.value) || [],
)

useHead({
  title: "Kategorie | Admin",
})
</script>

<style scoped>
.header-container {
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.empty-message {
  padding-block: var(--space-6);
  color: var(--text-color-2);
}

.cards-grid {
  --auto-grid-min: 200px;
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
