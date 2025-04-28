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
      <MediaUploader v-if="!prettyError" />
      <div v-else>
        <TheAlert type="error">
          <p class="p-base-text-bold">Neplatné parametry</p>
          <p>{{ prettyError }}</p>
        </TheAlert>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { AlbumSearchParamsSchema } from "~~/shared/types/albums"
import * as z from "@zod/mini"

const route = useRoute()

const prettyError = ref("")

watch(
  () => route.fullPath,
  () => {
    console.log("route.fullPath", route.fullPath)
    const params = {
      ...route.params,
      ...route.query,
    }
    const result = AlbumSearchParamsSchema.safeParse(params)
    console.log("result", result.error)
    if (result.error) {
      prettyError.value = z.prettifyError(result.error).replace(/ → .*/, "")
    } else {
      prettyError.value = ""
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
</style>
