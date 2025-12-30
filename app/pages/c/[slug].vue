<template>
  <div class="p-stack">
    <header v-if="data?.category" class="category-header">
      <nav class="breadcrumb">
        <NuxtLink
          v-if="data.project"
          class="link"
          :to="`/p/${data.project.slug}`"
        >
          {{ data.project.name }}
        </NuxtLink>
        <span>/</span>
      </nav>
      <h1>{{ data.category.name }}</h1>
    </header>

    <section v-if="data?.albums.length" class="albums-list">
      <div class="p-auto-grid">
        <NuxtLink
          v-for="album of data.albums"
          :key="album.id"
          :to="`/a/${album.slug}`"
          class="album-card"
        >
          <strong class="album-title">{{ album.title }}</strong>
          <span class="album-date">{{ album.month }}/{{ album.year }}</span>
        </NuxtLink>
      </div>
    </section>

    <p v-else-if="data && !data.albums.length" class="empty-state">
      Kategorie neobsahuje žádná alba.
    </p>

    <p v-if="error" class="error-state">Kategorie nenalezena.</p>
  </div>
</template>

<script lang="ts" setup>
useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})

const route = useRoute("c-slug")
const { data, error } = useFetch(`/api/categories/by-slug/${route.params.slug}`)
</script>

<style scoped>
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

.p-auto-grid {
  --auto-grid-min: 200px;
}

.album-card {
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

.album-card:hover {
  background: var(--surface-2);
}

.album-title {
  font-weight: var(--font-weight-6);
}

.album-date {
  color: var(--text-color-2);
  font-size: var(--font-size--1);
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
