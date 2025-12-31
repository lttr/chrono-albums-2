export interface FormatDateOptions {
  locale?: string
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"]
}

const defaults: Required<FormatDateOptions> = {
  locale: "cs",
  dateStyle: "medium",
}

export function formatDate(
  date: Date | string | number,
  options?: FormatDateOptions,
): string {
  const { locale, dateStyle } = { ...defaults, ...options }
  const d = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat(locale, { dateStyle }).format(d)
}

export function formatMonthYear(
  month: number | null,
  year: number,
  locale = "cs",
): string {
  if (month) {
    const date = new Date(year, month - 1)
    const formatted = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(date)
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }
  return String(year)
}
