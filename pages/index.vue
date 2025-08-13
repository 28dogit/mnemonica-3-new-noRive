<template>
  <!-- <UButton class="z-90 fixed top-25" @click="testGsap()">provA</UButton> -->
  <main>
    <MneNavSteps @menuAction="handleMenuAction" class="hidden-tablet-down" />
    <MneNavStepsMobile @menuAction="handleMenuAction" class="hidden-tablet-up" />
    <!-- <div id="sectionsWrapper" class="z-20">
      <div id="hero-section" class="section_fixed hero">
        <div id="hero-element" class="element">
          <div id="ghirlanda-element" class="circular"></div>
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
      <div id="phases-section" class="section_fixed phases">
        <HSectionsPhasesComponent ref="PhasesRef" @menuAction="handleMenuAction"></HSectionsPhasesComponent>
      </div>
      <div id="modules-section" class="section_fixed modules">
        <HSectionsModulesComponent></HSectionsModulesComponent>
      </div>
    </div> -->
    <div class="nofixed_section w-[100vw] z-30">
      <ParallaxSection>
        <template #background>
          <!-- Vuoto, lo fa lo stile -->
        </template>
        <template #foreground>
          <h1>Benvenuto nel Parallasse</h1>
        </template>
      </ParallaxSection>
      <div id="hero-section-2" class="hero nofixed-inner-wrapper">
        <div id="hero-element" class="element">
          <div id="ghirlanda-element" class="circular"></div>
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
      <div id="phases-section-2" class="phases nofixed-inner-wrapper">
        <HSectionsPhasesComponent ref="PhasesRef" @menuAction="handleMenuAction"></HSectionsPhasesComponent>
      </div>
      <div id="modules-section-2" class="modules nofixed-inner-wrapper">
        <HSectionsModulesComponent></HSectionsModulesComponent>
      </div>
      <!-- <div class="preMade"></div> -->
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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rive, Fit, Alignment, Layout } from "@rive-app/canvas";
import { HSectionsArchive } from "#components";
import { toRaw } from "vue"; //serve per gestire gli imput delle statemachine di RIVE

const PhasesRef = ref(null);
const canvasRefLogo = ref(null);
const canvasRef = ref(null);
const titleTrigger = ref(null);
const noFixedSTRef = ref(null);
const handleScrollRef = ref(null);
//costante in cui salvo sectionsTL per renderla disponibile in tutti i componenti
const sectionsTLRef = ref(null);
// Riferimento alla funzione per prevenire il rimbalzo in iOS
const preventIOSBounceRef = ref(null);
// Usiamo il composable per lo stato Fixed Section
const { isfixedSection, setFixedSection } = useFixedSection();

//SECTION - funzioni per scroll to non fixed sections
import { useNavStore } from "@/stores/navigationStore";

const navigationStore = useNavStore();

//NOTE - il composable useMNEfunctions serve per gestire le funzioni di scrollTo e customLogic tra le sezioni fixed e non fixed
// e anche l'evento menuAction emesso dai menu alternativi come nav-steps
const {
  checkNofixedSection,
  scrollToSection,
  customLogic,
  toFixedSections,
  handleMenuAction,
  resetNofixedSectionPosition,
} = useMNEfunctions(navigationStore, sectionsTLRef, isfixedSection, setFixedSection); // passo le refs necessarie

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

  // console.log("Monunt fixedsection:", isfixedSection.value);
  // console.log("Mount checkfixedsection:", checkNofixedSection());

  if (!checkNofixedSection()) {
    //document.body.style.overflow = "hidden";
    setFixedSection(true);
  } else {
    setFixedSection(false);
  }
  // blocca lo scroll on mount (solo per index)
  // document.body.style.overflow = "hidden";

  //SECTION - scroll to non fixed sections quando arrivo da una pagina esterna
  if (navigationStore.targetSection) {
    if (navigationStore.targetSection == "allInOne") {
      console.log("vieni da allInOne");
      toFixedSections("Start-modules-pause");
    } else {
      scrollToSection(navigationStore.targetSection);
      resetNofixedSectionPosition("da esterno");
    }

    // Resetta lo stato dopo averlo utilizzato
    // il reset lo sposto nell'onComplete di sectionsTL perchè mi serve averlo ancora attivo quando arrivo da pagine esterne, resetterò lo stato dopo averlo utilizzato
    //navigationStore.resetState();
  } else {
    console.log("Nessuna sezione di destinazione trovata.");
  }
  // aggiungo un watch per quando sono già nella home e controlo lo stato dello store
  watch(
    () => navigationStore.targetSection,
    (newSection) => {
      if (newSection) {
        console.log("-!-!- Nuova sezione di destinazione:", newSection);
        console.log("-!-!- Nuova store:", navigationStore.targetSection);
        if (newSection == "allInOne") {
          console.log("vieni da allInOne al watch");
          toFixedSections("Start-modules-pause");
        } else {
          scrollToSection(newSection);
          resetNofixedSectionPosition("da Watch");
        }
        // scrollToSection(newSection);
        // Resetta lo stato dopo averlo utilizzato, demando sempre il reset alla fine dell'animazione di gsap sectionsTL
        //navigationStore.resetState();
        //console.log("Resetto lo stato dello store dal watch");
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

    $gsap.set("#hero-section", { opacity: 1, zIndex: 1 });
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
      "#ghirlanda-element_start",
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

    // array di tutte le sezioni
    // const sections = document.querySelectorAll(".section_fixed");
    // if (!sections.length) {
    //   console.error("Nessuna sezione trovata.");
    //   return;
    // }

    // // INIZIO MODIFICHE SWIPE VERTICALE
    // // Variabili per il throttle/debounce
    // let isAnimating = false;
    // let lastScrollTime = 0;
    // const scrollCooldown = 500; // Tempo di attesa in ms tra uno scroll e l'altro (ridotto da 800ms)

    // // Variabili per tracciare il tocco
    // let touchStartY = 0;
    // let touchEndY = 0;
    // let touchStartTime = 0;
    // let touchEndTime = 0;
    // let lastTouchY = 0;
    // let touchVelocity = 0;
    // const touchThreshold = 25; // Soglia minima per considerare uno swipe
    // // FINE MODIFICHE SWIPE VERTICALE

    // // INIZIO MODIFICHE SWIPE VERTICALE
    // function handleScroll(event) {
    //   const { isScrollLocked } = useScrollLock();
    //   // Se lo scroll è bloccato (modale aperto), ignora l'evento
    //   if (isScrollLocked.value) return;

    //   if (!isfixedSection.value) return; //.value perchè uso il composable
    //   // Se la timeline intro non è ancora terminata, ignoro completamente lo scroll
    //   if (!introCompleted) {
    //     event.preventDefault();
    //     return;
    //   }

    //   // Implementazione di throttle per gli eventi di scroll
    //   // Se è in corso un'animazione o non è passato abbastanza tempo dall'ultimo evento, ignora
    //   const now = Date.now();
    //   if (isAnimating || now - lastScrollTime < scrollCooldown) {
    //     return;
    //   }

    //   lastScrollTime = now;

    //   let deltaY = 0;
    //   let isTouchEvent = false;

    //   //SECTION - ottimizazione touch mobile
    //   // Determina il tipo di evento
    //   if (event.type === "wheel") {
    //     // Gestione mouse wheel con soglia per ridurre sensibilità
    //     deltaY = event.deltaY;

    //     // Riduzione della sensibilità per il Magic Mouse
    //     // Utilizziamo una soglia più alta per il deltaY
    //     const scrollThreshold = 10;
    //     if (Math.abs(deltaY) < scrollThreshold) {
    //       return; // Ignora movimenti troppo piccoli
    //     }

    //     // Aumenta la sensibilità per lo scroll con mouse/trackpad solo per movimenti significativi
    //     if (Math.abs(deltaY) < 20) deltaY *= 1.5;
    //   } else if (event.type === "touchstart") {
    //     isTouchEvent = true;
    //     touchStartY = event.touches[0].clientY;
    //     lastTouchY = touchStartY;
    //     touchStartTime = Date.now();
    //     // Resetta i valori di fine tocco
    //     touchEndY = touchStartY;
    //   } else if (event.type === "touchmove") {
    //     isTouchEvent = true;
    //     const currentY = event.touches[0].clientY;
    //     // Calcola la velocità del movimento
    //     const timeDiff = Date.now() - touchStartTime;
    //     if (timeDiff > 0) {
    //       touchVelocity = (Math.abs(currentY - lastTouchY) / timeDiff) * 1000; // pixel al secondo
    //     }
    //     lastTouchY = currentY;
    //     touchEndY = currentY;

    //     // Calcola il delta con una soglia minima per considerare uno swipe
    //     if (Math.abs(touchStartY - touchEndY) > touchThreshold) {
    //       deltaY = touchStartY - touchEndY;
    //       // Previeni lo scroll predefinito del browser su mobile
    //       event.preventDefault();
    //     }
    //   } else if (event.type === "touchend") {
    //     isTouchEvent = true;
    //     touchEndTime = Date.now();
    //     const touchDuration = touchEndTime - touchStartTime;

    //     // Calcola il delta con la soglia minima per considerare uno swipe
    //     if (Math.abs(touchStartY - touchEndY) > touchThreshold) {
    //       deltaY = touchStartY - touchEndY;

    //       // Considera anche la velocità del gesto per migliorare la reattività
    //       if (touchVelocity > 200) {
    //         // Se il movimento è stato veloce
    //         deltaY = deltaY > 0 ? Math.max(deltaY, 20) : Math.min(deltaY, -20);
    //       }
    //     }
    //   }

    //   //!SECTION

    //   // Imposta il flag di animazione
    //   isAnimating = true;

    //   // Applica l'azione con soglie ottimizzate per dispositivi touch
    //   if (isTouchEvent) {
    //     // Swipe verso l'alto (successivo)
    //     if (deltaY > touchThreshold) {
    //       sectionsTL.play();
    //     }
    //     // Swipe verso il basso (precedente)
    //     else if (deltaY < -touchThreshold) {
    //       sectionsTL.reverse();
    //     } else {
    //       // Se non supera la soglia, non consideriamo come animazione
    //       isAnimating = false;
    //       return;
    //     }
    //   } else {
    //     // Gestione scroll con mouse/trackpad
    //     // Scroll verso il basso (successivo)
    //     if (deltaY > 0) {
    //       sectionsTL.play();
    //     }
    //     // Scroll verso l'alto (precedente)
    //     else if (deltaY < 0) {
    //       sectionsTL.reverse();
    //     } else {
    //       // Se non c'è movimento, non consideriamo come animazione
    //       isAnimating = false;
    //       return;
    //     }
    //   }

    //   // Reset del flag di animazione dopo il completamento
    //   setTimeout(() => {
    //     isAnimating = false;
    //   }, 600); // Leggermente più lungo della durata dell'animazione tipica
    // }
    // // FINE MODIFICHE SWIPE VERTICALE

    // //registro handleScrol nella ref handleScrollRef dichiarata all'inizio fuori dal nextTick per l'onBeforeUnmount
    // handleScrollRef.value = handleScroll;

    // // Ottimizzazione per eventi wheel
    // window.addEventListener("wheel", handleScroll, { passive: false });

    // // Ottimizzazione per eventi touch con opzioni migliorate per iOS
    // window.addEventListener("touchstart", handleScroll, { passive: false });
    // window.addEventListener("touchmove", handleScroll, {
    //   passive: false,
    //   capture: true, // Cattura l'evento nella fase di capturing per una risposta più immediata
    // });
    // window.addEventListener("touchend", handleScroll, { passive: false });

    // // Aggiungiamo supporto per i gesti swipe
    // window.addEventListener("touchcancel", handleScroll, { passive: false });

    // // Manteniamo anche gli eventi mouse per desktop
    // window.addEventListener("mousedown", handleScroll, { passive: false });
    // window.addEventListener("mousemove", handleScroll, { passive: false });
    // window.addEventListener("mouseup", handleScroll, { passive: false });

    // // Funzione per prevenire il comportamento di rimbalzo su iOS Safari
    // const preventIOSBounce = function (e) {
    //   if (isfixedSection.value) {
    //     e.preventDefault();
    //   }
    // };

    // // Salva la funzione nel riferimento per poterla rimuovere in onBeforeUnmount
    // preventIOSBounceRef.value = preventIOSBounce;

    // // Aggiungi l'event listener con la funzione nominata
    // document.addEventListener("touchmove", preventIOSBounce, { passive: false });

    // // INIZIO MODIFICHE SWIPE VERTICALE
    // // Aggiungi un gestore specifico per iOS per migliorare ulteriormente la reattività
    // const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    // if (isIOS) {
    //   // Su iOS, aggiungiamo un listener aggiuntivo con priorità massima
    //   document.body.style.touchAction = "none"; // Disabilita il comportamento touch predefinito

    //   // Nota: non modifichiamo più il tempo di cooldown qui perché è già impostato a 500ms
    //   // nella dichiarazione delle variabili all'inizio
    // }
    // FINE MODIFICHE SWIPE VERTICALE

    //SECTION - Gestione animazione Timeline allo scroll
    //NOTE - recupero la rotationTL esposta dal componente phases_comp
    const RotationTL = PhasesRef.value?.rotationTL;
    const RotationTL_Titles = PhasesRef.value?.rotationTL_Titles;

    //NOTE - recupero la phasesTL esposta dal componente phases_comp
    const PhasesTL = PhasesRef.value?.phasesTL;

    $gsap.set("#hero-section", { zIndex: 1 });
    $gsap.set("#modules-section", { zIndex: 0 });
    $gsap.set("#phases-section", { zIndex: 0 });

    const sectionsTL = $gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.out",
      },
      onComplete: () => {
        console.log("Animazione completata e sato:", navigationStore.targetSection);

        setTimeout(() => {
          //attivo lo scroll di default
          $gsap.set("body", { overflow: "auto" });
          // Ripristina la posizione della sezione non fissa
          //resetNofixedSectionPosition();
          // Imposta lo stato della sezione fissa a false
          setFixedSection(false);
          //porto l'utente sa made for solo se non arrivo da pagine esterne che hanno richiesto di scrollare ad una data sezione
          if (navigationStore.targetSection == null) {
            //Non ci sono richieste esterne di scroll a sezioni, vai a Made for
            scrollToSection("made-for");
          }
          //resetto lo stato dopo averlo utilizzato
          navigationStore.resetState();
        }, 100);
      },
      onReverseCompleted: () => {
        // Ripristina la posizione della sezione non fissa anche quando l'animazione viene invertita
        //resetNofixedSectionPosition();
      },
    });

    //ANCHOR - Hero Section Start
    sectionsTL.addLabel("Start-hero");
    // sectionsTL.call(
    //   () => {
    //     rLogo.play("Logo intro");
    //   },
    //   null,
    //   "-=1"
    // );
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
    sectionsTL.addLabel("Start-phases");
    sectionsTL.call(() => RotationTL.pause());
    sectionsTL.call(() => RotationTL_Titles.pause());

    sectionsTL.to("#modules_svg", { rotate: "+=60", ease: "power1.in" });
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

    sectionsTL.addLabel("End-phases");
    sectionsTL.addPause();

    //ANCHOR - Phases Section End

    //ANCHOR - Modules Section Start
    sectionsTL.addLabel("Start-modules");
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

    // pausa entrata modules
    sectionsTL.addLabel("Start-modules-pause");
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
    sectionsTL.addLabel("End-modules");
    sectionsTL.addPause();
    //ANCHOR - Modules Section End
    sectionsTL.addLabel("sectionsTL-exit");
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

    sectionsTLRef.value = sectionsTL;

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
        //$gsap.set("body", { overflow: "hidden" });
        // console.log("intervento sullo scroll!!!!");
        setFixedSection(true);
      },
    });
    // Registriamo  l'istanza dello scrolltrigger nella ref noFixedSTRef dichiarata all'inizio fuori dal nextTick
    noFixedSTRef.value = noFixedST;
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

    // Ripristina il comportamento touch predefinito
    document.body.style.touchAction = "";
  }
});
</script>

<style lang="scss">
//@use "@/assets/css/_globals.scss" as *;</style>
