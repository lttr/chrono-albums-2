import type * as z from "@zod/mini"
import { ProjectInsertSchema } from "~~/database/schema/project"

export type NewProject = z.infer<typeof ProjectFormSchema>

export interface ProjectResponse {
  projects: Project[]
}
