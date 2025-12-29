<template>
  <div
    class="video-grid-item"
    :style="{
      width: `${box.width}px`,
      height: `${box.height}px`,
      transform: `translate(${box.left}px, ${box.top}px)`,
    }"
  >
    <!-- Playing state -->
    <video
      v-if="playing && !media.processing"
      ref="videoRef"
      :src="media.fullUrl"
      :poster="media.posterUrl"
      class="video-player"
      controls
      autoplay
      @ended="playing = false"
      @click.stop
    ></video>

    <!-- Thumbnail state -->
    <button
      v-else
      type="button"
      class="video-thumb"
      :disabled="media.processing"
      @click="play"
    >
      <div
        v-if="media.lqip"
        class="video-thumb__lqip"
        :style="{ backgroundImage: `url(${media.lqip})` }"
      ></div>
      <img
        :src="media.thumbnailUrl"
        :alt="altText"
        :loading="eager ? 'eager' : 'lazy'"
        class="video-thumb__img"
        @load="($event.target as HTMLImageElement).classList.add('loaded')"
      />
      <span v-if="media.processing" class="video-overlay processing">
        Processing...
      </span>
      <span v-else class="video-overlay play-icon">&#9654;</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  media: {
    id: string
    slug: string
    thumbnailUrl: string
    fullUrl: string
    posterUrl?: string
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
const playing = ref(false)
const videoRef = ref<HTMLVideoElement>()

const altText = computed(() => {
  if (props.media.originalName) {
    return props.media.originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
  }
  return `Video ${props.index + 1}`
})

function play() {
  if (!props.media.processing) {
    playing.value = true
  }
}

// Close video on escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && playing.value) {
      playing.value = false
    }
  }
  window.addEventListener("keydown", handleEscape)
  onUnmounted(() => window.removeEventListener("keydown", handleEscape))
})
</script>

<style scoped>
.video-grid-item {
  position: absolute;
  overflow: hidden;
}

.video-thumb {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  cursor: pointer;
  background: var(--surface-2);
  position: relative;
}

.video-thumb:disabled {
  cursor: not-allowed;
}

.video-thumb:focus-visible {
  outline: 2px solid var(--primary-6);
  outline-offset: 2px;
  z-index: 1;
}

.video-thumb__lqip {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
}

.video-thumb__img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-thumb__img.loaded {
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

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: black;
}
</style>
