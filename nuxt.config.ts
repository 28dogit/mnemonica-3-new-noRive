// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/mne/', // Assicurati che il percorso sia seguito da una barra finale
    // layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins:[
    '@/plugins/gsap.js',
  ],
  modules: ["@nuxt/ui", '@nuxt/content']
})
