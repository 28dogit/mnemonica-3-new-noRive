import type { Config } from 'tailwindcss'
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons"
import typography from '@tailwindcss/typography'
// import { _textDecorationColor } from '#tailwind-config/theme'

export default <Partial<Config>>{
  //darkMode: 'class',
    content: [
      "./assets/css/**/*.{css,scss}",
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
    typography,
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Definisco il font Gabarito
        jost: ['Jost', 'sans-serif'],
        instrumentSans:['"Instrument Sans"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      colors:{
        'mne_primary':{
          '50': '#ecfeff',
          '100': '#cff9fe',
          '200': '#a5f1fc',
          '300': '#66e5fa',
          '400': '#11cbee',
          '500': '#05b2d5',
          '600': '#078eb3',
          '700': '#0d7191',
          '800': '#145b76',
          '900': '#164c63',
          '950': '#083144',
        },
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
        'mine-shaft': {
          '50': '#f5f6f6',
          '100': '#e4e9e9',
          '200': '#ccd3d5',
          '300': '#a8b5b8',
          '400': '#7d8e93',
          '500': '#627378',
          '600': '#546066',
          '700': '#485256',
          '800': '#40474a',
          '900': '#393d40',
          '950': '#2d3235',
        }, 
        'woodsmoke': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#151515',
        },
    },
    },
  },
}