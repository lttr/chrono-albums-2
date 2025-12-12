<template>
  <div class="admin-layout">
    <div class="admin-body">
      <!-- Mobile sidebar toggle -->
      <button
        type="button"
        class="sidebar-toggle"
        :aria-expanded="sidebarOpen"
        aria-label="Otevřít menu"
        @click="sidebarOpen = true"
      >
        <Icon name="uil-bars" aria-hidden="true" />
        <span class="toggle-label">Menu</span>
      </button>

      <!-- Mobile overlay -->
      <Teleport to="body">
        <Transition name="fade">
          <button
            v-if="sidebarOpen"
            type="button"
            class="sidebar-overlay"
            aria-label="Zavřít menu"
            @click="sidebarOpen = false"
          ></button>
        </Transition>
      </Teleport>

      <!-- Sidebar -->
      <Transition name="slide">
        <aside v-if="showSidebar" class="admin-sidebar-wrapper">
          <button
            type="button"
            class="sidebar-close"
            aria-label="Zavřít menu"
            @click="sidebarOpen = false"
          >
            <Icon name="uil-times" aria-hidden="true" />
          </button>
          <AdminSidebar class="admin-sidebar" @click="sidebarOpen = false" />
        </aside>
      </Transition>

      <main class="admin-main p-container">
        <AdminBreadcrumb class="admin-breadcrumb" />
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const sidebarOpen = ref(false)
const route = useRoute()

// Show sidebar: always on desktop, only when open on mobile
const isDesktop = ref(true)
const showSidebar = computed(() => isDesktop.value || sidebarOpen.value)

onMounted(() => {
  const mediaQuery = window.matchMedia("(min-width: 768px)")
  isDesktop.value = mediaQuery.matches

  const handler = (e: MediaQueryListEvent) => {
    isDesktop.value = e.matches
    if (e.matches) {
      sidebarOpen.value = false
    }
  }
  mediaQuery.addEventListener("change", handler)
  onUnmounted(() => mediaQuery.removeEventListener("change", handler))
})

// Close sidebar on route change
watch(
  () => route.path,
  () => {
    sidebarOpen.value = false
  },
)
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-body {
  display: flex;
  flex: 1;
  position: relative;
}

/* Mobile toggle button */
.sidebar-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  position: fixed;
  bottom: var(--space-4);
  left: var(--space-4);
  z-index: 30;
  padding: var(--space-2) var(--space-3);
  border: none;
  border-radius: var(--radius-2);
  background: var(--brand-color);
  color: white;
  font-size: var(--font-size--1);
  font-weight: var(--font-weight-5);
  box-shadow: var(--shadow-3);
  cursor: pointer;

  @media (width >= 768px) {
    display: none;
  }
}

.toggle-label {
  @media (width < 400px) {
    display: none;
  }
}

/* Mobile overlay */
:global(.sidebar-overlay) {
  position: fixed;
  inset: 0;
  z-index: 40;
  width: 100%;
  height: 100%;
  border: none;
  background: rgb(0 0 0 / 50%);
  cursor: default;
}

/* Sidebar wrapper */
.admin-sidebar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  width: min(280px, 85vw);
  background: var(--surface-0);
  box-shadow: var(--shadow-4);

  @media (width >= 768px) {
    position: static;
    width: 240px;
    border-right: var(--border-1);
    box-shadow: none;
  }
}

.sidebar-close {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: var(--space-2) var(--space-3);
  border: none;
  border-bottom: var(--border-1);
  background: transparent;
  color: var(--text-color-2);
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background: var(--surface-1);
  }

  @media (width >= 768px) {
    display: none;
  }
}

.admin-sidebar {
  flex: 1;
  overflow-y: auto;
}

.admin-main {
  flex: 1;
  padding-block: var(--space-4);
  overflow-x: auto;
}

.admin-breadcrumb {
  margin-bottom: var(--space-4);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;

  @media (width >= 768px) {
    transition: none;
  }
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);

  @media (width >= 768px) {
    transform: none;
  }
}
</style>
