import * as z from "@zod/mini"

const currentYear = new Date().getFullYear()
const firstYear = 1968

export const years = Array.from(
  Array(currentYear - firstYear + 1),
  (_, i) => firstYear + i,
).reverse()

export const months = Array.from(Array(12), (_, i) => i + 1).reverse()

export const categories = [
  "Akce oddílu",
  "Tábory",
  "Svojsíkovy závody",
  "Roveři",
  "Tábořiště",
  "Oddílové hry",
  "Klubovny",
] as const

export type Category = (typeof categories)[number]

// Custom error messages for validation
const errorMessages = {
  id: "ID alba je povinný, a musí být v UUID formátu.",
  title: "Název alba je povinný a délka musí být 3-70 znaků.",
  month: "Měsíc je povinný a musí to být číslo 1-12.",
  year: `Rok je povinný a musí to být číslo od ${firstYear} do aktuálního roku.`,
  category: `Kategorie je povinná a musí být jedna z: ${categories.join(", ")}.`,
}

export const AlbumSearchParamsSchema = z.interface({
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
  category: z.enum([...categories], {
    error: errorMessages.category,
  }),
})

export type AlbumSearchParams = z.infer<typeof AlbumSearchParamsSchema>

export interface AlbumWithMediaInfo {
  id: string
  title: string
  year: number
  month: number
  category: Category
  createdAt: Date
  mediaCount: number
  thumbnailId: string | null
}

export interface AlbumsResponse {
  albums: AlbumWithMediaInfo[]
}
