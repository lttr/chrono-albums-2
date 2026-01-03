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
        <div>
          <dt><label for="sort-order">Řazení</label></dt>
          <dd>
            <select
              id="sort-order"
              :value="data.album.sortOrder ?? 'date'"
              :disabled="isSaving"
              @change="
                setSortOrder(
                  ($event.target as HTMLSelectElement).value as 'date' | 'name',
                )
              "
            >
              <option value="date">Datum</option>
              <option value="name">Název</option>
            </select>
          </dd>
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

    <div v-else-if="status === 'success' && !data" class="error-message">
      Album nenalezeno.
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
})

const route = useRoute("admin-projects-projectId-albums-albumId")
const projectId = computed(() => route.params.projectId)
const albumId = computed(() => route.params.albumId)

const { data, refresh, status } = useFetch(() => `/api/albums/${albumId.value}`)

// Sort order management
const isSaving = ref(false)

async function setSortOrder(sortOrder: "date" | "name") {
  if (data.value?.album.sortOrder === sortOrder) {
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/albums/${albumId.value}`, {
      method: "PATCH",
      body: { sortOrder },
    })
    await refresh()
  } finally {
    isSaving.value = false
  }
}

// Set breadcrumb data and page title
const routeMeta = route.meta as { albumTitle?: string }
watchEffect(() => {
  if (data.value?.album) {
    routeMeta.albumTitle = data.value.album.title
  }
})

useHead({
  title: computed(() =>
    data.value?.album ? `${data.value.album.title} | Admin` : "Album | Admin",
  ),
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
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  margin: 0;
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.album-meta div {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

@media (min-width: 640px) {
  .album-meta div:last-child {
    margin-left: auto;
  }
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
  background: var(--surface-0);
}

.media-item img,
.media-item video {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: var(--radius-2);
}

.media-item figcaption {
  margin-block-start: 0;
  padding: var(--space-1) var(--space-2);
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
