<template>
  <div id="mainContainer" class="min-h-screen flex flex-col flex-grow relative">
    <div id="bbg" class="-z-20"></div>

    <div id="ghirlandeContainer" class="w-screen h-screen absolute top-0 left-0 -z-10">
      <div class="ghirlanda-updx l1" data-speed="0.4">
        <NuxtImg src="/assets/img/Ghirlanda-web-up-dx-500.png" densities="x1" alt="" />
      </div>
      <div class="ghirlanda-dwsx l1" data-speed="0.6">
        <NuxtImg src="/assets/img/Ghirlanda-web-dw-sx-500.png" densities="x1" alt="" />
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
import { ScrollTrigger } from "gsap/ScrollTrigger"; // importato qui l'ho importato per tutto il progetto
import { useNuxtApp } from "#app"; //import gsap from plugins gsap.js

//gsap.registerPlugin(ScrollTrigger); la registrazione avviene grazie al plugin gsap.js

// Aggiunge animazione quando il componente viene montato
onMounted(() => {
  const { $gsap } = useNuxtApp();
  // console.log("gsap-- ", $gsap, "scrollTrigger----- ", ScrollTrigger);
  $gsap.to("[data-speed]", {
    y: (i, el) =>
      (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0,
      force3D: true,
    },
  });
});
//Gsap-fine
</script>

<style></style>
