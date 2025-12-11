<template>
  <div class="p-stack">
    <h1>Alba</h1>
    <div class="p-auto-grid">
      <NuxtLink
        v-for="album of albums"
        :key="album.id"
        :to="`/album/${album.id}`"
        class="album-card"
      >
        <strong class="album-title">{{ album.title }}</strong>
        <span class="album-date">{{ album.month }}/{{ album.year }}</span>
        <dl class="album-meta">
          <div>
            <dt>ID</dt>
            <dd>{{ album.id }}</dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>{{ album.projectId }}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{{ album.categoryId || "–" }}</dd>
          </div>
          <div>
            <dt>Vytvořeno</dt>
            <dd>{{ new Date(album.createdAt).toLocaleDateString("cs") }}</dd>
          </div>
        </dl>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: albums } = useFetch("/api/albums")
</script>

<style scoped>
.p-auto-grid {
  --auto-grid-min: 300px;
}

.album-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-1);
  text-decoration: none;
  color: inherit;
}

.album-card:hover {
  background: var(--surface-2);
  box-shadow: var(--shadow-2);
}

.album-title {
  font-size: var(--font-size-1);
  font-weight: var(--font-weight-6);
}

.album-date {
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.album-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  margin-top: auto;
  padding-top: var(--space-3);
  border-top: var(--border-1);
  color: var(--text-color-2);
  font-size: var(--font-size--1);
}

.album-meta div {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.album-meta dt {
  flex-shrink: 0;
  width: 6rem;
  font-weight: var(--font-weight-6);
  font-size: var(--font-size--2);
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
