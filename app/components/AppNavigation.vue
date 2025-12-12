<template>
  <span class="p-cluster">
    <NuxtLink class="nav-link" to="/admin">
      <Icon name="uil-th-large" class="icon-in-button" />
      Admin
    </NuxtLink>
    <NuxtLink class="nav-link" to="/admin/albums/new">
      <Icon name="uil-image-plus" class="icon-in-button" />
      Nové album
    </NuxtLink>
  </span>
</template>

<script lang="ts" setup></script>

<style scoped>
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
</style>
