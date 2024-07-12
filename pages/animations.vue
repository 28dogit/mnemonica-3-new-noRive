<template>
  <div class="h-[300vh]">
    <h1>Animations Page</h1>
    <div class="dots">
      <div class="dot a"></div>
      <div class="dot b"></div>
      <div class="dot c"></div>
      <div class="dot d"></div>
    </div>
    <div class="C_Container flex justify-center items-center">
      <svg
        width="191"
        height="94"
        viewBox="0 0 191 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g mask="url(#theMask5)">
          <path
            d="M0 0 44 49 117 49"
            stroke="#9898A0"
            stroke-dasharray="2 4"
            stroke-linecap="round"
          ></path>
        </g>
      </svg>
      <svg
        width="191"
        height="94"
        viewBox="0 0 191 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g mask="url(#theMask6)">
          <path
            d="M0 0 53-25 102-25"
            stroke="#9898A0"
            stroke-dasharray="2 4"
            stroke-linecap="round"
          ></path>
        </g>
      </svg>
      <svg viewBox="0 0 100 100" width="300" height="300">
        <circle
          v-for="(circle, index) in circles"
          :key="index"
          class="circle"
          cx="50"
          cy="50"
          :r="circle.radius"
          :fill="circle.fill"
          :stroke="circle.color"
          :stroke-width="circle.strokeWidth"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { _strokeWidth } from "#tailwind-config/theme";

gsap.registerPlugin(ScrollTrigger);
const circles = ref([
  { radius: 15, color: "#ff6b6b", fill: "#ff6b6b", strokeWidth: 2 },
  { radius: 20, color: "#ff6b6b", fill: "none", strokeWidth: 2 },
  { radius: 25, color: "#feca57", fill: "none", strokeWidth: 2 },
  { radius: 30, color: "#48dbfb", fill: "none", strokeWidth: 2 },
  { radius: 35, color: "#ff9ff3", fill: "none", strokeWidth: 2 },
]);

onMounted(() => {
  gsap.to(".dot", {
    scale: 1,
    duration: 3,
    x: 0,
    y: function (index, target, targets) {
      return `${4 * index - 6}rem`;
    },
    scrollTrigger: {
      trigger: ".dots",
      start: "center top+=350",
      end: "center+=350 top+=350",
      scrub: 1,
      pin: ".dots",
      markers: true,
    },
  });

  gsap.from(".circle", {
    opacity: 0,
    scale: 1.3,
    duration: 3,
    transformOrigin: "50% 50%",
    scrollTrigger: {
      trigger: ".C_Container",
      start: "center top+=350",
      end: "center+=350 top+=350",
      scrub: 3,
      pin: ".C_Container",
      markers: true,
    },
    stagger: {
      each: 0.5,
      from: "start",
    },
  });
});
</script>

<style scoped>
.dots {
  position: absolute;
  top: 50vh;
  left: 50%;
  margin-left: -400px;
}
.dot {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: red;
  position: absolute;
  top: -1.5rem;
  left: -1.5rem;
}
.a {
  transform: translate(-4rem, -4rem);
}

.b {
  transform: translate(4rem, -4rem);
}

.c {
  transform: translate(4rem, 4rem);
}

.d {
  transform: translate(-4rem, 4rem);
}
</style>
