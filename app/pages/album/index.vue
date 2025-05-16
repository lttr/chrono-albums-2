<template>
  <div>
    <h1>Alba</h1>
    <section class="p-flow">
      <div v-for="album of albums" :key="album.id">{{ album }}</div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { Album } from "~~/server/database/schema"

const { data: albums } = useFetch<Album[]>("/api/albums")
</script>

<style scoped></style>
