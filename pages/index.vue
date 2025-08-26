<template>
  <main>
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
          <div id="canvasLogo" style="position: absolute; height: 100px; z-index: 5">Logo Mnemonica</div>
          <div id="canvasPayoff" style="width: 100%; height: 50vh">Screen Deliver Preserve</div>
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
import { HSectionsArchive } from "#components";

const PhasesRef = ref(null);
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

onMounted(() => {
  const { $gsap } = useNuxtApp();

  // Effetti da utilizzare Zoom e Parallax. Qui sotto ci sono due demo una per lo zoom applicato alla ghirlanda e una per il parallasse applicato ai cerchi delle fasi
  // per applicarli a qualsiasi elemento del DOM bisogna variare i due riferimenti:
  // il primo è l'elemento che riceverà l'effetto ad esempio #ghirlanda_img e il secondo è quello che innesca l'animazione allo scroll (il trigger) ad esempio #ghirlanda-element
  // il trigger si innesca e si stoppa sull'incrocio di start e end. Primo valore di start è l'elemento che viene animato, secondo valore e la viewport, stessa cosa per end
  // quindi - start: "top 100px" - significa quando la parte alta di #ghirlanda-element supera il punto equivalente a 100px a partire dall'alto della viewport
  // e - end: "bottom 500px" - significa quando la parte bassa di #ghirlanda-element supera il punto equivalente a 500px a partire dall'alto della viewport
  // mettendo markers: true, verranno i riferimenti verranno visualizzati a schermo per poter regolare al meglio l'attivazione e la disattivazione dell'effetto

  // 1. Effetto zoom applicato alla ghiralnda come demo!
  $gsap.to("#ghirlanda_img", {
    scale: 1.2,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#ghirlanda-element",
      start: "top 100px",
      end: "bottom 500px",
      scrub: 1,
      markers: false,
    },
  });

  //3. Parallax applicato ai cerchi delle phases come demo!
  $gsap.to("#phases-element", {
    yPercent: 50,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#phases-section-2",
      start: "top top",
      end: "bottom +200px",
      scrub: 1,
      markers: false,
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
