import { recoverStuckJobs, getPendingJobCount } from "../utils/job-queue"

export default defineNitroPlugin(async () => {
  // Give server time to fully initialize
  setTimeout(async () => {
    try {
      // Recover any jobs that were processing when server stopped
      const recovered = await recoverStuckJobs()
      const pending = await getPendingJobCount()

      console.log(
        `[job-queue] Initialized: ${recovered} recovered, ${pending} pending`,
      )

      // Start processing if there are pending jobs
      if (pending > 0) {
        runTask("video:transcode")
      }
    } catch (error) {
      console.error("[job-queue] Failed to initialize:", error)
    }
  }, 2000)
})
