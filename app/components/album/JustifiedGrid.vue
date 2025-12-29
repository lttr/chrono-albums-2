<template>
  <div
    ref="containerRef"
    class="justified-grid"
    :style="{ height: `${containerHeight}px` }"
  >
    <template v-for="(item, index) of media" :key="item.id">
      <template v-if="boxes[index]">
        <VideoGridItem
          v-if="item.kind === 'video'"
          :media="item"
          :box="boxes[index]!"
          :index="index"
          :eager="index < 12"
        />
        <GridItem
          v-else
          :media="item"
          :box="boxes[index]!"
          :index="index"
          :eager="index < 12"
          @click="(idx, trigger) => emit('open', idx, trigger)"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
interface MediaItem {
  id: string
  slug: string
  kind: "image" | "video"
  width: number | null
  height: number | null
  thumbnailUrl: string
  fullUrl: string
  lqip: string | null
  originalName?: string | null
  // Video-specific
  posterUrl?: string
  duration?: number | null
  processing?: boolean
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
