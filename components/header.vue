<template>
  <div class="headerWrap flex gap-3 bg-slate-500 p-10">
    <Nav />
    <div class="gbox w-4 h-4 bg-red-600"></div>
  </div>
</template>

<script lang="ts" setup>
//Utilizzo di Gsap
import { onMounted } from "vue";
import { gsap } from "gsap";

onMounted(() => {
  gsap.to(".gbox", {
    duration: 1,
    y: -20,
    repeat: -1,
    yoyo: true,
  });
});
//fine - Utilizzo di Gsap
</script>

<style></style>
