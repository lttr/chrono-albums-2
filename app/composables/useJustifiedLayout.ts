// @ts-expect-error justified-layout has no type declarations
import justifiedLayout from "justified-layout"

interface Box {
  aspectRatio: number
  top: number
  width: number
  height: number
  left: number
}

interface JustifiedLayoutResult {
  containerHeight: number
  widowCount: number
  boxes: Box[]
}

interface MediaItem {
  id: string
  width: number | null
  height: number | null
}

interface JustifiedOptions {
  targetRowHeight?: number
  targetRowHeightMobile?: number
  boxSpacing?: number
  containerPadding?: number
  mobileBreakpoint?: number
}

export function useJustifiedLayout(
  items: Ref<MediaItem[]>,
  containerRef: Ref<HTMLElement | null>,
  options: JustifiedOptions = {},
) {
  const {
    targetRowHeight = 280,
    targetRowHeightMobile = 240,
    boxSpacing = 4,
    containerPadding = 0,
    mobileBreakpoint = 640,
  } = options

  const layout = ref<JustifiedLayoutResult | null>(null)
  const containerWidth = ref(0)

  const aspectRatios = computed(() =>
    items.value.map((item) => {
      const w = item.width ?? 4
      const h = item.height ?? 3
      return w / h
    }),
  )

  const calculate = () => {
    if (!containerRef.value) {
      return
    }
    containerWidth.value = containerRef.value.offsetWidth

    const rowHeight =
      containerWidth.value < mobileBreakpoint
        ? targetRowHeightMobile
        : targetRowHeight

    layout.value = justifiedLayout(aspectRatios.value, {
      containerWidth: containerWidth.value,
      targetRowHeight: rowHeight,
      boxSpacing,
      containerPadding,
    })
  }

  // Recalculate on resize
  useResizeObserver(containerRef, calculate)

  // Recalculate when items change
  watch(items, calculate)

  // Calculate after mount when container has real width
  onMounted(() => {
    nextTick(calculate)
  })

  return {
    layout,
    containerWidth,
    boxes: computed(() => layout.value?.boxes ?? []),
    containerHeight: computed(() => layout.value?.containerHeight ?? 0),
  }
}
