<template>
  <nav v-if="crumbs.length > 1" class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li
        v-for="(crumb, index) of crumbs"
        :key="crumb.path"
        class="breadcrumb-item"
      >
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="crumb.path"
          class="breadcrumb-link"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="breadcrumb-current" aria-current="page">
          {{ crumb.label }}
        </span>
        <Icon
          v-if="index < crumbs.length - 1"
          name="uil-angle-right"
          class="breadcrumb-separator"
        />
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
interface Crumb {
  label: string
  path: string
}

const route = useRoute()

// Fetch entities for breadcrumb labels
const { data: projects } = useFetch("/api/projects")
const { data: categories } = useFetch("/api/categories")
const { data: albums } = useFetch("/api/albums")

const crumbs = computed<Crumb[]>(() => {
  const result: Crumb[] = []
  const path = route.path
  const params = route.params as Record<string, string | undefined>

  // Always start with Admin root
  if (path.startsWith("/admin")) {
    result.push({ label: "Admin", path: "/admin" })
  }

  // Extract route params
  const projectId = params.projectId
  const categoryId = params.categoryId
  const albumId = params.albumId

  // Get entity names from fetched data
  const project = projectId
    ? projects.value?.find((p) => p.id === projectId)
    : null
  const category = categoryId
    ? categories.value?.find((c) => c.id === categoryId)
    : null
  const album = albumId ? albums.value?.find((a) => a.id === albumId) : null

  if (projectId) {
    result.push({
      label: project?.name || "Projekt",
      path: `/admin/projects/${projectId}`,
    })

    // Check if we're in categories or albums section
    if (path.includes("/categories")) {
      result.push({
        label: "Kategorie",
        path: `/admin/projects/${projectId}/categories`,
      })

      if (categoryId) {
        result.push({
          label: category?.name || "Kategorie",
          path: `/admin/projects/${projectId}/categories/${categoryId}`,
        })
      }
    } else if (path.includes("/albums")) {
      result.push({
        label: "Alba",
        path: `/admin/projects/${projectId}/albums`,
      })

      if (albumId) {
        result.push({
          label: album?.title || "Album",
          path: `/admin/projects/${projectId}/albums/${albumId}`,
        })

        if (path.endsWith("/upload")) {
          result.push({
            label: "Nahrát média",
            path: `/admin/projects/${projectId}/albums/${albumId}/upload`,
          })
        }
      }
    }
  }

  // Handle "new" pages
  if (path.endsWith("/new")) {
    const meta = route.meta as { pageName?: string }
    if (meta.pageName) {
      result.push({ label: meta.pageName, path })
    }
  }

  return result
})
</script>

<style scoped>
.breadcrumb {
  font-size: var(--font-size--1);
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.breadcrumb-link {
  color: var(--text-color-2);
  text-decoration: none;

  &:hover {
    color: var(--brand-color);
    text-decoration: underline;
  }
}

.breadcrumb-current {
  color: var(--text-color-1);
  font-weight: var(--font-weight-5);
}

.breadcrumb-separator {
  color: var(--text-color-3);
  font-size: 1rem;
}
</style>
