const baseURL = process.env.NUXT_APP_BASE_URL ?? '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-16',
  devtools: { enabled: false },
  ssr: false,
  css: ['~/assets/css/main.css'],
  app: {
    baseURL,
    buildAssetsDir: '/_nuxt/',
  },
  build: {
    transpile: ['@pso/shared'],
  },
  nitro: {
    prerender: {
      routes: ['/'],
      failOnError: false,
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
