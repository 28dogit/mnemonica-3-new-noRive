<template>
  <div id="phases-element" class="element">
    <SvgPre id="Pre_svg" class="phaseCircle"></SvgPre>
    <SvgProduction id="Production_svg" class="phaseCircle"></SvgProduction>
    <SvgPost id="Post_svg" class="phaseCircle"></SvgPost>
    <SvgMarket id="Market_svg" class="phaseCircle"></SvgMarket>
  </div>
  <div id="phases-content-wrapper" class="wrapper">
    <div id="phases-content" class="content">
      <div class="headline">
        <div class="" v-html="defaultContent"></div>
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
// //Uso il composable useExtractSlots per estrarre i dati dal file di markup (slot da estrarre, file .md da leggere)
// const { fetchSection } = useExtractSlots("phases", "sections-index");

// // Estraggo i dati per ottenere i testi degli slot che mi servono più il file di default nell'html fare riferimento al nome dello slot da richiamare nel file di markup
// const { slots, defaultContent } = await fetchSection();

const exposeTest = "ciao ciao async-ions";
const mariolino = "mariolino";
const rotationTL = shallowRef(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  nextTick(async () => {
    //Uso il composable useExtractSlots per estrarre i dati dal file di markup (slot da estrarre, file .md da leggere)
    const { fetchSection } = useExtractSlots("phases", "sections-index");

    // Estraggo i dati per ottenere i testi degli slot che mi servono più il file di default nell'html fare riferimento al nome dello slot da richiamare nel file di markup
    const { slots, defaultContent } = await fetchSection();
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
  });
});
defineExpose({ exposeTest, rotationTL, mariolino });
</script>

<style lang="scss" scoped>
.choice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
