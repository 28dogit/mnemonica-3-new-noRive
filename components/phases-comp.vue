<template>
  <div id="phases-element" class="element">
    <PreSvg id="Pre_svg" class="phaseCircle"></PreSvg>
    <ProductionSvg id="Production_svg" class="phaseCircle"></ProductionSvg>
    <PostSvg id="Post_svg" class="phaseCircle"></PostSvg>
    <MarketSvg id="Market_svg" class="phaseCircle"></MarketSvg>
    <div id="phasesTitle" class="title">
      <h2>All Phases</h2>
    </div>
  </div>
  <div id="phases-content-wrapper" class="wrapper">
    <div id="phases-content" class="content">
      <PhasesChips2></PhasesChips2>
    </div>
  </div>
</template>

<script setup>
//le altre importazioni derivano dalla pagina principale
import { nextTick } from "vue";
//import { ScrollTrigger } from "gsap/ScrollTrigger";
import { _opacity } from "#tailwind-config/theme";
import { _bottom } from "#tailwind-config/theme/backgroundPosition";
import { PhasesChips2 } from "#components";

//definisco le costanti da esporre con defineExpose, che userò all'interno di onMounted utilizzando .value
// utilizzo shallowRef per non covertire le proprietà interne di Gsap in oggetti reattivi di vue
const rotationTL = shallowRef(null);
const phasesTL = shallowRef(null);
//const intentObserver = shallowRef(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  nextTick(() => {
    let currentIndex = 0;
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

    //SECTION - sezione animazione delle chips delle fasi
    phasesTL.value = $gsap.timeline({
      paused: true,
      // scrollTrigger: {
      //   trigger: "#chips-wrapper",
      //   start: "top center", //devo allinearmi al fire dello scrollTrigger principale "center"
      //   end: "+=6000px",
      //   scrub: true,
      //   //markers: true,
      //   snap: {
      //     snapTo: "labels", // snap to one of the labels, or use a function
      //     duration: { min: 0.2, max: 0.5 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      //   },
      // },
    });

    phasesChipsTitle.forEach((ChipTitle, i) => {
      // Nasconde il chip precedente prima di mostrare il nuovo
      if (i > 0) {
        phasesTL.value.to(phasesChipsTitle[i - 1], {
          autoAlpha: 0,
          duration: 0.3,
        });

        phasesTL.value.to(
          phasesChipsContainer[i - 1],
          {
            autoAlpha: 0,
            duration: 0.3,
          },
          "<"
        );
      }

      // Mostra il nuovo titolo
      phasesTL.value.fromTo(
        ChipTitle,
        { y: -10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3 }
      );

      // Mostra il nuovo contenitore di chips
      phasesTL.value.fromTo(
        phasesChipsContainer[i],
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.3 },
        "<"
      );

      phasesTL.value.addLabel(`label_end${i}`);
    });

    //!SECTION

    //SECTION - gestione animazione a steps
    let currentStep = 0;
    //const totalSteps = phasesTL.value.getChildren().length;
    const totalSteps = phasesChipsTitle.length; // Numero totale di step
    console.log("Step Totali delle fasi (durata della timeline)", totalSteps);
    let isAnimating = false;
    let animationActive = false;
    let scrollTimeout = null; //timeout per debounce

    // function nextStep() {
    //   if (isAnimating) return; // Evita che lo scroll eccessivo faccia saltare più step
    //   isAnimating = true;

    //   if (currentStep < totalSteps) {
    //     currentStep++;
    //     phasesTL.value.tweenTo(currentStep, {
    //       onComplete: () => (isAnimating = false), // Sblocca l'animazione dopo la fine
    //     });
    //   }
    // }

    // function prevStep() {
    //   if (isAnimating) return;
    //   isAnimating = true;

    //   if (currentStep > 0) {
    //     currentStep--;
    //     phasesTL.value.tweenTo(currentStep, {
    //       onComplete: () => (isAnimating = false),
    //     });
    //   }
    // }

    // // Gestione dello scroll su mouse e touch
    // function handleScroll(event) {
    //   event.preventDefault(); // Evita lo scroll normale della pagina
    //   if (event.deltaY > 0) {
    //     nextStep(); // Scroll giù -> Avanza
    //   } else if (event.deltaY < 0) {
    //     prevStep(); // Scroll su -> Torna indietro
    //   }
    // }

    // // Eventi per desktop e mobile
    // window.addEventListener("wheel", handleScroll, { passive: false });
    // window.addEventListener("touchmove", handleScroll, { passive: false });

    //---------
    function nextStep() {
      if (!animationActive || isAnimating || currentStep >= totalSteps - 1) return;
      isAnimating = true;
      currentStep++;
      console.log(`Avanzamento Step: ${currentStep}/${totalSteps - 1}`);
      phasesTL.value.tweenTo(`label_end${currentStep}`, {
        onComplete: () => (isAnimating = false),
      });
    }

    function prevStep() {
      if (!animationActive || isAnimating || currentStep <= 0) return;
      isAnimating = true;
      currentStep--;
      console.log(`Tornando allo Step: ${currentStep}/${totalSteps - 1}`);
      phasesTL.value.tweenTo(`label_end${currentStep}`, {
        onComplete: () => (isAnimating = false),
      });
    }

    function handleScroll(event) {
      if (!animationActive) return;
      event.preventDefault();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0) {
          nextStep();
        } else if (event.deltaY < 0) {
          prevStep();
        }
      }, 60); // Attendi 100ms prima di accettare un altro scroll
    }

    // function handleScroll(event) {
    //   if (!animationActive || isAnimating) return;
    //   console.log("DELTA-Y: ", event.deltaY);
    //   event.preventDefault();

    //   // **Debounce per evitare doppie chiamate**
    //   // clearTimeout(scrollTimeout);
    //   // scrollTimeout = setTimeout(() => {
    //   if (event.deltaY > 10) {
    //     // Normalizza il delta per evitare più avanzamenti
    //     nextStep();
    //   } else if (event.deltaY < -10) {
    //     prevStep();
    //   }
    //   // }, 50); // Attendi 50ms prima di accettare un altro scroll
    // }

    // **Osservatore per rilevare la visibilità della sezione**
    const targetElement = document.querySelector("#phases-section");

    const observer = new MutationObserver(() => {
      const computedStyle = window.getComputedStyle(targetElement);
      const isVisible =
        computedStyle.display !== "none" &&
        computedStyle.opacity !== "0" &&
        computedStyle.visibility !== "hidden";

      if (isVisible && !animationActive) {
        animationActive = true;
        console.log("Attivata animazione");
        window.addEventListener("wheel", handleScroll, { passive: false });
        window.addEventListener("touchmove", handleScroll, { passive: false });
      } else if (!isVisible && animationActive) {
        animationActive = false;
        console.log("Disattivata animazione");
        window.removeEventListener("wheel", handleScroll);
        window.removeEventListener("touchmove", handleScroll);
      }
    });

    observer.observe(targetElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    //!SECTION

    // const containers = [
    //   "#pre-chips-container",
    //   "#production-chips-container",
    //   "#post-chips-container",
    //   "#market-chips-container",
    // ]; // creo un array con i container delle chips delle fasi
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted

defineExpose({ rotationTL, phasesTL });
</script>

<style scoped></style>
