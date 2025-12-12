<template>
  <div class="p-flow">
    <h1 class="p-heading-2">Nahrání médií</h1>

    <section class="params">
      <span>Název alba:</span>
      <span>{{ route.query.title }}</span>
      <span>Rok:</span>
      <span>{{ route.query.year }}</span>
      <span>Měsíc:</span>
      <span>{{ route.query.month }}</span>
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

const { data: categories } = await useFetch("/api/categories")

const categoryName = computed(() => {
  const categoryId = route.query.categoryId
  if (!categoryId) {
    return null
  }
  return categories.value?.find((c) => c.id === categoryId)?.name
})

watch(
  () => route.fullPath,
  () => {
    const result = AlbumSearchParamsSchema.safeParse({
      id: albumId.value,
      ...route.query,
    })
    if (result.success) {
      params.value = result.data
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
