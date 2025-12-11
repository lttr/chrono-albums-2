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
