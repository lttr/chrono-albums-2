import { readdirSync, unlinkSync } from "fs"
import { join } from "path"

const VIDEO_TEMP_DIR = ".data/temp/videos"

export default defineNitroPlugin(() => {
  try {
    const files = readdirSync(VIDEO_TEMP_DIR)
    for (const file of files) {
      const filePath = join(VIDEO_TEMP_DIR, file)
      unlinkSync(filePath)
      console.log(`[video-cleanup] Removed orphaned temp file: ${file}`)
    }
    if (files.length > 0) {
      console.log(`[video-cleanup] Cleaned ${files.length} orphaned temp files`)
    }
  } catch {
    // Directory doesn't exist yet, that's fine
  }
})
