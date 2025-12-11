<template>
  <div class="p-stack">
    <header v-if="data?.album" class="album-header">
      <h1>{{ data.album.title }}</h1>
      <p class="album-date">{{ data.album.month }}/{{ data.album.year }}</p>
      <dl class="album-meta">
        <div v-if="data.album.projectName">
          <dt>Projekt</dt>
          <dd>{{ data.album.projectName }}</dd>
        </div>
        <div v-if="data.album.categoryName">
          <dt>Kategorie</dt>
          <dd>{{ data.album.categoryName }}</dd>
        </div>
        <div>
          <dt>Vytvořeno</dt>
          <dd>{{ formatDate(data.album.createdAt) }}</dd>
        </div>
        <div>
          <dt>Médií</dt>
          <dd>{{ data.media.length }}</dd>
        </div>
      </dl>
    </header>

    <section v-if="data?.media.length" class="media-grid p-auto-grid">
      <figure v-for="item of data.media" :key="item.id" class="media-item">
        <img
          v-if="item.kind === 'image'"
          :src="`/uploads/${item.fileName}`"
          :alt="item.originalName || item.fileName"
          loading="lazy"
        />
        <video
          v-else
          :src="`/uploads/${item.fileName}`"
          controls
          preload="metadata"
        ></video>
        <figcaption v-if="item.originalName">
          {{ item.originalName }}
        </figcaption>
      </figure>
    </section>

    <p v-else-if="data && !data.media.length" class="empty-state">
      Album neobsahuje žádná média.
    </p>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute("album-id")
const { data } = useFetch(`/api/albums/${route.params.id}`)
</script>

<style scoped>
.album-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.album-date {
  color: var(--text-color-2);
  font-size: var(--font-size-1);
}

.album-meta {
  display: flex;
  gap: var(--space-4);
  margin: 0;
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.album-meta div {
  display: flex;
  gap: var(--space-2);
}

.album-meta dt {
  font-weight: var(--font-weight-6);
}

.album-meta dd {
  margin: 0;
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

.media-item img,
.media-item video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.media-item figcaption {
  padding: var(--space-2);
  font-size: var(--font-size--1);
  color: var(--text-color-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  color: var(--text-color-2);
  font-style: italic;
}
</style>
