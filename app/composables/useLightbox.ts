import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/style.css"

interface LightboxMedia {
  fullUrl: string
  thumbnailUrl: string
  width: number | null
  height: number | null
}

export function useLightbox(media: Ref<LightboxMedia[]>) {
  const lightbox = ref<PhotoSwipeLightbox | null>(null)
  const triggerElement = ref<HTMLElement | null>(null)

  const dataSource = computed(() =>
    media.value.map((item) => ({
      src: item.fullUrl,
      msrc: item.thumbnailUrl,
      width: item.width ?? 1600,
      height: item.height ?? 1200,
    })),
  )

  onMounted(() => {
    lightbox.value = new PhotoSwipeLightbox({
      dataSource: dataSource.value,
      pswpModule: () => import("photoswipe"),
      // Preload adjacent slides
      preload: [1, 2],
      // Close on vertical drag
      closeOnVerticalDrag: true,
      // Keyboard bindings (arrows, escape) enabled by default
    })

    // Restore focus after lightbox closes
    lightbox.value.on("close", () => {
      setTimeout(() => {
        triggerElement.value?.focus()
        triggerElement.value = null
      }, 50)
    })

    lightbox.value.init()
  })

  // Update data source when media changes
  watch(dataSource, (newSource) => {
    if (lightbox.value) {
      lightbox.value.options.dataSource = newSource
    }
  })

  const open = (index: number, trigger?: HTMLElement) => {
    triggerElement.value = trigger ?? (document.activeElement as HTMLElement)
    lightbox.value?.loadAndOpen(index)
  }

  onUnmounted(() => {
    lightbox.value?.destroy()
    lightbox.value = null
  })

  return { open }
}
