<template>
  <div v-if="project">
    <div class="p-cluster header-container">
      <h1 class="p-heading-2">{{ project.name }}</h1>
      <div class="p-cluster header-actions">
        <NuxtLink :to="`/admin/projects/${projectId}/team`" class="header-link">
          <Icon name="uil:users-alt" />
          Tým
        </NuxtLink>
        <NuxtLink
          :to="`/p/${project.slug}`"
          class="header-link"
          target="_blank"
        >
          <Icon name="uil:external-link-alt" />
          Veřejný odkaz
        </NuxtLink>
      </div>
    </div>

    <div class="sections">
      <section class="section">
        <div class="p-cluster section-header">
          <h2 class="p-heading-4">Kategorie</h2>
          <NuxtLink
            :to="`/admin/projects/${projectId}/categories/new`"
            class="p-button p-button-small"
          >
            Nová kategorie
          </NuxtLink>
        </div>
        <div v-if="!projectCategories.length" class="empty-message">
          Žádné kategorie v tomto projektu.
        </div>
        <div v-else class="p-auto-grid cards-grid">
          <AdminCard
            v-for="category of projectCategories"
            :key="category.id"
            :title="category.name"
            :to="`/admin/projects/${projectId}/categories/${category.id}`"
          />
        </div>
      </section>

      <section class="section">
        <div class="p-cluster section-header">
          <h2 class="p-heading-4">Alba</h2>
          <NuxtLink
            :to="`/admin/projects/${projectId}/albums/new`"
            class="p-button p-button-small"
          >
            Nové album
          </NuxtLink>
        </div>
        <div v-if="!projectAlbums.length" class="empty-message">
          Žádná alba v tomto projektu.
        </div>
        <template v-else>
          <div
            v-for="[categoryName, categoryAlbums] of albumsByCategory"
            :key="categoryName"
            class="category-group"
          >
            <h3 class="category-heading">{{ categoryName }}</h3>
            <div class="p-auto-grid cards-grid">
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
          </div>
        </template>
      </section>
    </div>
  </div>
  <div v-else-if="error" class="error-message">Projekt nenalezen.</div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
})

const route = useRoute("admin-projects-projectId")
const projectId = computed(() => route.params.projectId)

const { data: projects } = await useFetch("/api/projects")
const { data: categories } = await useFetch("/api/categories")
const { data: albums } = await useFetch("/api/albums")

const project = computed(() =>
  projects.value?.find((p) => p.id === projectId.value),
)

const error = computed(() => !project.value)

const projectCategories = computed(
  () => categories.value?.filter((c) => c.projectId === projectId.value) || [],
)

const projectAlbums = computed(
  () => albums.value?.filter((a) => a.projectId === projectId.value) || [],
)

const albumsByCategory = computed(() => {
  const grouped = Object.groupBy(
    projectAlbums.value,
    (album) => album.categoryName || "Bez kategorie",
  )
  return Object.entries(grouped).sort(([a], [b]) => {
    if (a === "Bez kategorie") {
      return 1
    }
    if (b === "Bez kategorie") {
      return -1
    }
    return a.localeCompare(b, "cs")
  })
})

// Set breadcrumb data
const routeMeta = route.meta as { projectName?: string }
watchEffect(() => {
  if (project.value) {
    routeMeta.projectName = project.value.name
  }
})
</script>

<style scoped>
.header-container {
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.header-actions {
  gap: var(--space-4);
}

.header-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.header-link:hover {
  color: var(--brand-color);
}

.sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
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

.category-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.category-heading {
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-6);
  color: var(--text-color-2);
  margin: 0;
}

.media-count {
  font-size: var(--font-size--2);
  color: var(--text-color-3);
}
</style>
