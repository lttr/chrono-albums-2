<template>
  <div class="p-flow">
    <h1 class="p-heading-2">Nahrání médií</h1>

    <section v-if="albumInfo" class="params">
      <span>Název alba:</span>
      <span>{{ albumInfo.title }}</span>
      <span>Rok:</span>
      <span>{{ albumInfo.year }}</span>
      <span>Měsíc:</span>
      <span>{{ albumInfo.month }}</span>
      <span v-if="categoryName">Kategorie:</span>
      <span v-if="categoryName">{{ categoryName }}</span>
    </section>

    <section>
      <MediaUploader v-if="!prettyError && params" :params />
      <div v-else>
        <TheAlert type="error">
          <p class="error-heading">Neplatné parametry</p>
          <pre class="error-message">{{ prettyError }}</pre>
        </TheAlert>
      </div>
    </section>

    <div class="actions">
      <NuxtLink
        :to="`/admin/projects/${projectId}/albums/${albumId}`"
        class="p-button p-button-secondary"
      >
        Zpět na album
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AlbumSearchParamsSchema } from "~~/shared/types/albums"
import { formatError } from "~~/shared/utils/errors"

definePageMeta({
  layout: "admin",
  pageName: "Nahrát média",
})

const params = ref<AlbumSearchParams>()
const prettyError = ref("")

const route = useRoute("admin-projects-projectId-albums-albumId-upload")
const projectId = computed(() => route.params.projectId)
const albumId = computed(() => route.params.albumId)

// Fetch album data if query params are missing
const { data: albumData } = await useFetch(
  () => `/api/albums/${albumId.value}`,
  {
    immediate: !route.query.title,
  },
)

const albumInfo = computed(() => {
  // Prefer query params if available, fall back to fetched data
  if (route.query.title) {
    return {
      title: route.query.title as string,
      year: route.query.year as string,
      month: route.query.month as string,
      categoryId: route.query.categoryId as string,
      categoryName: null as string | null,
    }
  }
  if (albumData.value?.album) {
    const album = albumData.value.album
    return {
      title: album.title,
      year: String(album.year),
      month: String(album.month),
      categoryId: album.categoryId,
      categoryName: album.categoryName,
    }
  }
  return null
})

const categoryName = computed(() => {
  return albumInfo.value?.categoryName ?? null
})

watch(
  [albumId, albumInfo],
  () => {
    if (!albumInfo.value) {
      prettyError.value = "Nepodařilo se načíst data alba."
      return
    }
    const result = AlbumSearchParamsSchema.safeParse({
      id: albumId.value,
      title: albumInfo.value.title,
      year: albumInfo.value.year,
      month: albumInfo.value.month,
      categoryId: albumInfo.value.categoryId,
      projectId: projectId.value,
    })
    if (result.success) {
      params.value = result.data
      prettyError.value = ""
    } else {
      prettyError.value = formatError(result.error)
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.params {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: var(--space-3);
  row-gap: var(--space-1);
  font-size: var(--font-size--1);
}

.error-heading {
  font-size: var(--font-size-0);
  font-weight: bold;
  margin-bottom: var(--space-3);
}

.error-message {
  white-space: pre-wrap;
}

.actions {
  margin-top: var(--space-4);
}
</style>
