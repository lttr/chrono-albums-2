<template>
  <button
    type="button"
    class="video-grid-item"
    :style="{
      width: `${box.width}px`,
      height: `${box.height}px`,
      transform: `translate(${box.left}px, ${box.top}px)`,
    }"
    :disabled="media.processing"
    @click="handleClick"
  >
    <div
      v-if="media.lqip"
      class="video-grid-item__lqip"
      :style="{ backgroundImage: `url(${media.lqip})` }"
    ></div>
    <img
      :src="media.thumbnailUrl"
      :alt="altText"
      :loading="eager ? 'eager' : 'lazy'"
      class="video-grid-item__img"
      @load="($event.target as HTMLImageElement).classList.add('loaded')"
    />
    <span v-if="media.processing" class="video-overlay processing">
      Processing...
    </span>
    <span v-else class="video-overlay play-icon">&#9654;</span>
    <span v-if="media.duration" class="video-duration">
      {{ formatDuration(media.duration) }}
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  media: {
    id: string
    slug: string
    thumbnailUrl: string
    lqip: string | null
    originalName?: string | null
    processing?: boolean
    duration?: number | null
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

const props = defineProps<Props>()
const emit = defineEmits<{
  open: [index: number, trigger: HTMLElement]
}>()

const altText = computed(() => {
  if (props.media.originalName) {
    return props.media.originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
  }
  return `Video ${props.index + 1}`
})

function formatDuration(seconds: number | null): string {
  if (!seconds) {return ""}
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function handleClick(event: MouseEvent) {
  if (!props.media.processing) {
    emit("open", props.index, event.currentTarget as HTMLElement)
  }
}
</script>

<style scoped>
.video-grid-item {
  position: absolute;
  overflow: hidden;
  padding: 0;
  border: none;
  cursor: pointer;
  background: var(--surface-2);
}

.video-grid-item:disabled {
  cursor: not-allowed;
}

.video-grid-item:focus-visible {
  outline: 2px solid var(--primary-6);
  outline-offset: 2px;
  z-index: 1;
}

.video-grid-item__lqip {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
}

.video-grid-item__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-grid-item__img.loaded {
  opacity: 1;
}

.video-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.play-icon {
  font-size: 3rem;
}

.processing {
  font-size: 0.875rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.video-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-variant-numeric: tabular-nums;
}
</style>
