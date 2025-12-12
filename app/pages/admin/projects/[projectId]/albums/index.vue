<template>
  <div>
    <div class="p-cluster header-container">
      <h1 class="p-heading-2">Alba</h1>
      <NuxtLink
        :to="`/admin/projects/${projectId}/albums/new`"
        class="p-button p-button-brand"
      >
        Nové album
      </NuxtLink>
    </div>

    <div v-if="!projectAlbums.length" class="p-center empty-message">
      Žádná alba v tomto projektu.
    </div>

    <template v-else>
      <div
        v-for="[categoryName, categoryAlbums] of albumsByCategory"
        :key="categoryName"
        class="category-group"
      >
        <h2 class="category-heading">{{ categoryName }}</h2>
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
            <template #actions>
              <NuxtLink
                :to="`/a/${album.slug}`"
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
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
})

const route = useRoute("admin-projects-projectId-albums")
const projectId = computed(() => route.params.projectId)

const { data: albums } = await useFetch("/api/albums")

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

.category-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.category-heading {
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-6);
  color: var(--text-color-2);
  margin: 0;
  padding-bottom: var(--space-2);
  border-bottom: var(--border-1);
}

.cards-grid {
  --auto-grid-min: 200px;
}

.media-count {
  font-size: var(--font-size--2);
  color: var(--text-color-3);
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
