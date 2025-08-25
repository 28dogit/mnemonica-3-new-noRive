// composables/useFunctions.ts
export const useMNEfunctions = (navigationStore) => {
  //Funzione per scorrere alla sezione
  const scrollToSection = async (sectionId) => {
    // console.log("scrollToSection-composable");
    await nextTick();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // nel css globale imposto html scroll-padding-top: 70px per compensare l'altezza dell'header!
        element.scrollIntoView({ behavior: "smooth" });
        navigationStore.resetState();
      }
    }, 500);
  };

  // Gestore dell'evento menuAction
  const handleMenuAction = (action) => {
    // console.log("Azione ricevuta - composable:", action);
    // Chiama la funzione appropriata in base all'azione
    switch (action) {
      // case "hero":
      //   navigationStore.targetSection = "hero-section-2";
      //   scrollToSection("hero-section-2");
      //   navigationStore.resetState();
      //   break;
      // case "phases":
      //   navigationStore.targetSection = "phases-section-2";
      //   scrollToSection("phases-section-2");
      //   navigationStore.resetState();
      //   break;
      // case "allInOne": // Corretto da scrollToAllInOne
      //   navigationStore.targetSection = "modules-section-2";
      //   scrollToSection("modules-section-2");
      //   navigationStore.resetState();
      //   break;
      // case "madeFor":
      //   navigationStore.targetSection = "made-for";
      //   scrollToSection("made-for");
      //   navigationStore.resetState();
      //   break;
      case "production":
        navigationStore.targetSection = "production";
        scrollToSection("production");
        break;
      case "archive":
        navigationStore.targetSection = "archive";
        scrollToSection("archive");
        navigationStore.resetState();
        break;
      default:
    }
  };

  return {
    scrollToSection,
    //toFixedSections,
    handleMenuAction,
  };
};
