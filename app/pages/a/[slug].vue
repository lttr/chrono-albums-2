<template>
  <div class="album-page">
    <header v-if="data?.album" class="album-header">
      <nav class="breadcrumb">
        <NuxtLink class="link" to="/">Albums</NuxtLink>
        <template v-if="data.album.projectSlug">
          <span>/</span>
          <NuxtLink class="link" :to="`/p/${data.album.projectSlug}`">
            {{ data.album.projectName }}
          </NuxtLink>
        </template>
        <template v-if="data.album.categorySlug">
          <span>/</span>
          <NuxtLink class="link" :to="`/c/${data.album.categorySlug}`">
            {{ data.album.categoryName }}
          </NuxtLink>
        </template>
      </nav>
      <h1>{{ data.album.title }}</h1>
      <p class="album-meta">
        {{ formatMonthYear(data.album.month, data.album.year) }}
        <span v-if="data.media.length" class="album-count">
          {{ data.media.length }} photos
        </span>
      </p>
    </header>

    <JustifiedGrid
      v-if="data?.media.length"
      :media="data.media"
      @open="(idx, trigger) => open(idx, trigger)"
    />

    <p v-else-if="data && !data.media.length" class="empty-state">
      Album has no photos yet.
    </p>

    <p v-if="error" class="error-state">Album not found.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "gallery",
})

const route = useRoute("a-slug")
const { data, error } = await useFetch(
  `/api/albums/by-slug/${route.params.slug}`,
)

const { open } = useLightbox(computed(() => data.value?.media ?? []))

useHead({
  title: () => data.value?.album?.title ?? "Album",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})
</script>

<style scoped>
.album-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-4);
}

.album-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.album-header h1 {
  margin: 0;
  font-size: var(--font-size-4);
  font-weight: 600;
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

.album-meta {
  margin: 0;
  color: var(--text-color-2);
  font-size: var(--font-size-1);
  display: flex;
  gap: var(--space-3);
}

.album-count {
  color: var(--text-color-3);
}

.empty-state,
.error-state {
  color: var(--text-color-2);
  font-style: italic;
  text-align: center;
  padding: var(--space-8) 0;
}

.error-state {
  color: var(--red-6);
}
</style>
