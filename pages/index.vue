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
  const { $gsap } = useNuxtApp();
  nextTick(() => {
    $gsap.set("#hero-section", { opacity: 1, zIndex: 1 });
    $gsap.set(".ghirlanda-updx, .ghirlanda-dwsx ", { opacity: 0 });

    // Variabile che indica se l'animazione intro è completata
    let introCompleted = false;
    let isfixedSection = true;

    //SECTION - animazioni interne
    // implemento la timeline intro che sbloccherà alla fine l'overflow hidden del body per ripristinare lo scroll
    const intro = $gsap.timeline({
      onComplete: () => {
        introCompleted = true;
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

    //!SECTION

    //SECTION - Gestione animazione Timeline allo scroll

    // array di tutte le sezioni
    const sections = document.querySelectorAll(".section_fixed");
    if (!sections.length) {
      console.error("Nessuna sezione trovata.");
      return;
    }

    let isCoolingDown = false;
    const COOL_DOWN_TIME = 1600; // ms

    function handleScroll(event) {
      if (!isfixedSection) return;
      // Se la timeline intro non è ancora terminata, ignoro completamente lo scroll
      if (!introCompleted) {
        event.preventDefault();
        return;
      }
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

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchmove", handleScroll, { passive: false });

    //NOTE - recupero la rotationTL esposta dal componente phases_comp
    const RotationTL = PhasesRef.value.rotationTL;

    //NOTE - recupero la phasesTL esposta dal componente phases_comp
    const PhasesTL = PhasesRef.value.phasesTL;

    $gsap.set("#hero-section", { zIndex: 1 });
    $gsap.set("#modules-section", { zIndex: 0 });
    $gsap.set("#phases-section", { zIndex: 0 });
    //$gsap.set("#pre-chips-container .title", { autoAlpha: 0 });
    $gsap.set("#post-chips-container .title", { opacity: 0 });
    $gsap.set("#production-chips-container .title", { opacity: 0 });
    $gsap.set("#market-chips-container .title", { opacity: 0 });
    $gsap.set("#post-chips-container .chipsContainer", { opacity: 0 });
    $gsap.set("#production-chips-container .chipsContainer", { opacity: 0 });
    $gsap.set("#market-chips-container .chipsContainer", { opacity: 0 });

    const sectionsTL = $gsap.timeline({
      paused: true,
      defaults: {
        ease: "power4.out",
      },
      onComplete: () => {
        setTimeout(() => {
          $gsap.set("body", { overflow: "auto" });
          // Simula un piccolo scroll per attivare ScrollTrigger
          window.scrollBy({ top: 2, behavior: "instant" });
        }, 100);
      },
      onReverseCompleted: () => {},
    });

    sectionsTL.to("#hero-section", {
      autoAlpha: 0,
      duration: 1,
      zIndex: 0,
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
      ".ghirlanda-updx, .ghirlanda-dwsx ",
      {
        autoAlpha: 1,
        filter: "blur(0px)",
      },
      "<"
    );
    sectionsTL.to(
      "#modules-section",
      {
        autoAlpha: 1,
        duration: 0.5,
        zIndex: 1,
      },
      "<0.3"
    );
    sectionsTL.to("#Modules_3a #Rooms path", { fill: "#CEF372" }, "<");
    sectionsTL.to("#modules-content #module-txt_1", { opacity: 1, zIndex: 1 }, "<");
    // sectionsTL.set("#modules-content #module-txt_2", { zIndex: 0 });

    sectionsTL.addLabel("modules_section");
    // pausa entrata modules
    sectionsTL.addPause();
    //-----

    sectionsTL.to("#modules_svg", { rotate: "+=120", ease: "back.out" });
    sectionsTL.to("#Modules_3a #Rooms path", { fill: "#B8EFFA" }, "<");
    sectionsTL.to("#Modules_3a #Boxes path", { fill: "#CEF372" }, "<");
    sectionsTL.to("#modules-content #module-txt_1", { opacity: 0, zIndex: 0 }, "<");
    // sectionsTL.set("#modules-content #module-txt_1", { zIndex: 0 }, "<");
    sectionsTL.to("#modules-content #module-txt_2", { opacity: 1, zIndex: 1 }, "<");
    // sectionsTL.set("#modules-content #module-txt_2", { zIndex: 110 }, "<");

    sectionsTL.addPause();

    sectionsTL.to("#modules_svg", { rotate: "+=120", ease: "back.out" });
    sectionsTL.to("#Modules_3a #Boxes path", { fill: "#B8EFFA" }, "<");
    sectionsTL.to("#Modules_3a #Masters path", { fill: "#CEF372" }, "<");
    sectionsTL.to("#modules-content #module-txt_2", { opacity: 0, zIndex: 0 }, "<");
    // sectionsTL.to("#modules-content #module-txt_2", { opacity: 0 }, "<");
    sectionsTL.to("#modules-content #module-txt_3", { opacity: 1, zIndex: 1 }, "<");
    // sectionsTL.to("#modules-content #module-txt_3", { opacity: 1 }, "<");

    sectionsTL.addPause();

    //------
    // sectionsTL.call(() => PhasesRef.value.rotationTL.pause());
    sectionsTL.call(() => RotationTL.pause());

    sectionsTL.to("#modules_svg", { rotate: "+=120" });
    //sectionsTL.call(() => PhasesRef.value.rotationTL.play(), [], "<+=0.2");
    sectionsTL.call(() => RotationTL.play(), [], "<+=0.2");
    sectionsTL.to(
      "#modules-section",
      {
        autoAlpha: 0,
        duration: 0.5,
        zIndex: 0,
      },
      "<"
    );
    sectionsTL.to(
      "#phases-section",
      {
        autoAlpha: 1,
        duration: 0.5,
        zIndex: 1,
      },
      "<"
    );

    sectionsTL.addLabel("phases_section");
    sectionsTL.addPause();

    sectionsTL.fromTo(
      "#pre-chips-container .title",
      { y: 0, autoAlpha: 1 },
      { y: -10, autoAlpha: 0, duration: 0.3 }
    );
    sectionsTL.fromTo(
      "#pre-chips-container .chipsContainer",
      { y: 0, autoAlpha: 1 },
      { y: 10, autoAlpha: 0, duration: 0.3 },
      "<"
    );
    sectionsTL.fromTo(
      "#production-chips-container .title",
      { y: -10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3 },
      "<"
    );
    sectionsTL.fromTo(
      "#production-chips-container .chipsContainer",
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3 },
      "<"
    );

    sectionsTL.addLabel("phases_section2");
    sectionsTL.addPause();

    sectionsTL.fromTo(
      "#production-chips-container .title",
      { y: 0, autoAlpha: 1 },
      { y: -10, autoAlpha: 0, duration: 0.3 }
    );
    sectionsTL.fromTo(
      "#production-chips-container .chipsContainer",
      { y: 0, autoAlpha: 1 },
      { y: 10, autoAlpha: 0, duration: 0.3 },
      "<"
    );
    sectionsTL.fromTo(
      "#post-chips-container .title",
      { y: -10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3 },
      "<"
    );
    sectionsTL.fromTo(
      "#post-chips-container .chipsContainer",
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3 },
      "<"
    );
    sectionsTL.addLabel("phases_section3");
    // sectionsTL.to(
    //   "#phases-section",
    //   {
    //     autoAlpha: 0,
    //     duration: 0.5,
    //     zIndex: 0,
    //   },
    //   "<"
    // );
    sectionsTL.addPause();

    // sectionsTL.fromTo(
    //   "#post-chips-container .title",
    //   { y: 0, autoAlpha: 1 },
    //   { y: -10, autoAlpha: 0, duration: 0.3 }
    // );
    // sectionsTL.fromTo(
    //   "#post-chips-container .chipsContainer",
    //   { y: 0, autoAlpha: 1 },
    //   { y: 10, autoAlpha: 0, duration: 0.3 },
    //   "<"
    // );
    // sectionsTL.fromTo(
    //   "#market-chips-container .title",
    //   { y: -10, autoAlpha: 0 },
    //   { y: 0, autoAlpha: 1, duration: 0.3 },
    //   "<"
    // );
    // sectionsTL.fromTo(
    //   "#market-chips-container .chipsContainer",
    //   { y: 10, autoAlpha: 0 },
    //   { y: 0, autoAlpha: 1, duration: 0.3 },
    //   "<"
    // );
    // sectionsTL.addPause();

    //ANCHOR - Scrolltrigger per gestire la sezione "nofixed"

    const noFixedST = ScrollTrigger.create({
      trigger: ".nofixed_section",
      start: "top bottom",
      end: "bottom bottom",
      markers: true,
      onEnter: () => {
        isfixedSection = false;
      },
      onLeaveBack: () => {
        $gsap.set("body", { overflow: "hidden" });
        isfixedSection = true;
      },
    });
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
  position: relative;
}
</style>
