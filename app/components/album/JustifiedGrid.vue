<template>
  <div
    ref="containerRef"
    class="justified-grid"
    :style="{ height: `${containerHeight}px` }"
  >
    <template v-for="(item, index) of media" :key="item.id">
      <GridItem
        v-if="boxes[index]"
        :media="item"
        :box="boxes[index]!"
        :index="index"
        :eager="index < 12"
        @click="(idx, trigger) => emit('open', idx, trigger)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
interface MediaItem {
  id: string
  slug: string
  width: number | null
  height: number | null
  thumbnailUrl: string
  fullUrl: string
  lqip: string | null
  originalName?: string | null
}

const props = defineProps<{
  media: MediaItem[]
}>()

const emit = defineEmits<{
  open: [index: number, trigger: HTMLElement]
}>()

const containerRef = ref<HTMLElement | null>(null)
const { boxes, containerHeight } = useJustifiedLayout(
  computed(() => props.media),
  containerRef,
  { targetRowHeight: 280, boxSpacing: 4 },
)
</script>

<style scoped>
.justified-grid {
  position: relative;
  width: 100%;
}
</style>
