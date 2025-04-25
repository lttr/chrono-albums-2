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
      <MediaUploader />
    </section>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
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
