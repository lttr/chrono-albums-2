<template>
  <header class="header">
    <section>
      <NuxtLink to="/" class="link-home p-cluster">
        <Icon name="uil-comment-alt-image" class="app-icon" />
        <span class="app-title p-base-text-bold">Chrono Albums</span>
      </NuxtLink>
    </section>

    <!-- Desktop nav -->
    <section class="right desktop-nav">
      <ColorModeSwitch />
      <AppNavigation />
    </section>

    <!-- Mobile menu button -->
    <button
      type="button"
      class="mobile-menu-btn"
      :aria-expanded="mobileMenuOpen"
      aria-label="Toggle menu"
      @click="mobileMenuOpen = !mobileMenuOpen"
    >
      <Icon :name="mobileMenuOpen ? 'uil-times' : 'uil-bars'" />
    </button>

    <!-- Mobile menu overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <button
          v-if="mobileMenuOpen"
          type="button"
          class="mobile-overlay"
          aria-label="Close menu"
          @click="mobileMenuOpen = false"
        ></button>
      </Transition>
    </Teleport>

    <!-- Mobile menu panel -->
    <Transition name="slide">
      <nav v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-header">
          <ColorModeSwitch />
          <button
            type="button"
            class="mobile-close-btn"
            aria-label="Close menu"
            @click="mobileMenuOpen = false"
          >
            <Icon name="uil-times" />
          </button>
        </div>
        <AppNavigation class="mobile-nav" @click="mobileMenuOpen = false" />
      </nav>
    </Transition>
  </header>
</template>

<script lang="ts" setup>
const mobileMenuOpen = ref(false)
const route = useRoute()

watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false
  },
)
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-2);
  padding-inline: var(--space-3);
  border-bottom: var(--border-1);
  box-shadow: var(--shadow-2);
}

.right {
  display: flex;
  gap: var(--space-5);
}

.app-icon {
  font-size: 2rem;
}

.link-home {
  text-decoration-color: var(--text-color-1);

  &:visited {
    color: var(--color-text-1);
  }
}

/* Desktop nav - hidden on mobile */
.desktop-nav {
  display: none;

  @media (width >= 768px) {
    display: flex;
  }
}

/* Mobile menu button - visible only on mobile */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-2);
  background: transparent;
  color: var(--color-text-1);
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background: var(--surface-2);
  }

  @media (width >= 768px) {
    display: none;
  }
}

/* Mobile overlay - :global needed because teleported to body */
:global(.mobile-overlay) {
  position: fixed;
  inset: 0;
  z-index: 40;
  width: 100%;
  height: 100%;
  border: none;
  background: rgb(0 0 0 / 50%);
  cursor: default;
}

/* Mobile menu panel */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  width: min(280px, 80vw);
  padding: var(--space-4);
  background: var(--surface-1);
  box-shadow: var(--shadow-4);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-1);
}

.mobile-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1);
  border: none;
  border-radius: var(--radius-2);
  background: transparent;
  color: var(--text-color-2);
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background: var(--surface-2);
  }
}

/* Mobile nav styling override */
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  :deep(.nav-link) {
    padding-block: var(--space-2);
    font-size: var(--font-size-1);
  }
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
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
