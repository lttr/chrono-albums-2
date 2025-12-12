<template>
  <div class="public-layout">
    <header class="public-header">
      <NuxtLink to="/" class="logo-link">
        <Icon name="uil-comment-alt-image" class="logo-icon" />
        <span class="logo-text">Chrono Albums</span>
      </NuxtLink>

      <div class="header-right">
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
            to="/admin"
            class="menu-item menu-link"
            @click="menuOpen = false"
          >
            <Icon name="uil-setting" aria-hidden="true" />
            Admin
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="main p-container">
      <NuxtPage v-if="!error" />
      <slot v-else></slot>
    </main>

    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
const error = useError()
const menuOpen = ref(false)

// Close menu on click outside
onMounted(() => {
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest(".header-right")) {
      menuOpen.value = false
    }
  }
  document.addEventListener("click", handler)
  onUnmounted(() => document.removeEventListener("click", handler))
})
</script>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.public-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
}

.logo-link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  text-decoration: none;
  color: var(--text-color-3);

  &:hover {
    color: var(--text-color-2);
  }
}

.logo-icon {
  font-size: 1rem;
}

.logo-text {
  font-size: var(--font-size--1);
  font-weight: var(--font-weight-5);
}

.header-right {
  position: relative;
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
  color: var(--text-color-3);
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    color: var(--text-color-2);
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

.main {
  flex: 1;
  margin-top: var(--space-4);
  padding-bottom: var(--space-7);
}
</style>
