<template>
  <main>
    <div id="sectionsWrapper" class="z-20">
      <div id="hero-section" class="section_fixed hero">
        <div class="element">
          <div id="ghirlanda-element" class="element"></div>
          <canvas
            ref="canvasRefLogo"
            id="canvasLogo"
            style="position: absolute; height: 100px; z-index: 5"
          ></canvas>
          <!-- <a href="#" class="z-10" @click="playFast">tl_test</a> -->
          <canvas
            ref="canvasRef"
            id="canvas"
            style="
              margin-top: 80px;
              position: absolute;
              width: 100%;
              max-width: 960px;
              height: 50vh;
              z-index: 5;
            "
          ></canvas>
        </div>
        <slot name="screentitle"></slot>
        <div id="hero-content-wrapper" class="wrapper">
          <div id="hero-content" class="content hero">
            <!-- <div id="heroTitle" class="flex items-center justify-center flex-wrap">
            </div> -->
            <div class="headline">
              <h2 id="heroSubTitle" class="hidden min-[680px]:block text-center">
                Let your media assets flourish and last in the digital cinema ecosystem
              </h2>
              <h2 id="heroSubTitle" class="text-center min-[680px]:hidden">
                Let your media assets flourish<br />
                and last in the digital cinema ecosystem
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div id="phases-section" class="section_fixed phases">
        <HSectionsPhasesComponent ref="PhasesRef"></HSectionsPhasesComponent>
        <!-- <HSectionsTest ref="TestRef"></HSectionsTest> -->
      </div>
      <div id="modules-section" class="section_fixed modules">
        <HSectionsModulesComponent></HSectionsModulesComponent>
      </div>
    </div>
    <div class="nofixed_section w-[100vw] h-[1600px] z-30">
      <div class="preMade"></div>
      <div id="made-for" class="max-w-[1200px]">
        <HSectionsMadeFor></HSectionsMadeFor>
      </div>
      <div id="production" class="max-w-[1200px]">
        <HSectionsProduction></HSectionsProduction>
      </div>
      <div id="production-ui" class="max-w-[1200px]">
        <HSectionsProductionUi></HSectionsProductionUi>
      </div>
      <div id="archive" class="max-w-[1200px]">
        <HSectionsArchive></HSectionsArchive>
      </div>
      <div id="archive-ui" class="max-w-[1200px]">
        <HSectionsArchiveUi></HSectionsArchiveUi>
      </div>
      <div id="about-us" class="max-w-[1200px]">
        <HSectionsAboutUs></HSectionsAboutUs>
      </div>
      <div id="contacts" class="max-w-[1200px]">
        <HSectionsContacts></HSectionsContacts>
      </div>
    </div>
  </main>
</template>

<script setup>
// const { data: contentModulesComponent } = await useAsyncData(() =>
//   queryCollection("content").path("/modules-content").first()
// );
// const { data: contentPhasesComponent } = await useAsyncData(() =>
//   queryCollection("content").path("/phases-content").first()
// );
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rive, Fit, Alignment, Layout } from "@rive-app/canvas";
import { HSectionsArchive } from "#components";

const PhasesRef = ref(null);
const canvasRef = ref(null);
const canvasRefLogo = ref(null);
const canvasRefBtn = ref(null);
const noFixedSTRef = ref(null);
const handleScrollRef = ref(null);

// Usiamo il composable per lo stato Fixed Section
const { isfixedSection, setFixedSection } = useFixedSection();

// Variabile per memorizzare il buffer del file .riv
let rivBuffer = null;

// Funzione per caricare il file .riv una sola volta
async function loadRivFile(url) {
  const response = await fetch(url);
  return await response.arrayBuffer();
}

function handleClick(event) {
  event.preventDefault();
  alert("Pulsante cliccato!");
}
const introRef = ref(null);
function playFast() {
  // Imposta la velocità a 2x
  introRef.value.timeScale(2);

  // Rimuovi tutte le pause e riproduci la timeline fino alla fine
  introRef.value.play();
}

onMounted(() => {
  const { $gsap } = useNuxtApp();

  // blocca lo scroll on mount (solo per index)
  document.body.style.overflow = "hidden";

  nextTick(async () => {
    //SECTION - RIVE
    // Carica il file .riv una sola volta
    rivBuffer = await loadRivFile("/assets/rive/hero_mne_divided.riv");

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
      layout: new Layout({
        fit: Fit.Layout, // Adatta senza distorsione
        alignment: Alignment.Center, // Centra l'animazione
        resizeMode: "auto",
      }),
      onLoad: () => {
        rTitle.resizeDrawingSurfaceToCanvas();
      },
    });

    function aggiornaResize(elemento) {
      // Aggiorna gli attributi width e height del canvas in base alle dimensioni attuali
      // canvasRef.value.width = canvasRef.value.offsetWidth;
      // canvasRef.value.height = canvasRef.value.offsetHeight;

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

    $gsap.set("#hero-section", { opacity: 1, zIndex: 1 });
    $gsap.set(".ghirlanda-updx, .ghirlanda-dwsx ", { opacity: 0 });

    // Variabile che indica se l'animazione intro è completata
    let introCompleted = false;
    //let isfixedSection = true; non serve più perchè sostituita dal composable

    //SECTION - animazioni interne
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
      1
    );

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

    // Variabili per tracciare il tocco
    let touchStartY = 0;
    let touchEndY = 0;

    function handleScroll(event) {
      const { isScrollLocked } = useScrollLock();
      // Se lo scroll è bloccato (modale aperto), ignora l'evento
      if (isScrollLocked.value) return;

      if (!isfixedSection.value) return; //.value perchè uso il composable
      // Se la timeline intro non è ancora terminata, ignoro completamente lo scroll
      if (!introCompleted) {
        event.preventDefault();
        return;
      }
      // Se siamo in fase di "cooldown", ignoriamo tutti gli eventi successivi
      if (isCoolingDown) return;

      let deltaY = 0;
      //SECTION - ottimizazione touch mobile
      // Determina il tipo di evento
      if (event.type === "wheel") {
        deltaY = event.deltaY;
      } else if (event.type === "pointerdown") {
        touchStartY = event.clientY;
      } else if (event.type === "pointermove") {
        touchEndY = event.clientY;
      } else if (event.type === "pointerup") {
        deltaY = touchStartY - touchEndY;
      }

      // Soglia minima per evitare input accidentali su mobile
      // if (Math.abs(deltaY) > 30) {
      //   if (deltaY > 0) {
      //     sectionsTL.play(); // Scroll down
      //   } else {
      //     sectionsTL.reverse(); // Scroll up
      //   }
      // }
      //!SECTION

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

    //registro handleScrol nella ref handleScrollRef dichiarata all'inizio fuori dal nextTick per l'onBeforeUnmount
    handleScrollRef.value = handleScroll;

    window.addEventListener("wheel", handleScroll, { passive: false });
    //window.addEventListener("touchmove", handleScroll, { passive: false });
    window.addEventListener("pointerdown", handleScroll, { passive: false });
    window.addEventListener("pointermove", handleScroll, { passive: false });
    window.addEventListener("pointerup", handleScroll, { passive: false });

    //NOTE - recupero la rotationTL esposta dal componente phases_comp
    const RotationTL = PhasesRef.value?.rotationTL;
    const RotationTL_Titles = PhasesRef.value?.rotationTL_Titles;

    //NOTE - recupero la phasesTL esposta dal componente phases_comp
    const PhasesTL = PhasesRef.value?.phasesTL;

    $gsap.set("#hero-section", { zIndex: 1 });
    $gsap.set("#modules-section", { zIndex: 0 });
    $gsap.set("#phases-section", { zIndex: 0 });
    //$gsap.set("#pre-chips-container .title", { autoAlpha: 0 });
    $gsap.set("#post-chips-container .title", { opacity: 0, y: -10 });
    $gsap.set("#production-chips-container .title", { opacity: 0, y: -10 });
    $gsap.set("#market-chips-container .title", { opacity: 0, y: -10 });
    $gsap.set("#post-chips-container .chipsContainer", { opacity: 0, y: 10 });
    $gsap.set("#production-chips-container .chipsContainer", { opacity: 0, y: 10 });
    $gsap.set("#market-chips-container .chipsContainer", { opacity: 0, y: 10 });

    const sectionsTL = $gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.out",
      },
      onComplete: () => {
        setTimeout(() => {
          $gsap.set("body", { overflow: "auto" });
          console.log("completata sectionsTL");
          // Simula un piccolo scroll per attivare ScrollTrigger
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        }, 100);
      },
      onReverseCompleted: () => {},
    });

    //ANCHOR - Hero Section Start
    sectionsTL.call(
      () => {
        rLogo.play("Logo intro");
      },
      null,
      "-=1"
    );
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
    //ANCHOR - Hero end

    //ANCHOR - Phases Section Start
    // sectionsTL.call(() => PhasesRef.value.rotationTL.pause());
    sectionsTL.call(() => RotationTL.pause());
    sectionsTL.call(() => RotationTL_Titles.pause());

    sectionsTL.to("#modules_svg", { rotate: "+=60", ease: "power1.in" });
    //sectionsTL.call(() => PhasesRef.value.rotationTL.play(), [], "<+=0.2");
    sectionsTL.call(() => RotationTL.play(), [], "<+=0.2");
    sectionsTL.call(() => RotationTL_Titles.play(), [], "<+=0.2");
    sectionsTL.to(
      "#hero-section",
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
        duration: 0.8,
        zIndex: 1,
      },
      "<+=0.2"
    );
    sectionsTL.to(".ghirlanda-updx, .ghirlanda-dwsx ", {
      autoAlpha: 0.6,
      filter: "blur(0px)",
    });

    sectionsTL.addLabel("phases_section");
    sectionsTL.addPause();

    //ANCHOR - Phases Section End

    //ANCHOR - Modules Section Start
    sectionsTL.to("#phases-section", {
      autoAlpha: 0,
      duration: 0.5,
      zIndex: 0,
    });
    sectionsTL.to(
      "#modules-section",
      {
        autoAlpha: 1,
        duration: 0.8,
        zIndex: 1,
      },
      "<"
    );
    sectionsTL.call(() => RotationTL.play());
    sectionsTL.call(() => RotationTL_Titles.play());
    sectionsTL.call(() => RotationTL.pause());
    sectionsTL.call(() => RotationTL_Titles.pause());

    sectionsTL.to(
      "#modules-section",
      {
        autoAlpha: 1,
        duration: 0.5,
        zIndex: 1,
      },
      "<0.3"
    );
    sectionsTL.to("#Modules_4 #Screen path", { fill: "#CEF372" }, "<");
    sectionsTL.from("#modules_svg", { rotate: "-=60", ease: "power1.out" }, "<");
    sectionsTL.to("#modules-content #module-txt_1", { opacity: 1, zIndex: 1 }, "<");
    // sectionsTL.set("#modules-content #module-txt_2", { zIndex: 0 });

    sectionsTL.addLabel("modules_section");
    // pausa entrata modules
    sectionsTL.addPause();
    //-----

    sectionsTL.to("#modules_svg", { rotate: "+=120", ease: "back.out" });
    sectionsTL.to("#Modules_4 #Screen path", { fill: "#B8EFFA" }, "<");
    sectionsTL.to("#Modules_4 #Deliver path", { fill: "#CEF372" }, "<");
    sectionsTL.to("#modules-content #module-txt_1", { opacity: 0, zIndex: 0 }, "<");
    // sectionsTL.set("#modules-content #module-txt_1", { zIndex: 0 }, "<");
    sectionsTL.to("#modules-content #module-txt_2", { opacity: 1, zIndex: 1 }, "<");
    // sectionsTL.set("#modules-content #module-txt_2", { zIndex: 110 }, "<");

    sectionsTL.addPause();

    sectionsTL.to("#modules_svg", { rotate: "+=120", ease: "back.out" });
    sectionsTL.to("#Modules_4 #Deliver path", { fill: "#B8EFFA" }, "<");
    sectionsTL.to("#Modules_4 #Preserve path", { fill: "#CEF372" }, "<");
    sectionsTL.to("#modules-content #module-txt_2", { opacity: 0, zIndex: 0 }, "<");
    // sectionsTL.to("#modules-content #module-txt_2", { opacity: 0 }, "<");
    sectionsTL.to("#modules-content #module-txt_3", { opacity: 1, zIndex: 1 }, "<");
    // sectionsTL.to("#modules-content #module-txt_3", { opacity: 1 }, "<");

    sectionsTL.addPause();
    //ANCHOR - Modules Section End

    //ANCHOR - nofixed Section Start (modificare in base a quale sarà l'ultima sezione prima del nofixed)
    sectionsTL.to(
      "#modules-section",
      {
        autoAlpha: 0,
        duration: 1,
        zIndex: 0,
        delay: 0.5,
      },
      "<"
    );
    //sectionsTL.addPause();

    introRef.value = sectionsTL;

    //ANCHOR - Scrolltrigger per gestire la sezione "nofixed"

    const noFixedST = ScrollTrigger.create({
      trigger: ".nofixed_section",
      start: "top bottom",
      end: "bottom bottom",
      //markers: true,
      onEnter: () => {
        setFixedSection(false); //composable
      },
      onLeaveBack: () => {
        $gsap.set("body", { overflow: "hidden" });
        // console.log("intervento sullo scroll!!!!");
        setFixedSection(true);
      },
    });
    // Registriamo  l'istanza dello scrolltrigger nella ref noFixedSTRef dichiarata all'inizio fuori dal nextTick
    noFixedSTRef.value = noFixedST;
  }); //NOTE - chiusura Next Tick
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
      window.removeEventListener("pointerdown", handleScrollRef.value, {
        passive: false,
      });
      window.removeEventListener("pointermove", handleScrollRef.value, {
        passive: false,
      });
      window.removeEventListener("pointerup", handleScrollRef.value, { passive: false });
    }
  });
});
</script>

<style lang="scss">
//@use "@/assets/css/_globals.scss" as *;
</style>
