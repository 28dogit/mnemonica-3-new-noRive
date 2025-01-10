<template>
  <section class="sectionN phases">
    <h1>Phases Section</h1>
  </section>
</template>

<script setup>
// import { onMounted } from "vue";
// import { gsap } from "gsap";

// onMounted(() => {
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".phases",
//       start: "top top",
//       end: "bottom top",
//       scrub: true,
//       onEnter: () => {
//         // Mostra Phases quando si entra
//         gsap.to(".phases", { opacity: 1, duration: 0.5 });
//       },
//       onLeave: () => {
//         // Nasconde Phases quando si lascia
//         gsap.to(".phases", { opacity: 0, duration: 0.5 });
//       },
//     },
//   });

//   tl.fromTo(
//     ".phases h1",
//     { opacity: 0, y: 100 },
//     { opacity: 1, y: 0, duration: 1 }
//   ).to(".phases h1", { x: -100, duration: 2 });
// });
</script>

<style scoped lang="scss">
.phases {
  background-color: #55efc4;
}
</style>
