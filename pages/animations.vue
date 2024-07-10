<template>
  <div>
    <h1>Animations Page</h1>
    <svg viewBox="0 0 200 200" width="300" height="300">
      <circle
        v-for="(circle, index) in circles"
        :key="index"
        class="circle"
        cx="50"
        cy="50"
        :r="circle.radius"
        fill="none"
        :stroke="circle.color"
        stroke-width="1"
      />
    </svg>
  </div>
  <div class="scroll-container">
    <div class="animation-container">
      <svg viewBox="0 0 100 100">
        <circle
          v-for="(circle, index) in circles"
          :key="index"
          class="c1rcle"
          cx="50"
          cy="50"
          :r="circle.radius"
          fill="none"
          :stroke="circle.color"
          stroke-width="2"
        />
      </svg>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const circles = ref([
  { radius: 20, color: "#ff6b6b" },
  { radius: 25, color: "#feca57" },
  { radius: 30, color: "#48dbfb" },
  { radius: 35, color: "#ff9ff3" },
]);
onMounted(() => {
  gsap.to(".circle", {
    duration: 4,
    rotation: 360,
    scale: 0.5,
    opacity: 0,
    //transformOrigin: "50% 50%",
    ease: "power1.inOut",
    stagger: {
      each: 0.3,
      repeat: -1,
      yoyo: true,
    },
  });

  const circleElements = document.querySelectorAll(".c1rcle");
  circleElements.forEach((circle, index) => {
    gsap.from(circle, {
      scrollTrigger: {
        trigger: ".circle",
        pin: true,
        // start: "top top+=150",
        // end: "bottom top+=50",
        start: `top+=${index * 30} top+=150`,
        end: `top+=${(index + 1) * 30} top+=150`,
        scrub: 3,
        markers: true, // Rimuovi questa riga in produzione
      },
      rotation: 360,
      scale: 0,
      opacity: 0,
      transformOrigin: "50% 50%",
      ease: "power1.inOut",
      duration: 2,
      //delay: index * 0.5,
      // stagger: {
      //   each: 0.5,
      //   from: "start",
      // },
    });
  });
});
</script>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow-y: scroll;
}
.animation-container {
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.c1rcle {
  opacity: 0.5;
}
svg {
  width: 300px;
  height: 300px;
}
</style>
