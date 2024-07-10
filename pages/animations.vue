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
        stroke-width="5"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const circles = ref([
  { radius: 45, color: "#ff6b6b" },
  { radius: 35, color: "#feca57" },
  { radius: 25, color: "#48dbfb" },
  { radius: 15, color: "#ff9ff3" },
]);
onMounted(() => {
  gsap.to(".circle", {
    duration: 4,
    //rotation: 360,
    scale: 0.5,
    opacity: 0,
    transformOrigin: "50% 50%",
    ease: "power1.inOut",
    stagger: {
      each: 0.3,
      repeat: -1,
      yoyo: true,
    },
  });
});
</script>

<style scoped>
/* Your page styles go here */
</style>
