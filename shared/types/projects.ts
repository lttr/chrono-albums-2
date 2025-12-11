import type { Project } from "~~/server/database/schema"

export interface ProjectResponse {
  projects: Project[]
}
