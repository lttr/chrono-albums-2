/**
 * Generate a URL-safe slug using crypto.randomUUID without dashes
 * 32 characters, 122 bits of entropy
 */
export function generateSlug(): string {
  return crypto.randomUUID().replace(/-/g, "")
}
