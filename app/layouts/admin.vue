<template>
  <div class="admin-layout">
    <!-- Admin top bar -->
    <header class="admin-header">
      <div class="header-left p-cluster">
        <NuxtLink to="/" class="logo-link p-cluster">
          <Icon name="uil-comment-alt-image" class="logo-icon" />
          <span class="logo-text p-base-text-bold">Chrono Albums</span>
        </NuxtLink>
      </div>

      <div class="header-right">
        <NuxtLink to="/admin" class="header-link">
          <Icon name="uil-th-large" aria-hidden="true" />
          <span class="header-link-text">Admin</span>
        </NuxtLink>

        <span v-if="user" class="user-name">{{ user.name }}</span>

        <button
          type="button"
          class="menu-btn"
          :aria-expanded="menuOpen"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <Icon name="uil-ellipsis-v" />
        </button>

        <div v-if="menuOpen" class="menu-dropdown">
          <ColorModeSwitch class="menu-item" />
          <NuxtLink
            to="/admin/profile"
            class="menu-item menu-link"
            @click="menuOpen = false"
          >
            <Icon name="uil-user" aria-hidden="true" />
            Profil
          </NuxtLink>
        </div>
      </div>
    </header>

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
const { user } = await useAuth()

const sidebarOpen = ref(false)
const menuOpen = ref(false)
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

  // Close menu on click outside
  const menuHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest(".header-right")) {
      menuOpen.value = false
    }
  }
  document.addEventListener("click", menuHandler)
  onUnmounted(() => document.removeEventListener("click", menuHandler))
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
  height: 100vh;
  overflow: hidden;
}

/* Admin header */
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
  border-bottom: var(--border-1);
  background: var(--surface-0);
}

.logo-link {
  text-decoration-color: var(--text-color-1);

  &:visited {
    color: var(--color-text-1);
  }
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  @media (width < 480px) {
    display: none;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  position: relative;
}

.header-link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  color: var(--text-color-2);
  text-decoration: none;
  border-radius: var(--radius-2);

  &:hover {
    background: var(--surface-1);
    color: var(--text-color-1);
  }
}

.header-link-text {
  @media (width < 600px) {
    display: none;
  }
}

.user-name {
  font-size: var(--font-size--1);
  color: var(--text-color-2);

  @media (width < 480px) {
    display: none;
  }
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1);
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  color: var(--text-color-2);
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: var(--text-color-1);
  }
}

.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 140px;
  padding: var(--space-2);
  margin-top: var(--space-1);
  background: var(--surface-0);
  border: var(--border-1);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-3);
}

.menu-item {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-1);
}

.menu-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-color-2);
  text-decoration: none;
  font-size: var(--font-size--1);

  &:hover {
    background: var(--surface-1);
    color: var(--text-color-1);
  }
}

.admin-body {
  display: flex;
  flex: 1;
  position: relative;
  min-height: 0;
  overflow: hidden;
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
  overflow: auto;
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
