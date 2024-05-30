<template>
  <div class="max-w-[1700px] m-auto px-16">
    <!-- <div class="box w-8 h-8 rounded bg-lime-600"></div> -->
    <!-- <ContentDoc class="sm:text-orange-500 md:text-slate-600 lg:text-lime-500" /> -->
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1 class="text-seagull-400 dark:text-orange-400">{{ doc.title }}</h1>
        <p class="dark:text-orange-600">{{ doc.description }}</p>
        <ContentRenderer :value="doc" class="dark:text-orange-600" />
      </article>
    </ContentDoc>
  </div>
</template>

<script setup>
//Utilizzo di Gsap
// import { onMounted } from "vue";
// import { gsap } from "gsap";

// onMounted(() => {
//   gsap.to(".box", {
//     duration: 3,
//     rotation: 360,
//     scale: 2,
//     repeat: -1,
//     yoyo: true,
//   });
// });
//fine - Utilizzo di Gsap
</script>

<style></style>
