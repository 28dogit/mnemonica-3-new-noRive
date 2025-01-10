<template>
  <div id="app">
    <section class="sectionN hero">Hero Section</section>
    <section class="sectionN modules">Modules Section</section>
    <section class="sectionN phases">Phases Section</section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { gsap } from "gsap";
// gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const { $gsap } = useNuxtApp();
  const sections = document.querySelectorAll(".sectionN");

  if (!sections.length) {
    console.error("Nessuna sezione trovata.");
    return;
  }
  //creo la funzione updateTriger per legarla ad un listner sul resize
  const updateTriggers = () => {
    // Loop per creare transizioni tra sezioni
    sections.forEach((section, index) => {
      //calcolo l'altezza della section per gestire i markers di gsap
      const SectionHeight = section.offsetHeight;

      //rendo dinamica l'altezza di #app usando js per creare la variabile css dell'altezza in base a quante sezioni ci sono, per evitare errori o dimenticanze scrivendolo a mano
      // questa variabile la userò nel css
      const totalAppHeight = sections.length * 100;
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

      ScrollTrigger.create({
        markers: true,
        //pin: true,
        trigger: "#app", // Trigger sull'intero contenitore
        //   end: `+=${sections.length * 100}vh`,
        start: `${index * SectionHeight}vh +=85`, // Inizia quando si raggiunge il punto giusto
        end: `${(index + 1) * SectionHeight}vh top`, // Finisce al limite della sezione successiva
        invalidateOnRefresh: true,
        onEnter: () => {
          $gsap.to(section, { opacity: 1, duration: 0.5 });
        },
        onLeave: () => {
          $gsap.to(section, { opacity: 0, duration: 0.5 });
        },
        onEnterBack: () => {
          $gsap.to(section, { opacity: 1, duration: 0.5 });
        },
        onLeaveBack: () => {
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
#app {
  width: 100vw;
  height: var(--total-height, 100vh);
  //height: 300vh; /* Altezza totale virtuale: 100vh per ogni sezione */
  position: relative; /* Contenitore relativo per le sezioni sovrapposte */
}

.sectionN {
  position: fixed; /* Sovrappone le sezioni */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0; /* Inizialmente nascoste */
  transition: opacity 0.5s ease;

  &.hero {
    background-color: #ff7675;
  }

  &.modules {
    background-color: #74b9ff;
  }

  &.phases {
    background-color: #55efc4;
  }
}
</style>
