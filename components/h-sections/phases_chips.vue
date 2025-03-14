<template>
  <div id="chips-wrapper">
    <div id="pre-chips-container" class="container">
      <div class="title"><h2>Pre Production</h2></div>
      <div v-for="chip in preChips" :key="chip" class="pre phase-chips">{{ chip }}</div>
    </div>
    <div id="production-chips-container" class="container">
      <div class="title"><h2>Production</h2></div>
      <div v-for="chip in productionChips" :key="chip" class="production phase-chips">
        {{ chip }}
      </div>
    </div>
    <div id="post-chips-container" class="container">
      <div class="title"><h2>Post Production</h2></div>
      <div v-for="chip in postChips" :key="chip" class="post phase-chips">{{ chip }}</div>
    </div>
    <div id="market-chips-container" class="container h-max">
      <div class="title"><h2>Market</h2></div>
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
</script>
<style scoped lang="scss">
@use "@/assets/css/_globals.scss" as *;
#chips-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  position: absolute;
  .title {
    display: block;
    width: 100%;
    text-align: center;
    opacity: 0;
    visibility: inherit;
    padding: 1rem;
    color: $mne_text-on-dark;
  }
}
.phase-chips {
  opacity: 0;
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
  color: $mne_secondary;
}
</style>
