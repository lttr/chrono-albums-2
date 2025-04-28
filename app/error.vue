<template>
  <NuxtLayout>
    <div class="wrapper">
      <div class="p-flow p-center">
        <h1>{{ message }}</h1>
        <h2>{{ error.statusCode }}</h2>
        <p>{{ error.message }}</p>
        <button class="backbutton" @click="handleError">Zpět</button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

const { error } = defineProps<{
  error: NuxtError
}>()

const message =
  error.statusCode === 404 ? "Tato stránka nebyla nalezena" : "Chybné parametry"

const router = useRouter()
const handleError = () => {
  router.go(-1)
  return clearError()
}
</script>

<style scoped>
.wrapper {
  display: grid;
  place-items: center;
  min-height: 80vh;
}

.backbutton {
  font-size: var(--font-size-1);
  height: 3rem;
  padding-inline: var(--space-5);
}
</style>
