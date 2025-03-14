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
        <!-- <h2 id="PhasesSubTitle" class="text-center nuovo-test"> -->
        <div
          id="PhasesSubTitle"
          class="text-center nuovo-test"
          v-if="slots.titolo"
          v-html="slots.titolo"
        ></div>
        <!-- </h2> -->
        <div
          class="text-center"
          v-if="slots.sottotitolo"
          v-html="slots.sottotitolo"
        ></div>
        <!-- <h3 class="text-center">
          Empowering media companies to protect and grow their digital capital
        </h3> -->
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
//ANCHOR - da parametrizzare con un composable
const { data } = await useAsyncData("sections-index", () => {
  return queryCollection("contentData").first();
});
// Verifica che i dati siano presenti
if (!data.value || !data.value.body) {
  console.error("Dati non trovati:", data.value);
}
// Accedi al corpo del Markdown
const body = data.value?.body?.value;

// Funzione per estrarre gli slot da un componente
const extractSlots = (content, componentTag) => {
  const slots = {};

  // Trova il componente
  const componentNode = content.find((node) => node[0] === componentTag);
  if (!componentNode) return slots;

  // Itera sui figli del componente
  const [, , ...children] = componentNode;
  for (const child of children) {
    if (Array.isArray(child) && child[0] === "template") {
      const slotName = Object.keys(child[1])[0]?.replace("v-slot:", "") || "default";
      //const slotName = child[1][0]?.["v-slot"] || "default"; // Estrai il nome dello slot
      slots[slotName] = renderNode(child[2]); // Renderizza il contenuto dello slot
      console.log("SLOTSName", slots[slotName]);
    }
  }
  return slots;
};

// Estraiamo gli slot dal componente "elemento-iniziale-tre-pallocchi"
const slots = extractSlots(body, "phases");
// Convertiamo il contenuto principale in HTML
const sectionTitle = "Fasi"; // Puoi estrarre il titolo dinamicamente se necessario
const sectionContent = body.map((node) => renderNode(node)).join("");

// Funzione per renderizzare un nodo in HTML
function renderNode(node) {
  // Se il nodo è un testo, restituiscilo direttamente
  if (typeof node === "string") {
    return node;
  }
  const [tag, props, ...children] = node;

  // Ignora i template (li gestiamo separatamente)
  if (tag === "template") {
    return "";
  }

  // Se è un componente personalizzato, renderizza i suoi figli
  if (tag.startsWith("phases")) {
    const renderedChildren = children.map((child) => renderNode(child)).join("");
    return `<${tag} id="${props?.id || ""}">${renderedChildren}</${tag}>`;
  }

  // Renderizza i figli
  const renderedChildren = children.map((child) => renderNode(child)).join("");

  // Restituisce l'elemento HTML
  return `<${tag} id="${props?.id || ""}">${renderedChildren}</${tag}>`;
}
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
.choice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
