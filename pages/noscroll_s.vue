<template>
  <main>
    <div id="sectionsWrapper" class="z-20">
      <!-- <section class="sectionN hero"> -->
      <div id="hero-section" class="section_fixed hero">
        <div id="ghirlanda-element" class="element">
          <NuxtImg
            id="ghirlanda_img"
            src="/assets/img/Ghirlanda_full_web_800_opt.png"
            alt="mnemonica ghirlanda ecosystem"
            densities="x1"
          />
        </div>
        <div id="hero-content-wrapper" class="wrapper">
          <div id="hero-content" class="content">
            <div id="heroTitle" class="flex items-center justify-center flex-wrap">
              <div class="overflowMask overflow-hidden">
                <h1 id="H-screen" class="uppercase">Screen</h1>
              </div>
              <div class="overflowMask overflow-hidden">
                <h1 id="H-deliver" class="uppercase">Deliver</h1>
              </div>
              <div class="overflowMask overflow-hidden">
                <h1 id="H-preserve" class="uppercase">Preserve</h1>
              </div>
            </div>
            <h2 id="heroSubTitle" class="hidden min-[680px]:block text-center">
              Connecting the dots of the digital cinema living ecosystem
            </h2>
            <h2 id="heroSubTitle" class="text-center min-[680px]:hidden">
              Connecting the dots of the digital <br />cinema living ecosystem
            </h2>
          </div>
        </div>
      </div>
      <!-- </section> -->
      <!-- <section class="section_fixed modules">Modules Section</section> -->
      <div id="modules-section" class="section_fixed modules">
        <ModulesCompNs></ModulesCompNs>
      </div>
      <div id="phases-section" class="section_fixed phases">
        <PhasesComp ref="PhasesRef"></PhasesComp>
      </div>
      <!-- <section class="section_fixed phases">Phases Section</section> -->
    </div>
    <div class="nofixed_section w-[100vw] h-[1600px] z-30">
      <div id="made-for" class="max-w-[1200px]">
        <h2>Made For</h2>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import PhasesComp from "~/components/phases-comp.vue";

const PhasesRef = ref(null);

onMounted(async () => {
  await nextTick();
  const { $gsap } = useNuxtApp();

  //SECTION - animazioni interne
  // implemento la timeline intro che sbloccherà alla fine l'overflow hidden del body per ripristinare lo scroll
  const intro = $gsap.timeline({
    onComplete: () => {
      //console.log("Ripristino scroll");
      $gsap.set("body", { overflow: "auto" });
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

  intro.from("#ghirlanda-element", {
    autoAlpha: 0,
    rotate: 5,
    filter: "blur(5px)",
    duration: 1.5,
    scale: 0.9,
    force3D: true,
    ease: "power2.inOut",
  });
  intro.EnterFrom("#logo_mne", { duration: 2, y: "0" });
  intro.EnterFrom("#H-screen", { duration: 0.7 }, "<");
  intro.EnterFrom("#H-deliver", { duration: 0.7 }, "> -=0.3");
  intro.EnterFrom("#H-preserve", { duration: 0.7 }, "> -=0.3");
  intro.EnterFrom("#heroSubTitle", { duration: 0.5, y: "-25px" }, "-=0.7");

  //!SECTION

  const sections = document.querySelectorAll(".section_fixed");
  //console.log("sections", sections);

  if (!sections.length) {
    console.error("Nessuna sezione trovata.");
    return;
  }

  //SECTION - Richiamo Composables e le varie esposte
  //richiamo del composable useGsapModules che contiene tutta la timeline di modules
  //qui richiamerò anche il composables di Phase (da implementare ancora)

  //composables di Modules
  const { modules_tl, getScrollTrigger, setOnEnter, setOnComplete } = useGsapModules();
  const scrollTrigger = getScrollTrigger();
  scrollTrigger.disable();

  //phases
  // console.log(
  //   "Rotazione tl fase suo scrolltrigger - ",
  //   PhasesRef.value.rotationTL,
  //   "intent observer? - ",
  //   PhasesRef.value.intentObserver
  // );

  //!SECTION

  //creo la funzione updateTriger per aggiornarla con un listner sul resize
  const updateTriggers = () => {
    let allScrollHeight = 200;
    let scrollTriggerHeights = [];
    // Loop per creare transizioni tra sezioni
    sections.forEach((section, index) => {
      const viewportHeight = section.offsetHeight;
      //calcolo l'altezza della section per gestire i markers di gsap
      let scrollHeight = ref(null);
      let start_S = 0;
      let end_S = 0;
      let sectionHeight0 = section.offsetHeight;
      let sectionHeight1 = scrollTrigger.end;
      let sectionHeight2 = section.offsetHeight;
      // console.log(
      //   "le altezze Reali :) - ",
      //   sectionHeight0,
      //   " - ",
      //   sectionHeight1,
      //   " - ",
      //   sectionHeight2
      // );

      if (index === 0) {
        scrollHeight = sectionHeight0;
        start_S = 0;
        end_S = sectionHeight0;
      }
      if (index === 1) {
        scrollHeight = scrollTrigger.end;
        start_S = section.offsetHeight;
        end_S = section.offsetHeight + scrollTrigger.end;
        //console.log("test1", scrollTriggerHeights[index - 1]);
      }
      if (index === 2) {
        scrollHeight = section.offsetHeight;
        start_S = section.offsetHeight + scrollTrigger.end;
        end_S = section.offsetHeight * 2 + scrollTrigger.end;
        //console.log("test2", scrollTriggerHeights[index - 1]);
      }

      allScrollHeight += scrollHeight;
      scrollTriggerHeights.push(scrollHeight);

      // console.log("SecrollHeight", scrollHeight);
      // console.log("allScrollHeight", allScrollHeight);
      // console.log("scrollTriggerHeights", scrollTriggerHeights);
      // console.log("test Calcolo Start", start_S);
      // console.log("test Calcolo End", end_S);

      //rendo dinamica l'altezza di #sectionsWrapper usando js per creare la variabile css dell'altezza in base a quante sezioni ci sono, per evitare errori o dimenticanze scrivendolo a mano
      // questa variabile la userò nel css
      document.documentElement.style.setProperty(
        "--total-height",
        `${allScrollHeight}px`
      );

      let mainScrollTrigger = ScrollTrigger.create({
        //markers: true,
        //pin: true,
        trigger: "#sectionsWrapper", // Trigger sull'intero contenitore
        //trigger: section, // Trigger sull'intero contenitore

        start: `${start_S}px center`, // Inizio della sezione
        end: `${end_S}px center`, // fine della sezione
        //invalidateOnRefresh: true,

        onEnter: () => {
          $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
          if (index === 1) {
            scrollTrigger.enable();
          }
          if (index === 2) {
            PhasesRef.value.rotationTL.play();
            PhasesRef.value.intentObserver.enable();
          }
        },
        onLeave: () => {
          $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
          if (index === 1) {
            scrollTrigger.disable();
            modules_tl.set(".ghirlanda-updx, .ghirlanda-dwsx", { autoAlpha: 1 }); //mantengo visibili le ghirlande
          }
          if (index === 2) {
            PhasesRef.value.rotationTL.pause();
            PhasesRef.value.intentObserver.disable();
          }
        },
        onEnterBack: () => {
          $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
          if (index === 1) {
            scrollTrigger.enable();
            ScrollTrigger.refresh();
          }
          if (index === 2) {
            PhasesRef.value.rotationTL.play();
            PhasesRef.value.intentObserver.enable();
          }
        },
        onLeaveBack: () => {
          $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
          if (index === 1) {
            scrollTrigger.disable();
          }
          if (index === 2) {
            PhasesRef.value.rotationTL.pause();
            PhasesRef.value.intentObserver.disable();
          }
        },

        // onEnter: () => {
        //   console.log("onEnter", index);
        //   $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
        //   if (index === 1) {
        //     scrollTrigger.enable();
        //     setOnEnter(() => {});
        //     setOnComplete(() => {
        //       //scrollTrigger.disable();
        //     });
        //     console.log("on enter index 1 - ", index);
        //   }
        //   if (index === 2) {
        //     PhasesRef.value.rotationTL.play();
        //     PhasesRef.value.intentObserver.enable();
        //     console.log("Observer enabled on Enter:", PhasesRef.value.intentObserver);
        //     console.log("on enter index 2 - ", index);
        //   }
        // },
        // onLeave: () => {
        //   console.log("onLeave", index);
        //   $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
        //   if (index === 1) {
        //     scrollTrigger.disable();
        //   }
        //   if (index === 2) {
        //     PhasesRef.value.rotationTL.pause();
        //     PhasesRef.value.intentObserver.disable();
        //   }
        //   console.log("Observer enabled on leave:", PhasesRef.value.intentObserver);
        // },
        // onEnterBack: () => {
        //   console.log("onEnterBack", index);
        //   $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
        //   if (index === 1) {
        //     scrollTrigger.enable();
        //     console.log("riattivo scroll trigger");
        //     console.log("on enter Back index 1 - ", index);
        //   }
        //   if (index === 2) {
        //     PhasesRef.value.rotationTL.play();
        //     PhasesRef.value.intentObserver.enable();
        //     console.log("Observer enabled onEnterB:", PhasesRef.value.intentObserver);
        //     console.log("on enter Back index 2 - ", index);
        //   }
        // },
        // onLeaveBack: () => {
        //   console.log("onLeaveBack", index);
        //   $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
        //   if (index === 1) {
        //     scrollTrigger.disable();
        //   }
        //   if (index === 2) {
        //     PhasesRef.value.rotationTL.pause();
        //     PhasesRef.value.intentObserver.disable();
        //   }
        //   console.log("Observer enabled onLeaveB:", PhasesRef.value.intentObserver);
        // },
      });
    });
    ScrollTrigger.refresh();
  };

  // Inizializza i trigger
  updateTriggers();

  // Listener per il resize
  window.addEventListener("resize", updateTriggers);

  // Rimuovi il listener quando il componente viene smontato
  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateTriggers);
  });

  // Imposta la prima sezione visibile all'inizio
  $gsap.set(sections[0], { opacity: 1 });
});
</script>

<style lang="scss">
@use "@/assets/css/_globals.scss" as *;
#sectionsWrapper {
  width: 100vw;
  max-width: 1200px;
  //height: 600vh;
  height: var(--total-height);
  //height: 300vh; /* Altezza totale virtuale: 100vh per ogni sezione */
  position: relative; /* Contenitore relativo per le sezioni sovrapposte */
}
//.section_fixed è gestita in main.scss
.nofixed_section {
  background: $gradient_4;
  background: linear-gradient(0deg, $gradient_4 80%, $gradient_4_0 100%);
  z-index: 30;
  padding-top: 5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
