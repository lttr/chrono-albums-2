<template>
  <div class="category-page">
    <header v-if="data?.category" class="category-header">
      <nav v-if="data.project" class="breadcrumb">
        <NuxtLink class="link" :to="`/p/${data.project.slug}`">
          {{ data.project.name }}
        </NuxtLink>
        <span>/</span>
      </nav>
      <h1>{{ data.category.name }}</h1>
    </header>

    <section v-if="data?.albums.length" class="albums-list">
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

    <p v-else-if="data && !data.albums.length" class="empty-state">
      Kategorie neobsahuje žádná alba.
    </p>

    <p v-if="error" class="error-state">Kategorie nenalezena.</p>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "gallery",
})

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})

const route = useRoute("c-slug")
const { data, error } = useFetch(`/api/categories/by-slug/${route.params.slug}`)
</script>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-3);
}

.category-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.breadcrumb {
  display: flex;
  gap: var(--space-2);
  font-size: var(--font-size--1);
  color: var(--text-color-2);
}

.link {
  color: inherit;
  text-decoration: underline;
}

.link:hover {
  color: var(--text-color-1);
}

.albums-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.albums-grid {
  --auto-grid-min: 280px;
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
