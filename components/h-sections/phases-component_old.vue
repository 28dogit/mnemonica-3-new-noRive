<template>
  <div id="phases-element" class="element">
    <div class="circular">
      <SvgAllPhases id="Phases_svg" class="phaseCircle"></SvgAllPhases>
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
          <BtnMaster @click="handleSelectRef('production')">Production</BtnMaster>
          <BtnMaster @click="handleSelectRef('archive')">Archive</BtnMaster>
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

//definisco le costanti da esporre con defineExpose, che userò all'interno di onMounted utilizzando .value
// utilizzo shallowRef per non covertire le proprietà interne di Gsap in oggetti reattivi di vue
const rotationTL = shallowRef(null);
const rotationTL_Titles = shallowRef(null);

const emit = defineEmits(["menuAction"]);
const handleSelectRef = ref(null);

// Creo un ref per la funzione di navigazione

// const navigationStore = useNavStore();

// // Definisco la funzione di navigazione fuori da nextTick per garantire che sia disponibile subito
// const navigateToSection = (sectionName) => {
//   // Utilizzo setTimeout per assicurarmi che il calcolo delle posizioni avvenga dopo il rendering completo
//   setTimeout(() => {
//     const element = document.getElementById(sectionName);
//     if (element) {
//       // Utilizzo scrollIntoView che rispetta automaticamente il scroll-padding-top impostato nel CSS globale
//       element.scrollIntoView({ behavior: "smooth" });
//       // Eseguo anche la logica dello store per mantenere la coerenza con altre parti dell'applicazione
//       navigationStore.setTargetSection(sectionName, true);
//     } else {
//       console.error(`Elemento con ID "${sectionName}" non trovato.`);
//       // Fallback al metodo precedente se l'elemento non viene trovato
//       navigationStore.setTargetSection(sectionName, true);
//     }
//     console.log(`Navigazione verso la sezione: ${sectionName}`);
//   }, 50); // Un breve timeout per garantire che il layout sia calcolato
// };

onMounted(() => {
  const { $gsap } = useNuxtApp();
  // Funzione per gestire la selezione di una voce del menu
  const handleSelect = (section) => {
    emit("menuAction", section);
  };

  handleSelectRef.value = handleSelect;

  nextTick(() => {
    let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
    let phasesTitles = $gsap.utils.toArray(".phaseCircle .innerTxt"); //creo l'array dei titoli delle fasi
    let phasesChipsTitle = $gsap.utils.toArray("#chips-wrapper .container .title");
    //let phasesChips = $gsap.utils.toArray("#chips-wrapper .phase-chips");
    let phasesChipsContainer = $gsap.utils.toArray(
      "#chips-wrapper .container .chipsContainer"
    );

    //SECTION - sezione animazione continua dei cerchi delle Fasi

    $gsap.set(phasesItems, {
      opacity: 0.4,
    });

    rotationTL.value = $gsap.timeline({
      paused: true,
    });

    rotationTL.value.to(phasesItems, {
      rotate: 360,
      transformOrigin: "50% 50%",
      duration: 9,
      ease: "linear",
      repeat: -1,
    });

    $gsap.registerEffect({
      name: "TitlesRotation",
      effect: (targets, config) => {
        return $gsap.from(targets, {
          duration: config.duration,
          rotate: config.rotate,
          transformOrigin: config.transformOrigin,
          repeat: config.repeat,
          ease: config.ease,
        });
      },
      defaults: {
        rotate: 360,
        transformOrigin: "50% 50%",
        repeat: -1,
        ease: "linear",
      },
      extendTimeline: true,
    });

    rotationTL_Titles.value = $gsap.timeline({
      paused: true,
    });

    rotationTL_Titles.value.TitlesRotation(".phaseCircle #Pre_txt", {
      duration: 12,
      rotate: -360,
    });
    rotationTL_Titles.value.TitlesRotation(
      ".phaseCircle #Production_txt",
      {
        duration: 13,
        rotate: -360,
      },
      "<"
    );
    rotationTL_Titles.value.TitlesRotation(
      ".phaseCircle #Post_txt",
      { duration: 15 },
      "<"
    );
    rotationTL_Titles.value.TitlesRotation(
      ".phaseCircle #Market_txt",
      { duration: 16 },
      "<"
    );
    //!SECTION
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted

defineExpose({ rotationTL, rotationTL_Titles });
</script>

<style lang="scss" scoped>
// .Phases_svg {
//   width: 100%;
// }
.choice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
}
</style>
