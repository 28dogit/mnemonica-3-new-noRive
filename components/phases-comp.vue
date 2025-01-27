<template>
  <div id="phases-element" class="element">
    <PreSvg id="Pre_svg" class="phaseCircle"></PreSvg>
    <ProductionSvg id="Production_svg" class="phaseCircle"></ProductionSvg>
    <PostSvg id="Post_svg" class="phaseCircle"></PostSvg>
    <MarketSvg id="Market_svg" class="phaseCircle"></MarketSvg>
    <div id="phasesTitle" class="title">
      <h2>All Phases</h2>
    </div>
  </div>
  <div id="phases-content-wrapper" class="wrapper">
    <div id="phases-content" class="content">
      <PhasesChips2></PhasesChips2>
    </div>
  </div>
</template>

<script setup>
//le altre importazioni derivano dalla pagina principale
import { nextTick } from "vue";
import { _opacity } from "#tailwind-config/theme";
import { _bottom } from "#tailwind-config/theme/backgroundPosition";
import { PhasesChips2 } from "#components";

//definisco le costanti da esporre con defineExpose, che userò all'interno di onMounted utilizzando .value
// utilizzo shallowRef per non covertire le proprietà interne di Gsap in oggetti reattivi di vue
const rotationTL = shallowRef(null);
const phasesTL = shallowRef(null);
//const intentObserver = shallowRef(null);

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

    //SECTION - sezione animazione delle chips delle fasi
    phasesTL.value = $gsap.timeline({ paused: true });

    phasesChipsTitle.forEach((ChipTitle, i) => {
      // Nasconde il chip precedente prima di mostrare il nuovo
      if (i > 0) {
        phasesTL.value.to(phasesChipsTitle[i - 1], {
          autoAlpha: 0,
          duration: 0.3,
        });

        phasesTL.value.to(
          phasesChipsContainer[i - 1],
          {
            autoAlpha: 0,
            duration: 0.3,
          },
          "<"
        );
      }

      // Mostra il nuovo titolo
      phasesTL.value.fromTo(
        ChipTitle,
        { y: -10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3 }
      );

      // Mostra il nuovo contenitore di chips
      phasesTL.value.fromTo(
        phasesChipsContainer[i],
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3 },
        "<"
      );

      phasesTL.value.addLabel(`label_end${i}`);
      phasesTL.value.addPause();
    });

    //!SECTION

    //SECTION - gestione animazione a steps

    //!SECTION
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted

defineExpose({ rotationTL, phasesTL });
</script>

<style scoped></style>
