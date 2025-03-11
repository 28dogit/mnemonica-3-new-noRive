<template>
  <section class="sectionN modules">
    <h1>Modules Section</h1>
  </section>
</template>

<script setup>
// import { onMounted } from "vue";
// import { gsap } from "gsap";

// onMounted(() => {
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".modules",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//       onEnter: () => {
//         // Mostra Modules quando si entra
//         gsap.to(".modules", { opacity: 1, duration: 0.5 });
//       },
//       onLeave: () => {
//         // Nasconde Modules quando si lascia
//         gsap.to(".modules", { opacity: 0, duration: 0.5 });
//       },
//     },
//   });

//   tl.fromTo(
//     ".modules h1",
//     { scale: 0.5, blur: 5 },
//     { scale: 1, blur: 0, duration: 1 }
//   ).to(".modules h1", { x: 100, duration: 2 });
// });
</script>

<style scoped lang="scss">
.modules {
  background-color: #74b9ff;
}
</style>
