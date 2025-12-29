import {
  recoverStuckJobs,
  cleanupOldJobs,
  cleanupFailedJobBlobs,
  getPendingJobCount,
} from "../../utils/job-queue"
import { cleanupOrphanedTempFiles } from "../../utils/video-transcoder"

export default defineTask({
  meta: {
    name: "jobs:maintenance",
    description:
      "Recover stuck jobs, cleanup old jobs, temp files, and failed blobs",
  },
  async run() {
    const recovered = await recoverStuckJobs()
    const cleaned = await cleanupOldJobs()
    const blobsCleaned = await cleanupFailedJobBlobs()
    const tempFilesCleaned = await cleanupOrphanedTempFiles()
    const pending = await getPendingJobCount()

    // If we recovered jobs, trigger processing
    if (recovered > 0) {
      runTask("video:transcode")
    }

    return {
      result: "maintenance complete",
      recovered,
      cleaned,
      blobsCleaned,
      tempFilesCleaned,
      pending,
    }
  },
})
