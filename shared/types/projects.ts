import type { Project } from "~~/server/db/schema"

export interface ProjectResponse {
  projects: Project[]
}
