// composables/useFunctions.ts
export const useMNEfunctions = (navigationStore, sectionsTLRef, isfixedSection, setFixedSection) => {
  // Funzione per verificare se la sezione non fissa è stata raggiunta
  function checkNofixedSection() {
    // console.log("-#-#- checkfixedsection-composable");
    const nofixedSection = document.querySelector(".nofixed_section");
    return nofixedSection && window.scrollY > nofixedSection.offsetTop;
  }

  //Funzione per scorrere alla sezione
  const scrollToSection = async (sectionId) => {
    // console.log("scrollToSection-composable");
    await nextTick();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // nel css globale imposto html scroll-padding-top: 70px per compensare l'altezza dell'header!
        element.scrollIntoView({ behavior: "smooth" });
        // Eseguo la logica personalizzata per eseguire la timeline di gsap in modo da trovarla pronta quando scrollo nuovamente verso l'alto
        customLogic();
        //resetNofixedSectionPosition("scrolltosection");
      } else {
        // console.error(`Elemento con ID "${sectionId}" non trovato.`);
      }
    }, 500);
  };

  // Funzione personalizzata per eseguire le animazioni di gsap mentre si scrolla verso  la sezione desiderata (noFixed sections)
  const customLogic = () => {
    // console.log("Custom-composable");
    //sectionsTLRef.value è la timeline sectionsTL
    if (sectionsTLRef.value) {
      sectionsTLRef.value.progress(1, false); // Jump to section
    }
  };

  const toFixedSections = (section) => {
    // console.log("toFixed-composable");
    const { $gsap } = useNuxtApp();
    if (sectionsTLRef.value) {
      // Verifica se l'utente si trova nella sezione non fissa
      if (isfixedSection.value) {
        // Se è nella sezione fissa, avvia direttamente l'animazione
        sectionsTLRef.value.tweenTo(section);
      } else {
        // Imposta lo stato della sezione fissa a true
        setFixedSection(true);
        // Blocca lo scroll
        document.body.style.overflow = "hidden";
        // Anima la sezione non fissa per abbassarla sotto la viewport
        const nofixedSection = document.querySelector(".nofixed_section");
        const rectTop = nofixedSection.getBoundingClientRect().top.toFixed();
        if (nofixedSection) {
          $gsap.fromTo(
            ".nofixed_section",
            {
              y: 0,
            },
            {
              // y: window.innerHeight + rectTop,
              y: Math.abs(parseFloat(rectTop)) + window.innerHeight,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                // Avvia l'animazione della timeline
                sectionsTLRef.value.tweenTo(section);
                setFixedSection(true);
              },
            }
          );
        }
      }
    }
  };

  // Gestore dell'evento menuAction
  const handleMenuAction = (action) => {
    // console.log("Azione ricevuta - composable:", action);
    // Chiama la funzione appropriata in base all'azione
    switch (action) {
      case "hero":
        //toFixedSections("Start-hero"); (vecchio sistema con le fixed sections)
        navigationStore.targetSection = "hero-section-2";
        scrollToSection("hero-section-2");
        resetNofixedSectionPosition("hero-section-2");
        break;
      case "phases":
        // toFixedSections("End-phases"); (vecchio sistema con le fixed sections)
        navigationStore.targetSection = "phases-section-2";
        scrollToSection("phases-section-2");
        resetNofixedSectionPosition("phases-section-2");
        break;
      case "allInOne": // Corretto da scrollToAllInOne
        // toFixedSections("Start-modules-pause"); (vecchio sistema con le fixed sections)
        navigationStore.targetSection = "modules-section-2";
        scrollToSection("modules-section-2");
        resetNofixedSectionPosition("modules-section-2");
        break;
      case "madeFor":
        navigationStore.targetSection = "made-for";
        scrollToSection("made-for");
        resetNofixedSectionPosition("madefor");
        break;
      case "production":
        navigationStore.targetSection = "production"; // serve per evitare che al on complete di sectionsTL vada a madefor
        scrollToSection("production");
        resetNofixedSectionPosition("Production");
        break;
      case "archive":
        navigationStore.targetSection = "archive"; // serve per evitare che al on complete di sectionsTL vada a madefor
        scrollToSection("archive");
        resetNofixedSectionPosition("Archive");
        break;
      default:
      // console.log("Azione non riconosciuta-composable:", action);
    }
  };

  const resetNofixedSectionPosition = (dachi) => {
    // console.log("reset-composable");
    const { $gsap } = useNuxtApp();
    const nofixedSection = document.querySelector(".nofixed_section");
    // console.log("Ripristino posizione della sezione non fissa", dachi);
    if (nofixedSection) {
      // $gsap.set(nofixedSection, {
      //   y: 0,
      // });
      $gsap.to(nofixedSection, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return {
    checkNofixedSection,
    scrollToSection,
    customLogic,
    toFixedSections,
    handleMenuAction,
    resetNofixedSectionPosition,
  };
};
