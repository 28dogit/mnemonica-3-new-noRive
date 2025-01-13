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
      <div id="modules-section" class="section_fixed modules">
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

// import { gsap } from "gsap";
// gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  //SECTION - animazioni interne
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
  // implemento la timeline intro che sbloccherà alla fine l'overflow hidden del body per ripristinare lo scroll
  const intro = $gsap.timeline({
    onComplete: () => {
      //console.log("Ripristino scroll");
      $gsap.set("body", { overflow: "auto" });
    },
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

  if (!sections.length) {
    console.error("Nessuna sezione trovata.");
    return;
  }

  //richiamo del composable useGsapModules che contiene tutta la timeline di modules
  const { modules_tl, getScrollTrigger, setOnComplete } = useGsapModules();
  const scrollTrigger = getScrollTrigger();
  scrollTrigger.disable();
  console.log("ModulesComp nexttick mounted");

  //creo la funzione updateTriger per legarla ad un listner sul resize
  const updateTriggers = () => {
    // Loop per creare transizioni tra sezioni
    sections.forEach((section, index) => {
      //calcolo l'altezza della section per gestire i markers di gsap
      const SectionHeight = section.offsetHeight;

      //rendo dinamica l'altezza di #sectionsWrapper usando js per creare la variabile css dell'altezza in base a quante sezioni ci sono, per evitare errori o dimenticanze scrivendolo a mano
      // questa variabile la userò nel css
      const totalAppHeight = sections.length * 100;
      console.log("totalAppHeight mod", (sections.length - 1) * 100);
      console.log("totalAppHeight", totalAppHeight);
      document.documentElement.style.setProperty("--total-height", `${totalAppHeight}vh`);

      //   console.log(
      //     "SectionHeight: ",
      //     SectionHeight,
      //     " - TotalAppHeight: ",
      //     totalAppHeight
      //   );
      //   console.log("INDEX * 100", index * 100);
      //   console.log(`Sezione ${index}:`, {
      //     offsetTop: section.offsetTop,
      //     offsetHeight: section.offsetHeight,
      //   });

      let mainScrollTrigger = ScrollTrigger.create({
        //markers: true,
        //pin: true,
        trigger: "#sectionsWrapper", // Trigger sull'intero contenitore
        start: `${index * SectionHeight}vh center`, // Inizio della sezione
        end: `${(index + 1) * SectionHeight}vh center`, // fine della sezione

        // sistema per calcolare un inzione e una fine differente per la 1 sezione che però crea un buco alla fine
        // lo sfalzamento tra lo start e end della prima sezione spsta verso l'alto il contenuto di #app che avendo altezza fissa
        // ha un vuoto alla fine.
        // start:
        //   index === 0
        //     ? `${index * SectionHeight}vh +=85` //per la prima sezione tengo lo start in alto
        //     : `${index * SectionHeight}vh bottom`, //per le altre sezioni sposto lo start in basso
        // //end: `${(index + 1) * SectionHeight}vh top`,
        // end:
        //   index === 0
        //     ? `${(index + 1) * SectionHeight}vh bottom` // per la prima sezione sposto l'end in basso perchè non mi serve atrraversarne tutta l'altezza
        //     : `${index * SectionHeight}vh top`, //per le altre sezioni sposto l'end in alto
        invalidateOnRefresh: true,
        onEnter: () => {
          console.log("onEnter", index);
          $gsap.to(section, { opacity: 1, duration: 0.5 });
          if (index === 1) {
            scrollTrigger.enable();
            // scrollTrigger.vars.scrub = false;
            console.log("Scrub (via vars) per index 1:", scrollTrigger.vars.scrub);
            setOnComplete(() => {
              console.log("Re-enabling Main ScrollTrigger");
              //mainScrollTrigger.enable();
            });
          }
          if (index === 2) {
            //scrollTrigger.disable();
            console.log("ho disabilitato lo scroll di modules");
            //mainScrollTrigger.disable();
          }
          console.log(
            "Scrub (via vars) da dentro on enter master:",
            scrollTrigger.vars.scrub
          );
          //moduleRef.value.modules_st.disable();
        },
        onLeave: () => {
          console.log("onLeave", index);
          $gsap.to(section, { opacity: 0, duration: 0.5 });
        },
        onEnterBack: () => {
          console.log("onEnterBack", index);
          $gsap.to(section, { opacity: 1, duration: 0.5 });
        },
        onLeaveBack: () => {
          console.log("onLeaveBack", index);
          $gsap.to(section, { opacity: 0, duration: 0.5 });
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
  });

  // Imposta la prima sezione visibile all'inizio
  $gsap.set(sections[0], { opacity: 1 });
});
</script>

<style lang="scss">
#sectionsWrapper {
  width: 100vw;
  height: var(--total-height, 100vh);
  //height: 300vh; /* Altezza totale virtuale: 100vh per ogni sezione */
  position: relative; /* Contenitore relativo per le sezioni sovrapposte */
}

// .sectionN {
//   position: fixed; /* Sovrappone le sezioni */
//   top: 70px;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   opacity: 0; /* Inizialmente nascoste */
//   transition: opacity 0.5s ease;

//   // &.hero {
//   //   background-color: #ff7675;
//   // }

//   &.modules {
//     background-color: #74b9ff;
//   }

//   &.phases {
//     background-color: #55efc4;
//   }
// }
</style>
