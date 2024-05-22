<template>
  <div class="sm:text-orange-500 md:text-slate-600 lg:text-lime-500">
    <p>Home</p>
    <div class="box w-8 h-8 rounded bg-lime-600"></div>
  </div>
</template>

<script setup>
//Utilizzo di Gsap
import { onMounted } from "vue";
import { gsap } from "gsap";

onMounted(() => {
  gsap.to(".box", {
    duration: 3,
    rotation: 360,
    scale: 2,
    repeat: -1,
    yoyo: true,
  });
});
//fine - Utilizzo di Gsap
</script>

<style></style>
