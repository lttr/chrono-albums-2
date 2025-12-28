<template>
  <button
    type="button"
    class="grid-item"
    :style="{
      width: `${box.width}px`,
      height: `${box.height}px`,
      transform: `translate(${box.left}px, ${box.top}px)`,
    }"
    @click="$emit('click', index)"
  >
    <div
      v-if="media.lqip"
      class="grid-item__lqip"
      :style="{ backgroundImage: `url(${media.lqip})` }"
    ></div>
    <img
      :src="media.thumbnailUrl"
      :alt="`Photo ${index + 1}`"
      :loading="eager ? 'eager' : 'lazy'"
      class="grid-item__img"
      @load="($event.target as HTMLImageElement).classList.add('loaded')"
    />
  </button>
</template>

<script setup lang="ts">
interface Props {
  media: {
    id: string
    slug: string
    thumbnailUrl: string
    lqip: string | null
  }
  box: {
    width: number
    height: number
    top: number
    left: number
  }
  index: number
  eager?: boolean
}

defineProps<Props>()
defineEmits<{
  click: [index: number]
}>()
</script>

<style scoped>
.grid-item {
  position: absolute;
  overflow: hidden;
  padding: 0;
  border: none;
  cursor: pointer;
  background: var(--surface-2);
}

.grid-item__lqip {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
}

.grid-item__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.grid-item__img.loaded {
  opacity: 1;
}
</style>
