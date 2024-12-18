import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) { // Uso import.meta.client invece di process.client
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Observer);
    nuxtApp.provide('gsap', gsap);
  }
});

//da rivedere perchè sembra che la registrazione di scrollTrigger da questo plugin non funzioni
//funziona globalmente nel sito solo perchè nel layout globale lo carico manualmente
// il problema è solo nell'import di scrollTrigger, perchè la registrazione invece funziona tramite questo plugin
// controllare questo aspetto!!