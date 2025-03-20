<template>
  <div id="phases-element" class="element">
    <div class="elementSvg">
      <SvgPre id="Pre_svg" class="phaseCircle"></SvgPre>
      <SvgProduction id="Production_svg" class="phaseCircle"></SvgProduction>
      <SvgPost id="Post_svg" class="phaseCircle"></SvgPost>
      <SvgMarket id="Market_svg" class="phaseCircle"></SvgMarket>
    </div>
  </div>
  <div id="phases-content-wrapper" class="wrapper">
    <div id="phases-content" class="content">
      <div class="headline">
        <!-- <div class="" v-html="defaultContent"></div> -->
        <div
          id="PhasesTitle"
          class="text-center"
          v-if="slots.title"
          v-html="slots.title"
        ></div>
        <div
          id="PhasesSubtitle"
          class="text-center"
          v-if="slots.subtitle"
          v-html="slots.subtitle"
        ></div>
        <div class="choice">
          <BtnMaster>Production</BtnMaster>
          <BtnMaster>Archive</BtnMaster>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//SECTION - Nuxt Content CMS

//Uso il composable useExtractSlots per estrarre i dati dal file di markup (slot da estrarre, file .md da leggere)
const { fetchSection } = useExtractSlots("phases", "sections-index");

// Estraggo i dati per ottenere i testi degli slot che mi servono più il file di default nell'html fare riferimento al nome dello slot da richiamare nel file di markup
const { slots, defaultContent, isloading } = fetchSection();

//!SECTION

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
.elementSvg {
  position: relative;
  display: block;
  width: 350px;
  height: 350px;
}
.choice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
