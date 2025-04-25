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
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        class: "is-light",
      },
    },
  },
  // Custom styles
  css: ["@lttr/puleo", "~/assets/css/main.css"],
  site: {
    url: "https://example.com",
    name: "Website name",
    description: "Website description",
    defaultLocale: "en",
    indexable: false,
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: "2025-04-01",
  nitro: {
    storage: {
      uploads: {
        driver: "fs",
        base: "./user-data/uploads",
      },
    },
  },
  eslint: {
    config: {
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  // Custom styles
  lttrConfigPostcss: {
    filesWithGlobals: ["./node_modules/@lttr/puleo/output/media.css"],
  },
  plausible: {
    ignoredHostnames: ["localhost"],
    apiHost: "https://plausible.lttr.cz",
  },
})
