import gsap from 'gsap';

export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    nuxtApp.provide('gsap', gsap); // Rendo GSAP disponibile come $gsap
  }
});