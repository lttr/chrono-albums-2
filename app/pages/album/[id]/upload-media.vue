<template>
  <div class="p-flow">
    <h1>Nahrání médií</h1>
    <section class="params">
      <span>Název alba:</span>
      <span>{{ route.query.title }}</span>
      <span>Rok:</span>
      <span>{{ route.query.year }}</span>
      <span>Měsíc:</span>
      <span>{{ route.query.month }}</span>
      <span>Kategorie:</span>
      <span>{{ route.query.category }}</span>
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
  </div>
</template>

<script lang="ts" setup>
import { AlbumSearchParamsSchema } from "~~/shared/types/albums"
import { formatError } from "~~/shared/utils/errors"

const params = ref<AlbumSearchParams>()
const prettyError = ref("")

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    const result = AlbumSearchParamsSchema.safeParse({
      ...route.params,
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
</style>
