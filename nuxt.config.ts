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

  css: ['~/assets/css/main.scss'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "sass:math";', // Aggiungi globalmente se necessario
        },
      },
    },
  },

  plugins:[
    '@/plugins/gsap.js',
  ],

  modules: ["@nuxt/ui", '@nuxtjs/apollo', '@nuxt/fonts', '@nuxt/image', '@vueuse/nuxt', '@nuxt/content'],

  content: {
    // Add your content module options here if needed
    preview:{
      api: 'https://api.nuxt.studio',
      dev:true,
    },
    watch: {
      enabled: true,
      port: 4000,
      showURL: false
    }
  },
  

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
      families: [
        { name: 'Gabarito', provider: 'google', weights: [400, 500,600, 700, 800] },
        { name: 'Jost', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
        { name: 'Instrument Sans', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
        { name: 'Playfair Display', provider: 'google', weights: [400, 700] },
      ]
  },


  compatibilityDate: '2025-03-05',
})