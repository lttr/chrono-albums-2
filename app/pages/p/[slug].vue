<template>
  <div class="project-page">
    <header v-if="data?.project" class="project-header">
      <h1>{{ data.project.name }}</h1>
    </header>

    <!-- Show categories if project has them -->
    <section v-if="data?.hasCategories" class="categories-list">
      <h2>Kategorie</h2>
      <div class="p-auto-grid categories-grid">
        <NuxtLink
          v-for="category of data.categories"
          :key="category.id"
          :to="`/c/${category.slug}`"
          class="category-card"
        >
          <strong>{{ category.name }}</strong>
        </NuxtLink>
      </div>
    </section>

    <!-- Show albums directly if no categories (chronologically, newer first) -->
    <section v-else-if="data?.albums.length" class="albums-list">
      <div class="p-auto-grid albums-grid">
        <AlbumCard
          v-for="album of data.albums"
          :key="album.id"
          :slug="album.slug"
          :title="album.title"
          :month="album.month"
          :year="album.year"
          :cover-thumbnail="album.coverThumbnail"
          :cover-lqip="album.coverLqip"
          :media-count="album.mediaCount"
        />
      </div>
    </section>

    <p
      v-else-if="data && !data.hasCategories && !data.albums.length"
      class="empty-state"
    >
      Projekt neobsahuje žádná alba.
    </p>

    <p v-if="error" class="error-state">Projekt nenalezen.</p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "gallery",
})

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})

const route = useRoute("p-slug")
const { data, error } = useFetch(`/api/projects/by-slug/${route.params.slug}`)
</script>

<style scoped>
.project-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-3);
}

.project-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.categories-list,
.albums-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.categories-grid {
  --auto-grid-min: 200px;
}

.albums-grid {
  --auto-grid-min: 280px;
}

.category-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
  text-decoration: none;
  color: inherit;
}

.category-card:hover {
  background: var(--surface-2);
}

.empty-state,
.error-state {
  color: var(--text-color-2);
  font-style: italic;
}

.error-state {
  color: var(--red-6);
}
</style>
