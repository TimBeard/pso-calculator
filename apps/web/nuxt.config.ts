export default defineNuxtConfig({
  compatibilityDate: '2026-04-16',
  devtools: { enabled: false },
  ssr: false,
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBasePath: process.env.NUXT_PUBLIC_API_BASE_PATH ?? 'http://localhost:4000/api',
    },
  },
  build: {
    transpile: ['@pso/shared'],
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
