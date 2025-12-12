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
        <div v-for="album of yearAlbums" :key="album.id" class="album-card">
          <NuxtLink :to="`/album/${album.id}`" class="album-link">
            <div class="album-header">
              <strong class="album-title">{{ album.title }}</strong>
              <span class="album-date">{{ album.month }}/{{ album.year }}</span>
            </div>
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
          </NuxtLink>
          <NuxtLink
            :to="`/a/${album.slug}`"
            class="public-link"
            title="Veřejný odkaz"
            target="_blank"
          >
            <Icon name="uil:external-link-alt" />
          </NuxtLink>
        </div>
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

.album-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  max-width: var(--size-content-2);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
}

.album-card:hover {
  background: var(--surface-2);
}

.album-link {
  text-decoration: none;
  color: inherit;
}

.public-link {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  color: var(--text-color-2);
  opacity: 0.5;
  transition: opacity 0.15s;
}

.public-link:hover {
  opacity: 1;
  color: var(--brand-color);
}

.album-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
}

.album-title {
  font-size: var(--font-size-0);
  font-weight: var(--font-weight-6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.album-date {
  flex-shrink: 0;
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.album-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  padding-top: var(--space-2);
  border-top: var(--border-1);
  color: var(--text-color-2);
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
