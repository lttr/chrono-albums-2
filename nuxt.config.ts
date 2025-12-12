export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@lttr/nuxt-config-postcss",
    "@lttr/nuxt-puleo",
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
  // app: {
  //   head: {
  //     htmlAttrs: {
  //       class: "is-light",
  //     },
  //   },
  // },
  // Custom styles
  css: ["~/assets/css/main.css"],
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
    experimental: {
      tasks: true,
    },
  },
  hub: {
    db: "sqlite",
    blob: true,
  },
  eslint: {
    config: {
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  plausible: {
    ignoredHostnames: ["localhost"],
    apiHost: "https://plausible.lttr.cz",
  },
})
