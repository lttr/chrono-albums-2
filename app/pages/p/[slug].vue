<template>
  <div class="p-stack">
    <header v-if="data?.project" class="project-header">
      <h1>{{ data.project.name }}</h1>
    </header>

    <!-- Show categories if project has them -->
    <section v-if="data?.hasCategories" class="categories-list">
      <h2>Kategorie</h2>
      <div class="p-auto-grid">
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

    <!-- Show albums directly if no categories -->
    <section v-else-if="data?.albums.length" class="albums-list">
      <h2>Alba</h2>
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
useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})

const route = useRoute("p-slug")
const { data, error } = useFetch(`/api/projects/by-slug/${route.params.slug}`)
</script>

<style scoped>
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

.p-auto-grid {
  --auto-grid-min: 200px;
}

.category-card,
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

.category-card:hover,
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
