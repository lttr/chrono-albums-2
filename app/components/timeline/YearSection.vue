<template>
  <section :id="`year-${year}`" class="year-section">
    <h2 class="year-section__heading">{{ year }}</h2>
    <div class="year-section__grid">
      <AlbumCard v-for="album of albums" :key="album.id" v-bind="album" />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Album {
  id: string
  slug: string
  title: string
  month: number | null
  year: number
  coverThumbnail: string | null
  coverLqip: string | null
  mediaCount: number
  projectName: string | null
  categoryName: string | null
}

defineProps<{
  year: number
  albums: Album[]
}>()
</script>

<style scoped>
.year-section {
  scroll-margin-top: var(--space-4);
}

.year-section__heading {
  margin: 0 0 var(--space-4);
  font-size: var(--font-size-4);
  font-weight: 600;
  color: var(--text-color-1);
}

.year-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .year-section__grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-3);
  }
}
</style>
