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
    <div id="market-chips-container" class="container">
      <div v-for="chip in marketChips" :key="chip" class="market phase-chips">
        {{ chip }}
      </div>
    </div>
  </div>
</template>
<script setup>
//i principali import li eseguo già nella pagina
let preChips = ["Ingestion", "Camera", "Tests", "Locations", "Casting"];
let productionChips = ["Near Set Lab", "Dailies", "Review & Approval"];
let postChips = ["Editorial", "Visual FX", "Audio"];
let marketChips = ["Archive", "Library", "Festivals", "Screenings"];

onMounted(() => {
  //const { $gsap } = useNuxtApp();
  console.log("PhasesChips mounted");
  //   $gsap.from("#pre-chips-container", {
  //     autoAlpha: 0,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: "#pre-chips-container",
  //       start: "top 80%",
  //       end: "bottom 80%",
  //       toggleActions: "play none none none",
  //       scrub: 1,
  //       markers: true,
  //     },
  //     //display: "block",
  //   });
});
</script>
<style scoped lang="scss">
@use "@/assets/css/_globals.scss" as *;
#chips-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
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
  //   flex-grow: 2;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.1);
}
#production-chips-container,
#post-chips-container,
#market-chips-container {
  display: none;
}
</style>
