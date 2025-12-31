<template>
  <div v-if="category">
    <div class="p-cluster header-container">
      <h1 class="p-heading-2">{{ category.name }}</h1>
      <NuxtLink :to="`/c/${category.slug}`" class="public-link" target="_blank">
        <Icon name="uil:external-link-alt" />
        Veřejný odkaz
      </NuxtLink>
    </div>

    <section class="section">
      <div class="p-cluster section-header">
        <h2 class="p-heading-4">Alba v této kategorii</h2>
      </div>

      <div v-if="!categoryAlbums.length" class="empty-message">
        Žádná alba v této kategorii.
      </div>

      <div v-else class="p-auto-grid cards-grid">
        <AdminCard
          v-for="album of categoryAlbums"
          :key="album.id"
          :title="album.title"
          :badge="`${album.month}/${album.year}`"
          :to="`/admin/projects/${projectId}/albums/${album.id}`"
        >
          <template #subtitle>
            <span class="media-count">{{ album.mediaCount }} médií</span>
          </template>
        </AdminCard>
      </div>
    </section>
  </div>
  <div v-else class="error-message">Kategorie nenalezena.</div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
})

const route = useRoute("admin-projects-projectId-categories-categoryId")
const projectId = computed(() => route.params.projectId)
const categoryId = computed(() => route.params.categoryId)

const { data: categories } = await useFetch("/api/categories")
const { data: albums } = await useFetch("/api/albums")

const category = computed(() =>
  categories.value?.find((c) => c.id === categoryId.value),
)

const categoryAlbums = computed(
  () => albums.value?.filter((a) => a.categoryId === categoryId.value) || [],
)

// Set breadcrumb data and page title
const routeMeta = route.meta as { categoryName?: string; projectName?: string }
watchEffect(() => {
  if (category.value) {
    routeMeta.categoryName = category.value.name
  }
})

useHead({
  title: computed(() =>
    category.value ? `${category.value.name} | Admin` : "Kategorie | Admin",
  ),
})
</script>

<style scoped>
.header-container {
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.public-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.public-link:hover {
  color: var(--brand-color);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.section-header {
  justify-content: space-between;
  padding-bottom: var(--space-2);
  border-bottom: var(--border-1);
}

.empty-message {
  padding: var(--space-4);
  color: var(--text-color-2);
  font-style: italic;
}

.error-message {
  padding: var(--space-6);
  color: var(--negative-color);
  text-align: center;
}

.cards-grid {
  --auto-grid-min: 200px;
}

.media-count {
  font-size: var(--font-size--2);
  color: var(--text-color-3);
}
</style>
