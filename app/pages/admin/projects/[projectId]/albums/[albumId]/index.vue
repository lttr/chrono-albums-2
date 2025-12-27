<template>
  <div class="p-stack">
    <header v-if="data?.album" class="album-header">
      <div class="p-cluster header-row">
        <h1 class="p-heading-2">{{ data.album.title }}</h1>
        <div class="header-actions">
          <NuxtLink
            :to="`/admin/projects/${projectId}/albums/${albumId}/upload`"
            class="p-button p-button-small"
          >
            <Icon name="uil-image-plus" />
            Nahrát média
          </NuxtLink>
          <NuxtLink
            :to="`/a/${data.album.slug}`"
            class="public-link"
            target="_blank"
          >
            <Icon name="uil:external-link-alt" />
            Veřejný odkaz
          </NuxtLink>
        </div>
      </div>
      <p class="album-date">{{ data.album.month }}/{{ data.album.year }}</p>
      <dl class="album-meta">
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
          :src="item.thumbnailUrl"
          :alt="item.originalName || item.fileName"
          loading="lazy"
        />
        <video v-else :src="item.fullUrl" controls preload="metadata"></video>
        <figcaption v-if="item.originalName">
          {{ item.originalName }}
        </figcaption>
      </figure>
    </section>

    <p v-else-if="data && !data.media.length" class="empty-state">
      Album neobsahuje žádná média.
      <NuxtLink :to="`/admin/projects/${projectId}/albums/${albumId}/upload`">
        Nahrát média
      </NuxtLink>
    </p>

    <div v-else-if="!data" class="error-message">Album nenalezeno.</div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
})

const route = useRoute("admin-projects-projectId-albums-albumId")
const projectId = computed(() => route.params.projectId)
const albumId = computed(() => route.params.albumId)

const { data } = useFetch(() => `/api/albums/${albumId.value}`)

// Set breadcrumb data
const routeMeta = route.meta as { albumTitle?: string }
watchEffect(() => {
  if (data.value?.album) {
    routeMeta.albumTitle = data.value.album.title
  }
})
</script>

<style scoped>
.album-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.header-row {
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
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

.error-message {
  padding: var(--space-6);
  color: var(--negative-color);
  text-align: center;
}
</style>
