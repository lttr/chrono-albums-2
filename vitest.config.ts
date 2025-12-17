import { defineVitestConfig } from "@nuxt/test-utils/config"

export default defineVitestConfig({
  test: {
    environment: "nuxt",
  },
  // Workaround: @nuxt/test-utils "nuxt" environment uses deprecated Vitest 3
  // API (transformMode) and doesn't set import.meta.test properly in Vitest 4.
  // This enables the test fallback in @nuxtjs/color-mode plugin.client.js.
  // Remove once @nuxt/test-utils is updated for Vitest 4.
  define: {
    "import.meta.test": true,
  },
})
