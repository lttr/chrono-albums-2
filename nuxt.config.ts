export default defineNuxtConfig({
  modules: [
    "@nuxthub/core",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/color-mode",
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
  css: ["~/assets/css/main.css"],
  site: {
    url: "https://chrono-albums.lttr.cz",
    name: "Chrono Albums",
    description: "A web app for chronological photo albums",
    defaultLocale: "cs",
    indexable: false,
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classPrefix: "is-",
    classSuffix: "",
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
    scheduledTasks: {
      // Run maintenance every minute: recover stuck jobs, cleanup old jobs
      "* * * * *": ["jobs:maintenance"],
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
  ogImage: {
    enabled: false,
  },
  plausible: {
    ignoredHostnames: ["localhost"],
    apiHost: "https://plausible.lttr.cz",
  },
})
