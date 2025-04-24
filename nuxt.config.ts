// https://nuxt.com/docs/api/configuration/nuxt-config

// Auto-import all SCSS files in assets/css
import { resolve } from "node:path";
import { readdirSync } from "node:fs";
const cssDir = resolve(__dirname, "assets/css");
const scssFiles = readdirSync(cssDir)
  .filter((file) => file.endsWith(".scss") && !file.startsWith("_")) // Exclude partials
  .map((file) => `~/assets/css/${file}`);
// fine importazione css
export default defineNuxtConfig({
  app: {
    baseURL: "/mne",
    // layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  robots: { robotsTxt: false },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: [
    "~/assets/css/tailwindcss.css", // Importa Tailwind per primo!
    ...scssFiles, // Poi tutti gli SCSS
  ],
  //css: scssFiles, // Include all SCSS files in the assets/css directory invecec di dichiararli uno per volta
  // css: [
  //   '~/assets/css/main.scss',
  //   '~/assets/css/nav.scss'
  // ],

  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: '@use "sass:math";', // Aggiungere globalmente se necessario
        },
      },
    },
  },

  plugins: ["@/plugins/gsap.js"],

  modules: [
    "@nuxt/ui",
    "@nuxtjs/apollo",
    "@nuxt/fonts",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "@nuxt/content",
    "@pinia/nuxt",
  ],

  content: {
    preview: {
      api: "https://api.nuxt.studio",
      dev: true,
    },
    watch: {
      enabled: true,
      port: 4000,
      showURL: false,
    },
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://wp-project.28do.live/graphql",
      },
    },
    // defaultOptions: {
    //   query: {
    //     fetchPolicy: 'no-cache',
    //   },
    // }
  },

  fonts: {
    families: [
      { name: "Gabarito", provider: "google", weights: [400, 500, 600, 700, 800] },
      { name: "Jost", provider: "google", weights: [300, 400, 500, 600, 700, 800] },
      { name: "Instrument Sans", provider: "google", weights: [300, 400, 500, 600, 700, 800] },
      { name: "Playfair Display", provider: "google", weights: [400, 700] },
    ],
  },

  compatibilityDate: "2025-03-05",
});
