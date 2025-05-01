import * as z from "@zod/mini"

/**
 * Example error from z.prettifyError:
 *   ✖ Tento typ videa není podporován.
 *   → at type
 */
export function formatError(error: z.z.core.$ZodError): string {
  return error ? z.prettifyError(error).replaceAll(/ → .*/g, "") : ""
}
