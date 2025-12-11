import * as z from "zod"

const currentYear = new Date().getFullYear()
const firstYear = 1968

export const years = Array.from(
  Array(currentYear - firstYear + 1),
  (_, i) => firstYear + i,
).reverse()

export const months = Array.from(Array(12), (_, i) => i + 1)

// Legacy categories for form placeholders (will be fetched from DB)
export const categories = [
  "Akce oddílu",
  "Tábory",
  "Svojsíkovy závody",
  "Roveři",
  "Tábořiště",
  "Oddílové hry",
  "Klubovny",
] as const

// Custom error messages for validation
const errorMessages = {
  id: "ID alba je povinný, a musí být v UUID formátu.",
  title: "Název alba je povinný a délka musí být 3-70 znaků.",
  month: "Měsíc je povinný a musí to být číslo 1-12.",
  year: `Rok je povinný a musí to být číslo od ${firstYear} do aktuálního roku.`,
  category: "ID kategorie je povinný, a musí být v UUID formátu.",
  project: "ID projektu je povinný, a musí být v UUID formátu.",
}

export const AlbumSearchParamsSchema = z.object({
  id: z.uuid(errorMessages.id),
  title: z
    .string(errorMessages.title)
    .check(
      z.minLength(3, errorMessages.title),
      z.maxLength(70, errorMessages.title),
    ),
  month: z.coerce
    .number(errorMessages.month)
    .check(
      z.int(errorMessages.month),
      z.gte(1, errorMessages.month),
      z.lte(12, errorMessages.month),
    ),
  year: z.coerce
    .number(errorMessages.year)
    .check(
      z.int(errorMessages.year),
      z.lte(currentYear, errorMessages.year),
      z.gte(firstYear, errorMessages.year),
    ),
  categoryId: z.uuid(errorMessages.category),
  projectId: z.uuid(errorMessages.project),
})

export type AlbumSearchParams = z.infer<typeof AlbumSearchParamsSchema>
