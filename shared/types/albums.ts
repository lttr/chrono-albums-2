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

export const AlbumSearchParamsSchema = z.interface({
  id: z.uuid("ID alba je povinný, a musí být v UUID formátu"),
  title: z
    .string("Název alba je povinný a délka musí být 3-70 znaků")
    .check(z.minLength(3), z.maxLength(70)),
  month: z.coerce
    .number("Měsíc je povinný a musí to být číslo 1-12")
    .check(z.int(), z.gte(1), z.lte(12)),
  year: z.coerce
    .number("Rok je povinný a musí to být číslo od 1968 do aktuálního roku")
    .check(z.int(), z.gte(firstYear), z.lte(currentYear)),
  category: z.enum([...categories], {
    error: "Kategorie je povinná a musí být jedna z: " + categories.join(", "),
  }),
})

export type AlbumSearchParams = z.infer<typeof AlbumSearchParamsSchema>
