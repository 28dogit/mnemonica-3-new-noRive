<template>
  <div id="phases-element" class="element">
    <PreSvg id="Pre_svg" class="phaseCircle"></PreSvg>
    <ProductionSvg id="Production_svg" class="phaseCircle"></ProductionSvg>
    <PostSvg id="Post_svg" class="phaseCircle"></PostSvg>
    <MarketSvg id="Market_svg" class="phaseCircle"></MarketSvg>
  </div>
  <div id="phases-content-wrapper" class="wrapper">
    <div id="phases-content" class="content">
      <div class="headline">
        <h2 id="PhasesSubTitle" class="text-center">
          <slot name="title" mdc-unwrap="p" />
        </h2>
        <h3 class="text-center">
          <slot name="subtitle" mdc-unwrap="p" />
        </h3>
        <div class="choice">
          <BtnMasterBTN>Production</BtnMasterBTN>
          <BtnMasterBTN>Archive</BtnMasterBTN>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//le altre importazioni derivano dalla pagina principale
import { nextTick } from "vue";
import { _opacity } from "#tailwind-config/theme";
import { _bottom } from "#tailwind-config/theme/backgroundPosition";

//definisco le costanti da esporre con defineExpose, che userò all'interno di onMounted utilizzando .value
// utilizzo shallowRef per non covertire le proprietà interne di Gsap in oggetti reattivi di vue
const rotationTL = shallowRef(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  nextTick(() => {
    let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
    let phasesChipsTitle = $gsap.utils.toArray("#chips-wrapper .container .title");
    //let phasesChips = $gsap.utils.toArray("#chips-wrapper .phase-chips");
    let phasesChipsContainer = $gsap.utils.toArray(
      "#chips-wrapper .container .chipsContainer"
    );

    //SECTION - sezione animazione continua dei cerchi delle Fasi

    rotationTL.value = $gsap.timeline({
      paused: true,
    });

    rotationTL.value.to(phasesItems, {
      rotate: 360,
      transformOrigin: "50% 50%",
      duration: 7,
      ease: "linear",
      repeat: -1,
    });

    //!SECTION
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted

//defineExpose({ rotationTL, phasesTL });
defineExpose({ rotationTL });
</script>

<style scoped>
.choice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
