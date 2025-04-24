export default defineNuxtConfig({
  modules: [
    "@lttr/nuxt-config-postcss",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/plausible",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
  ],
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  // Custom styles
  css: ["@lttr/puleo", "~/assets/css/main.css"],
  eslint: {
    config: {
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  site: {
    url: "https://example.com",
    name: "Website name",
    description: "Website description",
    defaultLocale: "en",
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: "2025-04-01",
  // Custom styles
  lttrConfigPostcss: {
    filesWithGlobals: ["./node_modules/@lttr/puleo/output/media.css"],
  },
  plausible: {
    ignoredHostnames: ["localhost"],
    apiHost: "https://plausible.lttr.cz",
  },
})
