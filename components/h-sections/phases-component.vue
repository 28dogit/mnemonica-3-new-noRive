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
        <div id="PhasesTitle" class="text-center">
          <h2>From <i>prep</i> to <strong>Eternity</strong></h2>
        </div>
        <div id="PhasesSubtitle" class="text-center">
          <p><strong>Empowering media companies</strong> to <i>protect</i> and grow their digital assets</p>
        </div>
        <div class="choice">
          <BtnMaster @click="handleSelectRef('production')">Production</BtnMaster>
          <BtnMaster @click="handleSelectRef('archive')">Archive</BtnMaster>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//le altre importazioni derivano dalla pagina principale
// import { nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//definisco le costanti da esporre con defineExpose, che userò all'interno di onMounted utilizzando .value
// utilizzo shallowRef per non covertire le proprietà interne di Gsap in oggetti reattivi di vue
const rotationTL = shallowRef(null);
const rotationTL_Titles = shallowRef(null);

const emit = defineEmits(["menuAction"]);
const handleSelectRef = ref(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();
  // Funzione per gestire la selezione di una voce del menu
  const handleSelect = (section) => {
    emit("menuAction", section);
  };

  handleSelectRef.value = handleSelect;

  nextTick(() => {
    let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
    //let phasesTitles = $gsap.utils.toArray(".phaseCircle .innerTxt"); //creo l'array dei titoli delle fasi
    const phasesElement = document.getElementById("phases-element");

    //SECTION - sezione animazione continua dei cerchi delle Fasi

    $gsap.set(phasesItems, {
      opacity: 0.4,
    });

    rotationTL.value = $gsap.timeline({
      //paused: true,
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
      // paused: true,
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
    rotationTL_Titles.value.TitlesRotation(".phaseCircle #Post_txt", { duration: 15 }, "<");
    rotationTL_Titles.value.TitlesRotation(".phaseCircle #Market_txt", { duration: 16 }, "<");

    // avvia/pausa animazioni cerchi in base alla visibilità
    const phasesScrollTrigger = ScrollTrigger.create({
      trigger: phasesElement, // il contenitore principale del componente
      start: "top 80%", // quando la parte superiore del componente è all'80% della viewport
      end: "bottom 20%", // finché il fondo non scende sotto il 20% della viewport
      onEnter: () => {
        rotationTL.value.play();
        rotationTL_Titles.value.play();
      },
      onLeave: () => {
        rotationTL.value.pause();
        rotationTL_Titles.value.pause();
      },
      onEnterBack: () => {
        rotationTL.value.play();
        rotationTL_Titles.value.play();
      },
      onLeaveBack: () => {
        rotationTL.value.pause();
        rotationTL_Titles.value.pause();
      },
      //markers: true,
    });

    //!SECTION
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted
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
