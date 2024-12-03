<template>
  <div id="mainContainer" class="min-h-screen flex flex-col flex-grow relative">
    <div id="bbg" class="-z-20"></div>

    <div id="ghirlandeContainer" class="w-screen h-screen absolute top-0 left-0 -z-10">
      <div class="ghirlanda-updx l1" data-speed="0.4">
        <NuxtImg src="/assets/img/Ghirlanda-web-up-dx.png" densities="x1" alt="" />
      </div>
      <div class="ghirlanda-dwsx l1" data-speed="0.6">
        <NuxtImg src="/assets/img/Ghirlanda-web-dw-sx.png" densities="x1" alt="" />
      </div>
    </div>

    <Header />
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script setup>
//Utilizzo di Gsap!!-----
import { onMounted } from "vue";
import { gsap } from "gsap"; //importa gsap
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Aggiunge animazione quando il componente viene montato
onMounted(() => {
  gsap.to("[data-speed]", {
    y: (i, el) =>
      (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0,
    },
  });
});
//Gsap-fine
</script>

<style></style>
