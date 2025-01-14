<template>
  <main>
    <div id="sectionsWrapper">
      <!-- <section class="sectionN hero"> -->
      <div id="hero-section" class="section_fixed hero">
        <div id="ghirlanda-element" class="element">
          <!-- <div id="logo_mne" class=""> -->
          <NuxtImg
            id="logo_mne"
            src="/assets/img/svg/Logo-mne-Vector.svg"
            densities="x1"
            alt="Mnemonica logo portrait"
          />
          <!-- </div> -->
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
      <div id="modules-section" ref="moduleSection" class="section_fixed modules">
        <ModulesCompNs></ModulesCompNs>
      </div>
      <section class="section_fixed phases">Phases Section</section>
    </div>
    <div class="nofixed w-[100vw] h-[1600px] bg-orange-500"></div>
  </main>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const moduleSection = ref(null); // Riferimento al div target

onMounted(() => {
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

  //!SECTION

  // Function to disable body scroll
  const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // Function to enable body scroll
  const enableBodyScroll = () => {
    document.body.style.overflow = "auto";
  };

  //creo la funzione updateTriger per legarla ad un listner sul resize
  const updateTriggers = () => {
    let allScrollHeight = 0;
    let scrollTriggerHeights = [];
    // Loop per creare transizioni tra sezioni
    sections.forEach((section, index) => {
      //calcolo l'altezza della section per gestire i markers di gsap
      let scrollHeight = ref(null);
      let Sstart = 0;
      let Send = 0;

      if (index === 0) {
        scrollHeight = section.offsetHeight;
        Sstart = 0;
        Send = section.offsetHeight;
      }
      if (index === 1) {
        scrollHeight = scrollTrigger.end;
        Sstart = section.offsetHeight;
        Send = section.offsetHeight + scrollTrigger.end;
      }
      if (index === 2) {
        scrollHeight = section.offsetHeight;
        Sstart = section.offsetHeight + scrollTrigger.end;
        Send = section.offsetHeight * 2 + scrollTrigger.end;
      }

      allScrollHeight += scrollHeight;
      scrollTriggerHeights.push(scrollHeight);

      const SectionHeight = section.offsetHeight;

      console.log("SecrollHeight", scrollHeight);
      console.log("allScrollHeight", allScrollHeight);
      console.log("scrollTriggerHeights", scrollTriggerHeights);

      console.log("test Calcolo Start", Sstart);

      console.log("test Calcolo End", Send);

      //rendo dinamica l'altezza di #sectionsWrapper usando js per creare la variabile css dell'altezza in base a quante sezioni ci sono, per evitare errori o dimenticanze scrivendolo a mano
      // questa variabile la userò nel css
      const totalAppHeight = allScrollHeight;
      document.documentElement.style.setProperty("--total-height", `${totalAppHeight}px`);

      let mainScrollTrigger = ScrollTrigger.create({
        markers: true,
        //pin: true,
        trigger: "#sectionsWrapper", // Trigger sull'intero contenitore
        //trigger: section, // Trigger sull'intero contenitore

        start: `${Sstart}px center`, // Inizio della sezione
        end: `${Send}px center`, // fine della sezione
        //invalidateOnRefresh: true,

        onEnter: () => {
          console.log("onEnter", index);
          $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
          if (index === 1) {
            console.log("SectionHeight1", SectionHeight);
            //mainScrollTrigger.disable();
            scrollTrigger.enable();
            setOnEnter(() => {});
            setOnComplete(() => {
              //scrollTrigger.disable();
            });
          }
          if (index === 2) {
            console.log("entrato index2 ");
          }
        },
        onLeave: () => {
          console.log("onLeave", index);
          $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
        },
        onEnterBack: () => {
          console.log("onEnterBack", index);
          $gsap.to(section, { opacity: 1, zIndex: "999999999", duration: 0.5 });
          if (index === 1) {
            scrollTrigger.enable();
            console.log("riattivo scroll trigger");
          }
        },
        onLeaveBack: () => {
          console.log("onLeaveBack", index);
          $gsap.to(section, { opacity: 0, zIndex: "0", duration: 0.5 });
        },
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
    detachScrollHandler(); // Assicura la pulizia degli eventi
  });

  // Imposta la prima sezione visibile all'inizio
  $gsap.set(sections[0], { opacity: 1 });
});
</script>

<style lang="scss">
#sectionsWrapper {
  width: 100vw;
  //height: 600vh;
  height: var(--total-height);
  //height: 300vh; /* Altezza totale virtuale: 100vh per ogni sezione */
  position: relative; /* Contenitore relativo per le sezioni sovrapposte */
}
//.section_fixed è gestita in main.scss
</style>
