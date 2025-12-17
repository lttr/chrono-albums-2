export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      secret: "",
      google: {
        clientId: "",
        clientSecret: "",
      },
    },
    public: {
      authUrl: "",
      mockAuth: "",
    },
  },
})
