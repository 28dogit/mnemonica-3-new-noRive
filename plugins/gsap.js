import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) { // Uso import.meta.client invece di process.client
    gsap.registerPlugin(ScrollTrigger);
    nuxtApp.provide('gsap', gsap);
  }
});