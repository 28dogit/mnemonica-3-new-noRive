<template>
  <main>
    <div id="sectionsWrapper" class="z-20">
      <div id="hero-section" class="section_fixed hero">
        <div id="ghirlanda-element" class="element"></div>
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
      <div id="modules-section" class="section_fixed modules">
        <ModulesComp></ModulesComp>
      </div>
      <div id="phases-section" class="section_fixed phases">
        <PhasesComp ref="PhasesRef"></PhasesComp>
      </div>
    </div>
    <div class="nofixed_section w-[100vw] h-[1600px] z-30">
      <div id="made-for" class="max-w-[1200px]">
        <h2>Made For</h2>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PhasesRef = ref(null);

onMounted(() => {
  nextTick(() => {
    //await nextTick();
    const { $gsap } = useNuxtApp();

    //SECTION - animazioni interne
    // implemento la timeline intro che sbloccherà alla fine l'overflow hidden del body per ripristinare lo scroll
    const intro = $gsap.timeline({
      onComplete: () => {
        //console.log("Ripristino scroll");
        //$gsap.set("body", { overflow: "auto" });
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

    intro.from("#ghirlanda-element_start", {
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

    $gsap.set("#hero-section", { opacity: 1 });
    $gsap.set(".ghirlanda-updx, .ghirlanda-dwsx ", { opacity: 0 });

    //!SECTION

    //SECTION - Gestione animazione Timeline allo scroll

    // array di tutte le sezioni
    const sections = document.querySelectorAll(".section_fixed");
    if (!sections.length) {
      console.error("Nessuna sezione trovata.");
      return;
    }

    // sections.forEach((section, index) => {
    //   const observer = new MutationObserver(() => {
    //     const computedStyle = window.getComputedStyle(section);
    //     const isVisible =
    //       computedStyle.display !== "none" &&
    //       computedStyle.opacity !== "0" &&
    //       computedStyle.visibility !== "hidden";

    //     if (isVisible) {
    //       console.log("Attivata", section);
    //       window.addEventListener("wheel", handleScroll, { passive: false });
    //       window.addEventListener("touchmove", handleScroll, { passive: false });
    //     } else if (!isVisible) {
    //       console.log("Disattivata", section);
    //       window.removeEventListener("wheel", handleScroll);
    //       window.removeEventListener("touchmove", handleScroll);
    //     }
    //   });

    //   observer.observe(section, {
    //     attributes: true,
    //     attributeFilter: ["style", "class"],
    //   });
    // });

    let isCoolingDown = false;
    const COOL_DOWN_TIME = 800; // ms

    function handleScroll(event) {
      // Se siamo in fase di "cooldown", ignoriamo tutti gli eventi successivi
      if (isCoolingDown) return;

      if (event.deltaY > 0) {
        //nextStep();
        sectionsTL.play();
      } else if (event.deltaY < 0) {
        //prevStep();
        sectionsTL.reverse();
      }

      // Attiviamo la "finestra" di cooldown
      isCoolingDown = true;
      setTimeout(() => {
        isCoolingDown = false;
      }, COOL_DOWN_TIME);
    }

    // function handleScroll(event) {
    //   if (event.deltaY > 0) {
    //     //nextStep();
    //     console.log("DELTA-Y >0: ", event.deltaY);
    //     //sectionsTL.tweenTo("modules_section", {});
    //     sectionsTL.play();
    //   } else if (event.deltaY < 0) {
    //     //prevStep();
    //     console.log("DELTA-Y <0: ", event.deltaY);
    //     sectionsTL.reverse();
    //   }
    // }
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleScroll, { passive: false });

    const sectionsTL = $gsap.timeline({ paused: true });

    sectionsTL.to("#hero-section", {
      autoAlpha: 0,
      duration: 1,
      zIndex: "0",
    });
    sectionsTL.to(
      "#ghirlanda-element_start",
      {
        opacity: 0,
        zIndex: "0",
        duration: 0.5,
      },
      "<"
    );
    sectionsTL.to(
      "#modules-section",
      {
        autoAlpha: 1,
        duration: 0.5,
        zIndex: "999999999",
      },

      "<"
    );
    sectionsTL.addLabel("modules_section");
    sectionsTL.addPause();
    sectionsTL.to("#modules-section", {
      autoAlpha: 0,
      duration: 0.5,
      zIndex: "0",
    });
    sectionsTL.to(
      "#phases-section",
      {
        autoAlpha: 1,
        duration: 0.5,
        zIndex: "999999999",
      },
      "<"
    );
    sectionsTL.addLabel("phases_section");
    sectionsTL.addPause();

    //!SECTION

    // const sections = document.querySelectorAll(".section_fixed");

    // if (!sections.length) {
    //   console.error("Nessuna sezione trovata.");
    //   return;
    // }

    // //SECTION - Richiamo Composables e le varie esposte
    // //richiamo del composable useGsapModules che contiene tutta la timeline di modules
    // //qui richiamerò anche il composables di Phase (da implementare ancora)

    // //composables di Modules
    // const { modules_tl, getScrollTrigger, setOnEnter, setOnComplete } = useGsapModules();
    // const scrollTrigger = getScrollTrigger();
    // scrollTrigger.disable();

    // //!SECTION

    // //creo la funzione updateTriger per aggiornarla con un listner sul resize
    // const updateTriggers = () => {
    //   let allScrollHeight = 0;
    //   let scrollTriggerHeights = [];
    //   // Loop per creare transizioni tra sezioni
    //   sections.forEach((section, index) => {
    //     const viewportHeight = section.offsetHeight;
    //     //calcolo l'altezza della section per gestire i markers di gsap
    //     let scrollHeight = ref(null);
    //     let start_S = 0;
    //     let end_S = 0;
    //     let sectionHeight0 = section.offsetHeight + 70;
    //     let sectionHeight1 = scrollTrigger.end + 70;
    //     let sectionHeight2 = section.offsetHeight + 70; //PhasesRef.value.phasesTL.scrollTrigger.end + 70;

    //     if (index === 0) {
    //       scrollHeight = sectionHeight0;
    //       start_S = 0;
    //       end_S = sectionHeight0;
    //       console.log("test0", scrollHeight);
    //     }
    //     if (index === 1) {
    //       scrollHeight = sectionHeight1;
    //       start_S = sectionHeight0;
    //       end_S = sectionHeight0 + sectionHeight1;
    //       console.log("test1", scrollHeight);
    //     }
    //     if (index === 2) {
    //       scrollHeight = sectionHeight2;
    //       start_S = sectionHeight0 + sectionHeight1;
    //       end_S = sectionHeight0 + sectionHeight1 + sectionHeight2;
    //       console.log("test2", scrollHeight);
    //     }

    //     allScrollHeight += scrollHeight;
    //     scrollTriggerHeights.push(scrollHeight);

    //     // console.log("SecrollHeight", scrollHeight);
    //     console.log("allScrollHeight", allScrollHeight);
    //     // console.log("scrollTriggerHeights", scrollTriggerHeights);
    //     console.log("test Calcolo Start", start_S);
    //     console.log("test Calcolo End", end_S);

    //     //rendo dinamica l'altezza di #sectionsWrapper usando js per creare la variabile css dell'altezza in base a quante sezioni ci sono, per evitare errori o dimenticanze scrivendolo a mano
    //     // questa variabile la userò nel css
    //     document.documentElement.style.setProperty(
    //       "--total-height",
    //       `${allScrollHeight}px`
    //     );

    //     let mainScrollTrigger = ScrollTrigger.create({
    //       markers: true,
    //       //pin: true,
    //       trigger: "#sectionsWrapper", // Trigger sull'intero contenitore
    //       //trigger: section, // Trigger sull'intero contenitore

    //       start: `${start_S}px center`, // Inizio della sezione
    //       end: `${end_S}px center`, // fine della sezione
    //       //invalidateOnRefresh: true,

    //       onEnter: () => {
    //         $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
    //         if (index === 1) {
    //           scrollTrigger.enable();

    //           // $gsap.to(window, {
    //           //   scrollTo: scrollTrigger.labelToScroll("ghirlande"),
    //           //   ease: "power2.inOut",
    //           //   duration: 3,
    //           //   onStart: () => {
    //           //     console.log("scrollTo start", scrollTrigger.labelToScroll("ghirlande"));
    //           //   },
    //           //   onComplete: () => {
    //           //     console.log(
    //           //       "scrollTo complete",
    //           //       scrollTrigger.labelToScroll("ghirlande")
    //           //     );
    //           //   },
    //           // });
    //         }
    //         if (index === 2) {
    //           PhasesRef.value.rotationTL.play();
    //           //PhasesRef.value.phasesTL.scrollTrigger.enable();
    //           console.log("play", PhasesRef.value.rotationTL);
    //           //console.log("enable", PhasesRef.value.phasesTL.scrollTrigger.enabled);
    //         }
    //         // if (index === 2) {
    //         //   if (!PhasesRef.value.isPlaying) {
    //         //     // Controllo per evitare ripetizioni
    //         //     PhasesRef.value.isPlaying = true; // Stato interno per evitare richiami multipli
    //         //     PhasesRef.value.rotationTL.play();
    //         //     PhasesRef.value.phasesTL.scrollTrigger.enable();
    //         //     console.log("phasesTL_SC_enter", PhasesRef.value.phasesTL.scrollTrigger);

    //         //     // Controlla lo stato dell'osservatore dopo averlo abilitato
    //         //     console.log("play", PhasesRef.value.rotationTL);
    //         //   }

    //         //   // Esegui un debounce per sicurezza
    //         //   setTimeout(() => {
    //         //     PhasesRef.value.isPlaying = false; // Reimposta lo stato dopo un breve ritardo
    //         //   }, 500); // Regola il tempo secondo necessità
    //         // }
    //       },
    //       onLeave: () => {
    //         $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
    //         $gsap.to("#ghirlanda-element_start", {
    //           opacity: 0,
    //           zIndex: "0",
    //           duration: 0.5,
    //         });

    //         if (index === 1) {
    //           scrollTrigger.disable();
    //         }
    //         if (index === 2) {
    //           PhasesRef.value.rotationTL.pause();
    //           // PhasesRef.value.phasesTL.scrollTrigger.disable();
    //           //console.log("enable", PhasesRef.value.phasesTL.scrollTrigger.enabled);
    //           //PhasesRef.value.intentObserver.disable();
    //         }
    //       },
    //       onEnterBack: () => {
    //         $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
    //         if (index === 0) {
    //           $gsap.to("#ghirlanda-element_start", {
    //             opacity: 0.6,
    //             zIndex: "999999999",
    //             duration: 0.5,
    //           });
    //         }
    //         if (index === 1) {
    //           scrollTrigger.enable();
    //           ScrollTrigger.refresh();
    //         }
    //         if (index === 2) {
    //           PhasesRef.value.rotationTL.play();
    //           // PhasesRef.value.phasesTL.scrollTrigger.enable();
    //           //ScrollTrigger.refresh();
    //           console.log("play", PhasesRef.value.rotationTL);
    //           // console.log(
    //           //   "enable + refresh",
    //           //   PhasesRef.value.phasesTL.scrollTrigger.enabled
    //           // );
    //         }
    //         // if (index === 2) {
    //         //   if (!PhasesRef.value.isPlaying) {
    //         //     // Controllo per evitare ripetizioni
    //         //     PhasesRef.value.isPlaying = true; // Stato interno per evitare richiami multipli
    //         //     PhasesRef.value.rotationTL.play();
    //         //     PhasesRef.value.phasesTL.scrollTrigger.enable();
    //         //     ScrollTrigger.refresh();
    //         //     //PhasesRef.value.intentObserver.enable();

    //         //     // Controlla lo stato dell'osservatore dopo averlo abilitato
    //         //     console.log("play", PhasesRef.value.rotationTL);
    //         //     //console.log("observer enabled:", PhasesRef.value.intentObserver);
    //         //   }

    //         //   // Esegui un debounce per sicurezza
    //         //   setTimeout(() => {
    //         //     PhasesRef.value.isPlaying = false; // Reimposta lo stato dopo un breve ritardo
    //         //   }, 500); // Regola il tempo secondo necessità
    //         // }
    //       },
    //       onLeaveBack: () => {
    //         $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
    //         if (index === 1) {
    //           scrollTrigger.disable();
    //         }
    //         if (index === 2) {
    //           PhasesRef.value.rotationTL.pause();
    //           // PhasesRef.value.phasesTL.scrollTrigger.disable();
    //           // console.log("enable", PhasesRef.value.phasesTL.scrollTrigger.enabled);
    //         }
    //       },
    //     });
    //   });
    //   ScrollTrigger.refresh();
    // };

    // // Inizializza i trigger
    // updateTriggers();

    // // Listener per il resize
    // window.addEventListener("resize", updateTriggers);

    // // Rimuovi il listener quando il componente viene smontato
    // onBeforeUnmount(() => {
    //   window.removeEventListener("resize", updateTriggers);
    // });

    // Imposta la prima sezione visibile all'inizio
  }); //NOTE - chiusura Next Tick
});
</script>

<style lang="scss">
@use "@/assets/css/_globals.scss" as *;

#sectionsWrapper {
  width: 100vw;
  max-width: 1200px;
  height: calc(100vh - 70px);
  //height: var(--total-height);
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
