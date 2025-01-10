<template>
  <section class="sectionN hero">
    <h1>Hero Section</h1>
  </section>
</template>

<script setup>
// import { onMounted } from "vue";
// import { gsap } from "gsap";

// onMounted(() => {
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".hero",
//       start: "top top",
//       end: "+=20000 bottom",
//       scrub: true,
//       markers: true,
//       onLeave: () => {
//         // Nasconde Hero quando si lascia la sezione
//         gsap.to(".hero", { opacity: 0, duration: 0.5 });
//       },
//     },
//   });

//   tl.fromTo(
//     ".hero h1",
//     { opacity: 0, y: -50 },
//     { opacity: 1, y: 0, duration: 1 }
//   ).to(".hero h1", { rotate: 360, duration: 2 });
// });
</script>

<style scoped lang="scss">
.hero {
  background-color: #ff7675;
}
</style>
