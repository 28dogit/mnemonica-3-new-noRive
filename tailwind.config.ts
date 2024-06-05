import type { Config } from 'tailwindcss'
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons"

export default <Partial<Config>>{
  darkMode: 'class',
    content: [
      // "./assets/css/**/*.{css,scss}",
      "./components/**/*.{vue,js}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
    // Aggiungi altri percorsi se necessario
  ],
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(["mdi", "lucide"]),
      // If you want to use all icons collections: getIconCollections("all"),
    }),
  ],
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      colors:{
        'seagull': {
            '50': '#f1fafe',
            '100': '#e3f3fb',
            '200': '#c0e8f7',
            '300': '#88d7f1',
            '400': '#5dc9ea',
            '500': '#21abd6',
            '600': '#138bb6',
            '700': '#116f93',
            '800': '#125e7a',
            '900': '#144e66',
            '950': '#0e3243',
        },
        'chenin': {
          '50': '#fcfaee',
          '100': '#f6f0cf',
          '200': '#ece19b',
          '300': '#e6d379',
          '400': '#dcba43',
          '500': '#d39f2d',
          '600': '#ba7e25',
          '700': '#9b5d22',
          '800': '#7f4b21',
          '900': '#693d1e',
          '950': '#3b200d',
      },  
    }
    }
  }
}