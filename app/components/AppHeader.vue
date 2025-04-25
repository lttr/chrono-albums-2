<template>
  <header class="header">
    <section>
      <NuxtLink to="/" class="link-home p-cluster">
        <Icon name="uil-images" class="app-icon" />
        <span class="app-title p-base-text-bold">Chrono Albums</span>
      </NuxtLink>
    </section>
    <section class="right">
      <span class="p-cluster">
        <NuxtLink class="nav-link" to="/album/new">
          <Icon name="uil-image-plus" class="icon-in-button" />
          Nové album
        </NuxtLink>
      </span>
    </section>
  </header>
</template>

<script lang="ts" setup></script>

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

.icon-in-button {
  font-size: var(--font-size-0);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-2);
  padding-inline: var(--space-3);

  &:hover {
    text-decoration-color: var(--text-color-1);
  }
}

.link-home {
  text-decoration-color: var(--text-color-1);

  &:visited {
    color: var(--color-text-1);
  }
}
</style>
