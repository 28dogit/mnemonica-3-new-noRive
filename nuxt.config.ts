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

  modules: ["@nuxt/ui", '@nuxtjs/apollo', '@nuxt/fonts', '@nuxt/image', '@vueuse/nuxt'],

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://wp-project.28do.live/graphql',
      }
    },
    // defaultOptions: {
    //   query: {
    //     fetchPolicy: 'no-cache',
    //   },
    // }
  },

  fonts: {
    google: {
      families: {
        'Gabarito': [400, 500,600, 700, 800], // Aggiungi i pesi che vuoi includere
        'Jost': [300, 400, 500, 600, 700, 800],
        'Instrument Sans':[300, 400, 500, 600, 700, 800],
        'Playfair Display': [400, 700],
      }
    }
  },

  compatibilityDate: '2024-07-10',
})
