import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/style.css"

interface LightboxMedia {
  fullUrl: string
  thumbnailUrl: string
  width: number | null
  height: number | null
  kind: "image" | "video"
  posterUrl?: string
  processing?: boolean
}

interface SlideContent {
  data: {
    src: string
    msrc: string
    type: string
    posterUrl?: string
  }
  state: string
  element: HTMLElement | null
  videoElement?: HTMLVideoElement | null
  slide?: {
    container: HTMLElement
  }
  onLoaded: () => void
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
      // Custom properties for video handling
      type: item.kind === "video" ? "video" : "image",
      posterUrl: item.posterUrl,
      processing: item.processing,
    })),
  )

  onMounted(() => {
    lightbox.value = new PhotoSwipeLightbox({
      dataSource: dataSource.value,
      pswpModule: () => import("photoswipe"),
      preload: [1, 2],
      closeOnVerticalDrag: true,
    })

    // Handle video content loading
    lightbox.value.on("contentLoad", (e) => {
      const content = e.content as SlideContent
      if (content.data.type !== "video") {
        return
      }

      e.preventDefault()

      // Create video element
      const video = document.createElement("video")
      video.className = "pswp__video"
      video.src = content.data.src
      video.poster = content.data.posterUrl || content.data.msrc
      video.controls = true
      video.playsInline = true
      video.preload = "metadata"

      content.videoElement = video
      content.element = video

      // Mark as loaded immediately (video will buffer on play)
      content.state = "loaded"
      content.onLoaded()
    })

    // Custom append for video
    lightbox.value.on("contentAppend", (e) => {
      const content = e.content as SlideContent
      if (content.videoElement && !content.videoElement.parentNode) {
        e.preventDefault()
        content.slide?.container.appendChild(content.videoElement)
      }
    })

    // Custom remove for video
    lightbox.value.on("contentRemove", (e) => {
      const content = e.content as SlideContent
      if (content.videoElement) {
        e.preventDefault()
        content.videoElement.pause()
        content.videoElement.remove()
        content.videoElement = null
      }
    })

    // Pause videos when changing slides
    lightbox.value.on("change", () => {
      const pswp = lightbox.value?.pswp
      if (!pswp) {
        return
      }

      // Pause all videos except current
      pswp.mainScroll.itemHolders.forEach(
        (holder: { slide?: { container: HTMLElement } }) => {
          if (holder.slide && holder.slide !== pswp.currSlide) {
            const video = holder.slide.container.querySelector("video")
            if (video) {
              video.pause()
            }
          }
        },
      )

      // Autoplay current video (if it's a video slide)
      const currVideo = pswp.currSlide?.container.querySelector("video")
      if (currVideo) {
        currVideo.play().catch(() => {
          // Autoplay blocked - user will click play
        })
      }
    })

    // Pause all videos on close
    lightbox.value.on("close", () => {
      const pswp = lightbox.value?.pswp
      if (!pswp) {
        return
      }

      pswp.mainScroll.itemHolders.forEach(
        (holder: { slide?: { container: HTMLElement } }) => {
          const video = holder.slide?.container.querySelector("video")
          if (video) {
            video.pause()
          }
        },
      )
    })

    // Restore focus after lightbox closes
    lightbox.value.on("destroy", () => {
      setTimeout(() => {
        triggerElement.value?.focus()
        triggerElement.value = null
      }, 50)
    })

    // Register download button
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(lightbox.value as any).on("uiRegisterElement", (e: any) => {
      e.uiElement.registerElement({
        name: "download-button",
        order: 8,
        isButton: true,
        tagName: "a",
        html: {
          isCustomSVG: true,
          inner:
            '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
          outlineID: "pswp__icn-download",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInit: (el: HTMLAnchorElement, pswp: any) => {
          el.setAttribute("download", "")
          el.setAttribute("target", "_blank")
          el.setAttribute("rel", "noopener")
          el.setAttribute("title", "Download")

          pswp.on("change", () => {
            el.href = pswp.currSlide?.data.src || ""
          })
        },
      })
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
    // Don't open lightbox for processing videos
    const item = media.value[index]
    if (item?.kind === "video" && item.processing) {
      return
    }

    triggerElement.value = trigger ?? (document.activeElement as HTMLElement)
    lightbox.value?.loadAndOpen(index)
  }

  onUnmounted(() => {
    lightbox.value?.destroy()
    lightbox.value = null
  })

  return { open }
}
