<template>
  <div class="p-stack">
    <header v-if="data?.album" class="album-header">
      <nav class="breadcrumb">
        <NuxtLink
          v-if="data.album.projectSlug"
          :to="`/p/${data.album.projectSlug}`"
        >
          {{ data.album.projectName }}
        </NuxtLink>
        <template v-if="data.album.categorySlug">
          <span>/</span>
          <NuxtLink :to="`/c/${data.album.categorySlug}`">
            {{ data.album.categoryName }}
          </NuxtLink>
        </template>
        <span>/</span>
      </nav>
      <h1>{{ data.album.title }}</h1>
      <p class="album-date">{{ data.album.month }}/{{ data.album.year }}</p>
    </header>

    <section v-if="data?.media.length" class="media-grid p-auto-grid">
      <figure v-for="item of data.media" :key="item.id" class="media-item">
        <a :href="`/m/${item.slug}`" target="_blank" class="media-link">
          <img
            v-if="item.kind === 'image'"
            :src="`/uploads/${item.fileName}`"
            :alt="item.originalName || item.fileName"
            loading="lazy"
          />
          <video
            v-else
            :src="`/uploads/${item.fileName}`"
            preload="metadata"
          ></video>
        </a>
        <figcaption v-if="item.originalName">
          {{ item.originalName }}
        </figcaption>
      </figure>
    </section>

    <p v-else-if="data && !data.media.length" class="empty-state">
      Album neobsahuje žádná média.
    </p>

    <p v-if="error" class="error-state">Album nenalezeno.</p>
  </div>
</template>

<script lang="ts" setup>
useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})

const route = useRoute("a-slug")
const { data, error } = useFetch(`/api/albums/by-slug/${route.params.slug}`)
</script>

<style scoped>
.album-header {
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

.breadcrumb a {
  color: inherit;
  text-decoration: underline;
}

.breadcrumb a:hover {
  color: var(--text-color-1);
}

.album-date {
  color: var(--text-color-2);
  font-size: var(--font-size-1);
}

.media-grid {
  --auto-grid-min: 200px;
}

.media-item {
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius-2);
  background: var(--surface-0);
}

.media-link {
  display: block;
}

.media-item img,
.media-item video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
  cursor: pointer;
}

.media-item img:hover,
.media-item video:hover {
  opacity: 0.9;
}

.media-item figcaption {
  padding: var(--space-2);
  font-size: var(--font-size--1);
  color: var(--text-color-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
