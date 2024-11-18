<template>
  <div id="mainContainer" class="min-h-screen flex flex-col flex-grow relative">
    <div class="bbg"></div>

    <div class="ghirlanda-updx l1" data-speed="0.25">
      <img src="/assets/img/Ghirlanda-web-up-dx.png" alt="" />
    </div>
    <div class="ghirlanda-updx l2" data-speed="0.35">
      <img src="/assets/img/Ghirlanda-web-up-dx.png" alt="" />
    </div>
    <div class="ghirlanda-dwsx l1" data-speed="0.4">
      <img src="/assets/img/Ghirlanda-web-dw-sx.png" alt="" />
    </div>
    <!-- <div class="ghirlanda-updx test1">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div>
      <div class="ghirlanda-updx test2">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div> -->

    <Header />
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script setup>
//Utilizzo di Gsap!!-----
gsap.registerPlugin(ScrollTrigger);

import { onMounted } from "vue";
import { gsap } from "gsap"; //importa gsap
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      // trigger: "#mainContainer",
      // start: "top+=150px top+=135px",
      // end: "top+=150px top+=130px",
      // toggleActions: "play none reverse none",
      // markers: false,
      //pin: true,
      // scrub: true, //animazione durante lo scroll
    },
    boxShadow: "0px 12px 18px -6px rgba(0, 0, 0, 0.3)",
    duration: 0.5,
  });
});
//Gsap-fine
</script>

<style></style>
