export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/plausible",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@lttr/nuxt-puleo",
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
  routeRules: {
    "/p/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
    "/c/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
    "/a/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
    "/m/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    typedPages: true,
    typescriptPlugin: true,
  },
  compatibilityDate: "2025-12-01",
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
