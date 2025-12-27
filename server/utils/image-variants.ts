import sharp from "sharp"

export interface ImageVariants {
  original: Buffer // 3500px max, JPEG 92
  full: Buffer // 2000px, progressive JPEG (mozjpeg)
  thumbnail: Buffer // 600px, WebP
  lqip: string // 20px, base64 data URI
}

export interface VariantMetadata {
  width: number
  height: number
}

export interface GenerateVariantsResult {
  variants: ImageVariants
  metadata: VariantMetadata
}

export async function generateVariants(
  input: Buffer,
): Promise<GenerateVariantsResult> {
  // Create a shared sharp instance for efficiency
  const image = sharp(input)

  // Get original metadata first
  const originalMeta = await image.metadata()

  // Generate all variants in parallel
  const [original, full, thumbnail, lqipBuffer] = await Promise.all([
    // Original: 3500px max, JPEG quality 92, preserve EXIF
    sharp(input)
      .resize(3500, 3500, { fit: "inside", withoutEnlargement: true })
      .rotate() // Auto-rotate based on EXIF orientation
      .withMetadata() // Preserve EXIF data
      .jpeg({ quality: 92 })
      .toBuffer(),

    // Full: 2000px, progressive JPEG with mozjpeg
    sharp(input)
      .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
      .rotate()
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toBuffer(),

    // Thumbnail: 600px, WebP
    sharp(input)
      .resize(600, 600, { fit: "inside", withoutEnlargement: true })
      .rotate()
      .webp({ quality: 75 })
      .toBuffer(),

    // LQIP: 20px, JPEG quality 60
    sharp(input).resize(20).rotate().jpeg({ quality: 60 }).toBuffer(),
  ])

  // Get final dimensions from the original variant
  const originalVariantMeta = await sharp(original).metadata()

  const lqip = `data:image/jpeg;base64,${lqipBuffer.toString("base64")}`

  return {
    variants: {
      original,
      full,
      thumbnail,
      lqip,
    },
    metadata: {
      width: originalVariantMeta.width ?? originalMeta.width ?? 0,
      height: originalVariantMeta.height ?? originalMeta.height ?? 0,
    },
  }
}
