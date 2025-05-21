// composables/useFunctions.ts
export const useMNEfunctions = (sectionsTLRef, isfixedSection, setFixedSection) => {

// Funzione per scorrere alla sezione
const scrollToSection = async (sectionId) => {
    console.log("scrollToSection-composable");
    await nextTick();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // nel css globale imposto html scroll-padding-top: 70px per compensare l'altezza dell'header!
        element.scrollIntoView({ behavior: "smooth" });
        // Eseguo la logica personalizzata per eseguire la timeline di gsap in modo da trovarla pronta quando scrollo nuovamente verso l'alto
        customLogic();
      } else {
        console.error(`Elemento con ID "${sectionId}" non trovato.`);
      }
    }, 500);
  };
  
  // Funzione personalizzata per eseguire le animazioni di gsap mentre si scrolla verso  la sezione desiderata (noFixed sections)
  const customLogic = () => {
    console.log("customlogic-composable");
    //sectionsTLRef.value è la timeline sectionsTL
    if (sectionsTLRef.value) {
      sectionsTLRef.value.progress(1, true); // Jump to section
    }
  };
  
  const toFixedSections = (section) => {
    console.log("toFixedsections-composable");
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
          $gsap.to(".nofixed_section", {
            // y: window.innerHeight + rectTop,
            y: Math.abs(parseFloat(rectTop)) + window.innerHeight,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Avvia l'animazione della timeline
              sectionsTLRef.value.tweenTo(section);
              setFixedSection(true);
            },
          });
        }
      }
    }
  };


const resetNofixedSectionPosition = () => {
  const { $gsap } = useNuxtApp();
  const nofixedSection = document.querySelector(".nofixed_section");
  console.log("Ripristino posizione della sezione non fissa");
  if (nofixedSection) {
    $gsap.set(nofixedSection, {
      y: 0,
    });
  }
};
        
    return {
        scrollToSection,
        customLogic,
        toFixedSections,
        resetNofixedSectionPosition
    }
  }