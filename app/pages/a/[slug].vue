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
        <label class="sort-select">
          <span class="visually-hidden">Řazení</span>
          <select
            :value="effectiveSortOrder"
            @change="
              setSortOrder(
                ($event.target as HTMLSelectElement).value as 'date' | 'name',
              )
            "
          >
            <option value="date">Datum</option>
            <option value="name">Název</option>
          </select>
        </label>
      </p>
    </header>

    <JustifiedGrid
      v-if="sortedMedia.length"
      :media="sortedMedia"
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

// Sort order management with localStorage persistence
const localStorageKey = computed(() => `albumSort:${route.params.slug}`)
const sortOverride = ref<"date" | "name" | null>(null)

// Load override from localStorage on client
onMounted(() => {
  const stored = localStorage.getItem(localStorageKey.value)
  if (stored === "date" || stored === "name") {
    sortOverride.value = stored
  }
})

const effectiveSortOrder = computed(() => {
  return sortOverride.value ?? data.value?.album?.sortOrder ?? "date"
})

function setSortOrder(order: "date" | "name") {
  const albumDefault = data.value?.album?.sortOrder ?? "date"
  if (order === albumDefault) {
    // Reset to album default - remove override
    sortOverride.value = null
    localStorage.removeItem(localStorageKey.value)
  } else {
    // Set override
    sortOverride.value = order
    localStorage.setItem(localStorageKey.value, order)
  }
}

// Client-side sorting when override differs from API order
const sortedMedia = computed(() => {
  const media = data.value?.media ?? []
  const albumDefault = data.value?.album?.sortOrder ?? "date"

  // If effective sort matches album default, API already sorted correctly
  if (effectiveSortOrder.value === albumDefault) {
    return media
  }

  // Need to re-sort client-side
  return [...media].sort((a, b) => {
    if (effectiveSortOrder.value === "name") {
      return (a.originalName ?? a.fileName ?? "").localeCompare(
        b.originalName ?? b.fileName ?? "",
      )
    } else {
      return (a.dateTaken ?? "").localeCompare(b.dateTaken ?? "")
    }
  })
})

const { open } = useLightbox(sortedMedia)

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
  align-items: center;
  gap: var(--space-3);
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

.sort-select {
  margin-left: auto;
  font-size: var(--font-size--1);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
