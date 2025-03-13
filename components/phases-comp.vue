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
        <h2 id="PhasesSubTitle" class="text-center nuovo-test">
          {{ data.title }}
          {{ PhasesContent }}
        </h2>
        <div class="cino">
          <ContentRenderer :value="data" v-slot="title"></ContentRenderer>
        </div>
        <ContentRenderer :value="testpage"></ContentRenderer>
        <h3 class="text-center">
          Empowering media companies to protect and grow their digital capital
        </h3>
        <div class="choice">
          <BtnMaster>Production</BtnMaster>
          <BtnMaster>Archive</BtnMaster>
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

const { data } = await useAsyncData("testdata", () => {
  return queryCollection("contentData").first();
});
const { data: testpage } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);
// Accesso al corpo del Markdown
const body = data.value?.body?.value;

const extractBlockContent = (body, blockName) => {
  if (!body || !Array.isArray(body)) return `Slot ${blockName} non trovato`;

  // Cerca ricorsivamente i nodi con il nome dello slot
  const findSlot = (node) => {
    if (Array.isArray(node) && node[0] === blockName) {
      // Estrai il contenuto dal terzo elemento del nodo
      const contentNode = node[2];
      if (Array.isArray(contentNode)) {
        // Se il contenuto è un array, estrai il testo
        return contentNode
          .map((item) => {
            if (
              Array.isArray(item) &&
              item[0] === ("p" || "h1" || "h2" || "h3" || "h4" || "h5" || "h6")
            ) {
              return item[2]?.trim() || "";
            }
            return "";
          })
          .join(" ");
      }
    }
    if (Array.isArray(node)) {
      for (const child of node) {
        const result = findSlot(child);
        if (result) return result;
      }
    }
    return null;
  };

  const result = findSlot(body);
  return result || `Slot ${blockName} non trovato`;
};

// Estrai il contenuto degli slot
const PhasesContent = body
  ? extractBlockContent(body, "phases")
  : "Slot 1 phases non trovato";

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
