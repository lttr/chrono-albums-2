<template>
  <div class="p-stack">
    <h1>Alba</h1>
    <section
      v-for="[year, yearAlbums] of albumsByYear"
      :key="year"
      class="year-section"
    >
      <h2 class="year-heading">{{ year }}</h2>
      <div class="p-auto-grid cards-grid">
        <AdminCard
          v-for="album of yearAlbums"
          :key="album.id"
          :title="album.title"
          :badge="`${album.month}/${album.year}`"
          :to="`/album/${album.id}`"
        >
          <dl class="album-meta">
            <div>
              <dt>Projekt</dt>
              <dd>{{ album.projectName || "–" }}</dd>
            </div>
            <div>
              <dt>Kategorie</dt>
              <dd>{{ album.categoryName || "–" }}</dd>
            </div>
            <div>
              <dt>Médií</dt>
              <dd>{{ album.mediaCount }}</dd>
            </div>
          </dl>
          <template #actions>
            <NuxtLink
              :to="`/a/${album.slug}`"
              class="public-link"
              title="Veřejný odkaz"
              target="_blank"
              @click.stop
            >
              <Icon name="uil:external-link-alt" />
            </NuxtLink>
          </template>
        </AdminCard>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { data: albums } = useFetch("/api/albums")

const albumsByYear = computed(() => {
  if (!albums.value) {
    return []
  }
  const grouped = Object.groupBy(albums.value, (album) => album.year)
  return Object.entries(grouped)
    .map(([year, albums]) => [Number(year), albums] as const)
    .sort((a, b) => b[0] - a[0])
})
</script>

<style scoped>
.year-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.year-heading {
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-6);
  margin: 0;
  padding-bottom: var(--space-2);
  border-bottom: var(--border-1);
}

.cards-grid {
  --auto-grid-min: 220px;
}

.public-link {
  color: var(--text-color-2);
  opacity: 0.5;
  transition: opacity 0.15s;
}

.public-link:hover {
  opacity: 1;
  color: var(--brand-color);
}

.album-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  font-size: var(--font-size--2);
}

.album-meta div {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.album-meta dt {
  flex-shrink: 0;
  width: 5rem;
  font-weight: var(--font-weight-6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.album-meta dd {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
