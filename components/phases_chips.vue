<template>
  <div id="chips-wrapper">
    <div id="pre-chips-container" class="container">
      <div v-for="chip in preChips" :key="chip" class="pre phase-chips">{{ chip }}</div>
    </div>
    <div id="production-chips-container" class="container">
      <div v-for="chip in productionChips" :key="chip" class="production phase-chips">
        {{ chip }}
      </div>
    </div>
    <div id="post-chips-container" class="container">
      <div v-for="chip in postChips" :key="chip" class="post phase-chips">{{ chip }}</div>
    </div>
    <div id="market-chips-container" class="container h-max">
      <div v-for="chip in marketChips" :key="chip" class="market phase-chips">
        {{ chip }}
      </div>
    </div>
  </div>
</template>
<script setup>
//i principali import li eseguo già nella pagina home
// import { nextTick } from "vue";
let preChips = ["Ingestion", "Camera", "Tests", "Locations", "Casting"];
let productionChips = ["Near Set Lab", "Dailies", "Review & Approval"];
let postChips = ["Editorial", "Visual FX", "Audio"];
let marketChips = ["Archive", "Library", "Festivals", "Screenings"];

// onMounted(() => {
//   // const { $gsap } = useNuxtApp();
//   // uso nexTick per caricare le animazioni gsap dopo il rendering del main page
//   nextTick(() => {
//     // console.log("PhasesChips nexttick mounted");
//     // const containers = [
//     //   "#pre-chips-container",
//     //   "#production-chips-container",
//     //   "#post-chips-container",
//     //   "#market-chips-container",
//     // ];
//     // const tl = $gsap.timeline({
//     //   scrollTrigger: {
//     //     trigger: "#chips-wrapper",
//     //     start: "top 80%",
//     //     end: "bottom 50%",
//     //     toggleActions: "play reverse play reverse",
//     //     markers: true,
//     //   },
//     // });
//     // containers.forEach((container, index) => {
//     //   const chips = document.querySelectorAll(`${container} .phase-chips`);
//     //   tl.from(container, {
//     //     autoAlpha: 0,
//     //     duration: 0.5,
//     //   }).from(
//     //     chips,
//     //     {
//     //       autoAlpha: 0,
//     //       duration: 0.5,
//     //       stagger: 0.2,
//     //     }
//     //     //`-=${0.5 * index}`
//     //   ); // Sovrappone leggermente le animazioni dei contenitori
//     // });
//   });
// });
</script>
<style scoped lang="scss">
@use "@/assets/css/_globals.scss" as *;
#chips-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  width: 100%;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: absolute;
}
.phase-chips {
  font-size: 0.85rem;
  font-weight: 300;
  background-color: $gradient_3;
  min-width: 105px;
  height: 35px;
  border-radius: 35px;
  padding: 0.5rem 1rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.1);
}
#production-chips-container,
#post-chips-container,
#market-chips-container {
  opacity: 0;
}
</style>
