<template>
  <nav class="sidebar" aria-label="Admin navigace">
    <div class="sidebar-section">
      <h2 id="projects-heading" class="sidebar-header">Projekty</h2>
      <div v-if="pending" class="sidebar-loading" aria-live="polite">
        Načítám...
      </div>
      <ul
        v-else-if="projects?.length"
        class="sidebar-nav"
        aria-labelledby="projects-heading"
      >
        <li v-for="project of projects" :key="project.id">
          <NuxtLink
            :to="`/admin/projects/${project.id}`"
            class="sidebar-link"
            :class="{ active: isProjectActive(project.id) }"
            :aria-current="isProjectActive(project.id) ? 'page' : undefined"
          >
            <Icon name="uil-folder" class="sidebar-icon" aria-hidden="true" />
            {{ project.name }}
          </NuxtLink>
        </li>
      </ul>
      <div v-else class="sidebar-empty">Žádné projekty</div>
    </div>

    <div class="sidebar-section sidebar-actions">
      <NuxtLink to="/admin/albums/new" class="sidebar-link sidebar-action">
        <Icon name="uil-image-plus" aria-hidden="true" />
        Nové album
      </NuxtLink>
      <NuxtLink to="/admin/projects/new" class="sidebar-link sidebar-action">
        <Icon name="uil-plus" aria-hidden="true" />
        Nový projekt
      </NuxtLink>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: projects, pending } = useFetch("/api/projects")

function isProjectActive(projectId: string): boolean {
  const params = route.params as Record<string, string | undefined>
  return params.projectId === projectId
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-3);
  overflow-y: auto;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar-header {
  padding: var(--space-1) var(--space-2);
  color: var(--text-color-3);
  font-size: var(--font-size--2);
  font-weight: var(--font-weight-6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2);
  color: var(--text-color-2);
  font-size: var(--font-size--1);
  text-decoration: none;
  border-radius: var(--radius-2);
  transition:
    background-color 0.15s,
    color 0.15s;

  &:hover {
    background: var(--surface-1);
    color: var(--text-color-1);
  }

  &.active {
    background: var(--brand-color-light);
    color: var(--brand-color);
    font-weight: var(--font-weight-5);
  }
}

.sidebar-icon {
  flex-shrink: 0;
  font-size: 1rem;
}

.sidebar-loading,
.sidebar-empty {
  padding: var(--space-2);
  color: var(--text-color-3);
  font-size: var(--font-size--1);
  font-style: italic;
}

.sidebar-actions {
  margin-top: auto;
  padding-top: var(--space-3);
  border-top: var(--border-1);
}

.sidebar-action {
  color: var(--brand-color);

  &:hover {
    background: var(--brand-color-light);
  }
}
</style>
