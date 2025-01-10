<template>
  <div id="app">
    <HeroNS />
    <ModulesNS />
    <PhasesNS />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const sections = document.querySelectorAll(".sectionN");
  //   console.log(sections.length);
  //   console.log("fine dello scroll", `+=${100 * sections.length}vh`);

  // Animazione per spostare le sezioni con scroll
  //   ScrollTrigger.defaults({
  //     scroller: "body", // Specifica che lo scroll è sul body
  //   });
  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top", // Inizio quando la sezione raggiunge la cima
      end: `+=${100 * sections.length}vh`, // Fine quando la sezione è fuori dalla viewport
      pin: true, // Pin della sezione corrente
      scrub: 1, // Scroll graduale
      markers: true, // Debug per controllo
      onEnter: () => {
        sections.forEach((el) => el.classList.remove("active"));
        section.classList.add("active");
      },
    });
  });
  //   gsap.to(sections, {
  //     yPercent: -100 * (sections.length - 1),
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: "#app",
  //       start: "top top",
  //       end: `+=${100 * sections.length}vh`,
  //       scrub: 1,
  //       pin: true,
  //       //markers: true,
  //       onUpdate: (self) => {
  //         const progress = self.progress * (sections.length - 1); // Calcola quale sezione è attiva
  //         console.log("progeress", progress);
  //         sections.forEach((section, index) => {
  //           if (Math.round(progress) === index) {
  //             section.classList.add("active");
  //           } else {
  //             section.classList.remove("active");
  //           }
  //         });
  //       },
  //     },
  //   });

  // Imposta la Hero come visibile inizialmente
  const hero = document.querySelector(".hero");
  if (hero) hero.classList.add("active");
});
</script>

<style lang="scss">
#app {
  height: 400vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.sectionN {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease, z-index 0.5s ease;
  opacity: 0;

  &.active {
    opacity: 1;
  }
}
</style>
