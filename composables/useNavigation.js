// Composable per centralizzare le funzioni di navigazione e animazione
import { ref, nextTick } from 'vue';

export const useNavigation = () => {
  // Riferimento alla timeline delle sezioni
  const sectionsTLRef = ref(null);

  // Funzione per scorrere alla sezione
  const scrollToSection = async (sectionId) => {
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

  // Funzione personalizzata per eseguire le animazioni di gsap mentre si scrolla verso la sezione desiderata (noFixed sections)
  const customLogic = () => {
    if (sectionsTLRef.value) {
      sectionsTLRef.value.progress(1, false); // Jump to section
    }
  };

  // Funzione per navigare alla sezione Hero
  const toHero = () => {
    if (sectionsTLRef.value) {
      sectionsTLRef.value.tweenTo("Start-phases"); // anima fino ad
    }
  };

  // Funzione per navigare alla sezione All in One
  const toAllinOne = () => {
    if (sectionsTLRef.value) {
      sectionsTLRef.value.tweenTo("Start-modules-pause"); // anima fino ad
    }
  };

  // Gestore dell'evento menuAction
  const handleMenuAction = (action) => {
    console.log("Azione ricevuta:", action);
    // Chiama la funzione appropriata in base all'azione
    switch (action) {
      case "made-for":
        toHero();
        break;
      case "production":
        scrollToSection("production");
        break;
      case "scrollToPhases":
        // Questa funzione non è definita nel codice originale, quindi la commento
        // scrollToPhases();
        console.log("Funzione scrollToPhases non implementata");
        break;
      case "allInOne":
        toAllinOne();
        break;
      case "scrollToMadeFor":
        // Questa funzione non è definita nel codice originale, quindi la commento
        // scrollToMadeFor();
        console.log("Funzione scrollToMadeFor non implementata");
        break;
      default:
        console.log("Azione non riconosciuta:", action);
    }
  };

  // Funzione per impostare la timeline delle sezioni
  const setSectionsTL = (timeline) => {
    sectionsTLRef.value = timeline;
  };

  // Espongo le funzioni e i riferimenti
  return {
    sectionsTLRef,
    scrollToSection,
    customLogic,
    toHero,
    toAllinOne,
    handleMenuAction,
    setSectionsTL
  };
};