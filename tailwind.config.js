/** @type {import('tailwindcss').Config} */
export default {
darkMode: 'class',
content: [
    "./assetes/css/**/*.{css,scss}",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  // Aggiungi altri percorsi se necessario
],
extend:{
    colors:{
        mne_base:'#5DC9EA',
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
    }
}
}