<template>
  <!-- <UButton class="z-90 fixed top-25" @click="testGsap()">provA</UButton> -->
  <main>
    <!-- <MneNavSteps @menuAction="handleMenuAction" class="hidden-tablet-down" /> -->
    <!-- <MneNavStepsMobile @menuAction="handleMenuAction" class="hidden-tablet-up" /> -->
    <div class="nofixed_section w-[100vw] z-30">
      <div id="hero-section-2" class="hero nofixed-inner-wrapper">
        <div id="hero-element" class="element">
          <div id="ghirlanda-element" class="circular">
            <NuxtImg
              id="ghirlanda_img"
              src="/assets/img/Ghirlanda_full_web_800_opt.png"
              alt="mnemonica ghirlanda ecosystem"
              densities="x1"
            />
          </div>
          <canvas ref="canvasRefLogo" id="canvasLogo" style="position: absolute; height: 100px; z-index: 5"></canvas>
          <canvas ref="canvasRef" id="canvasPayoff" style="width: 100%; height: 50vh"></canvas>
        </div>
        <slot name="screentitle"></slot>
        <div id="hero-content-wrapper" class="wrapper">
          <div id="hero-content" class="content hero">
            <div class="headline">
              <h2 id="heroSubTitle" class="hidden min-[680px]:block text-center">
                Connecting the dots of the digital cinema living ecosystem.
              </h2>
              <h2 id="heroSubTitle" class="text-center min-[680px]:hidden">
                Connecting the dot <br />of the digital cinema living ecosystem.
              </h2>
            </div>
            <NuxtLink to="/features" class="txt-link">Explore the magic</NuxtLink>
          </div>
        </div>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="phases-section-2" class="phases nofixed-inner-wrapper">
        <HSectionsPhasesComponent ref="PhasesRef" @menuAction="handleMenuAction"></HSectionsPhasesComponent>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="modules-section-2" class="modules nofixed-inner-wrapper">
        <HSectionsModulesComponent></HSectionsModulesComponent>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="made-for" class="nofixed-inner-wrapper">
        <HSectionsMadeFor></HSectionsMadeFor>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="production" class="nofixed-inner-wrapper">
        <HSectionsProduction></HSectionsProduction>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="production-ui" class="nofixed-inner-wrapper">
        <HSectionsProductionUi></HSectionsProductionUi>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="archive" class="nofixed-inner-wrapper">
        <HSectionsArchive></HSectionsArchive>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="archive-ui" class="nofixed-inner-wrapper">
        <HSectionsArchiveUi></HSectionsArchiveUi>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="about-us" class="nofixed-inner-wrapper">
        <HSectionsAboutUs></HSectionsAboutUs>
      </div>
      <USeparator icon="i-lucide-fold-vertical" class="h-12" />
      <div id="contacts" class="nofixed-inner-wrapper">
        <HSectionsContacts></HSectionsContacts>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick, watch } from "vue";
import { Rive, Fit, Alignment, Layout } from "@rive-app/canvas";
import { HSectionsArchive } from "#components";
import { toRaw } from "vue"; //serve per gestire gli imput delle statemachine di RIVE

const PhasesRef = ref(null);
const canvasRefLogo = ref(null);
const canvasRef = ref(null);
const titleTrigger = ref(null);
const noFixedSTRef = ref(null);
const handleScrollRef = ref(null);

// Riferimento alla funzione per prevenire il rimbalzo in iOS
const preventIOSBounceRef = ref(null);

//SECTION - funzioni per scroll to non fixed sections
import { useNavStore } from "@/stores/navigationStore";

const navigationStore = useNavStore();

//NOTE - il composable useMNEfunctions serve per gestire le funzioni di scrollTo e customLogic tra le sezioni fixed e non fixed
// e anche l'evento menuAction emesso dai menu alternativi come nav-steps
const { scrollToSection, handleMenuAction } = useMNEfunctions(navigationStore); // passo le refs necessarie

//!SECTION

// Variabile per memorizzare il buffer del file .riv
let rivBuffer = null;

// Funzione per caricare il file .riv una sola volta
async function loadRivFile(url) {
  const runtimeConfig = useRuntimeConfig();
  const baseUrl = runtimeConfig.app.baseURL;
  const fullUrl = `${baseUrl}${url}`;
  const response = await fetch(fullUrl);
  //const response = await fetch(url);
  return await response.arrayBuffer();
}

onMounted(() => {
  const { $gsap } = useNuxtApp();

  // 1. Effetto zoom hero
  $gsap.to("#ghirlanda_img", {
    scale: 1.5,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#ghirlanda-element",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  //3. Parallax background
  $gsap.to("#phases-element", {
    yPercent: 50,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#phases-section-2",
      start: "top top",
      end: "bottom +200px",
      scrub: 1,
      markers: true,
    },
  });

  //SECTION - scroll to sections quando arrivo da una pagina esterna
  if (navigationStore.targetSection) {
    scrollToSection(navigationStore.targetSection);
  }
  // aggiungo un watch per quando sono già nella home e controllo lo stato dello store
  watch(
    () => navigationStore.targetSection,
    (newSection) => {
      if (newSection) {
        scrollToSection(newSection);
        //resetNofixedSectionPosition("da Watch");
      }
    }
  );

  nextTick(async () => {
    //SECTION - RIVE
    // Carica il file .riv una sola volta
    rivBuffer = await loadRivFile("/rive/hero_mne_divided.riv");

    const rLogo = new Rive({
      buffer: rivBuffer, // Utilizza il buffer già caricato
      artboard: "Logo",
      canvas: canvasRefLogo.value,
      autoplay: true,
      //stateMachines: "State logo",
      animations: "Logo intro",
      layout: new Layout({
        fit: Fit.Layout, // Adatta senza distorsione
        alignment: Alignment.Center, // Centra l'animazione
        resizeMode: "auto",
      }),
      onLoad: () => {
        rLogo.resizeDrawingSurfaceToCanvas();
        rLogo.pause(); // metto in pausa l'istanza rLogo dopo averla inizializzata in modo da poterla riprendere in seguito e fare rLogo.play("timelineName")
      },
    });

    const rTitle = new Rive({
      buffer: rivBuffer,
      artboard: "Title",
      canvas: canvasRef.value,
      autoplay: true,
      stateMachines: "State Title",
      //animations:"Hero-title-intro",
      layout: new Layout({
        fit: Fit.Layout, // Adatta senza distorsione
        alignment: Alignment.Center, // Centra l'animazione
        resizeMode: "auto",
      }),
      onLoad: () => {
        rTitle.resizeDrawingSurfaceToCanvas();
        //rTitle.pause();
        const inputs = rTitle.stateMachineInputs("State Title");
        //console.log(inputs);
        // Find the input you want to set a value for, or trigger e lo salvo in una ref titleTrigger
        titleTrigger.value = inputs.find((i) => i.name === "start");
        //nomino i run text in rive e poi gli assegno un nuovo nome qui
        rTitle.setTextRunValue("primo", "MEDIA");
        rTitle.setTextRunValue("secondo", "ASSET");
        rTitle.setTextRunValue("terzo", "MAGIC");
      },
    });

    function aggiornaResize(elemento) {
      elemento.layout = new Layout({
        fit: Fit.Layout, // Cambia il fit per coprire l'area
        alignment: Alignment.Center, // Allinea in basso
        resizeMode: "auto",
      });
      elemento.resizeDrawingSurfaceToCanvas();
    }

    window.addEventListener("resize", () => {
      [rTitle, rLogo].forEach(aggiornaResize);
    });

    //!SECTION

    //$gsap.set("#hero-section", { opacity: 1, zIndex: 1 });
    $gsap.set(".ghirlanda-updx, .ghirlanda-dwsx ", { opacity: 0 });

    // Variabile che indica se l'animazione intro è completata
    let introCompleted = false;
    //let isfixedSection = true; non serve più perchè sostituita dal composable

    //SECTION - animazioni Intro
    // implemento la timeline intro che sbloccherà alla fine l'overflow hidden del body per ripristinare lo scroll
    const intro = $gsap.timeline({
      onStart: () => {
        console.log("Intro Partita");
        //rLogo.play("Logo intro"); //Logo intro è il nome della timeline impostata in Rive
      },
      onComplete: () => {
        introCompleted = true;
        console.log("Intro completata");
        //rLogo.play("Logo intro"); //Logo intro è il nome della timeline impostata in Rive
      },
    });

    // registro effetto per l'entrata delle scritte e del logo in Hero section
    $gsap.registerEffect({
      name: "EnterFrom",
      effect: (targets, config) => {
        return $gsap.from(targets, {
          autoAlpha: 0,
          duration: config.duration,
          y: config.y,
          ease: config.ease,
        });
      },
      defaults: {
        ease: "back.out",
        y: "100",
      },
      extendTimeline: true,
    });

    intro.call(
      () => {
        rLogo.play("Logo intro");
      },
      null,
      0.3
    );
    intro.from(
      "#ghirlanda-element",
      {
        opacity: 0,
        rotate: 5,
        filter: "blur(5px)",
        duration: 3,
        scale: 0.9,
        force3D: true,
        ease: "power2.inOut",
      },
      ">=0.5"
    );
    intro.to(
      "#canvasLogo",
      {
        autoAlpha: 0,
        duration: 2,
      },
      "<+=1"
    );
    intro.call(
      () => {
        if (titleTrigger.value) {
          //gestisco l'input trigger della Statemachine di RIVE con toRaw per leggerla
          const rawTrigger = toRaw(titleTrigger.value);
          console.log(rawTrigger);
          rawTrigger.fire();
        }
      },
      null,
      2
    );
    intro.EnterFrom("#heroSubTitle", { duration: 0.5, y: "-25px" }, "-=0.7");

    //!SECTION
  }); //NOTE - chiusura Next Tick
}); //NOTE - chiusura onMouted

onBeforeUnmount(() => {
  // Ripristino lo scroll nel caso lasciassi la pagina prima di aver sbloccato lo scroll via gsap
  document.body.style.overflow = "auto";
  // Clean up dello ScrollTrigger
  if (noFixedSTRef.value) {
    noFixedSTRef.value.kill();
    noFixedSTRef.value = null;
  }

  // Remove event listeners
  if (handleScrollRef.value) {
    window.removeEventListener("wheel", handleScrollRef.value, { passive: false });
    window.removeEventListener("touchstart", handleScrollRef.value, { passive: false });
    window.removeEventListener("touchmove", handleScrollRef.value, {
      passive: false,
      capture: true,
    });
    window.removeEventListener("touchend", handleScrollRef.value, { passive: false });
    window.removeEventListener("touchcancel", handleScrollRef.value, { passive: false });
    window.removeEventListener("mousedown", handleScrollRef.value, { passive: false });
    window.removeEventListener("mousemove", handleScrollRef.value, { passive: false });
    window.removeEventListener("mouseup", handleScrollRef.value, { passive: false });

    // Rimuovi anche l'event listener per prevenire il rimbalzo usando il riferimento alla funzione
    if (preventIOSBounceRef.value) {
      document.removeEventListener("touchmove", preventIOSBounceRef.value, {
        passive: false,
      });
    }

    onUnmounted(() => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
      animations.forEach((anim) => anim.kill());
    });

    // Ripristina il comportamento touch predefinito
    document.body.style.touchAction = "";
  }
});
</script>

<style lang="scss">
//@use "@/assets/css/_globals.scss" as *;
</style>
