<template>
  <div class="rive">
    <div class="content">
        <canvas
            ref="canvasRiveRef"
            id="canvasrive"
            style="width: 460px;"
          ></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { Rive, Fit, Alignment, Layout } from "@rive-app/canvas";

definePageMeta({
  layout: "page-layout",
});

const canvasRiveRef = ref(null);

// Variabile per memorizzare il buffer del file .riv
let rivBuffer = null;

// Funzione per caricare il file .riv una sola volta
async function loadRivFile(url) {
  const response = await fetch(url);
  return await response.arrayBuffer();
}
onMounted(() => {
    //const { $gsap } = useNuxtApp();
    nextTick(async () => {
    //SECTION - RIVE
    // Carica il file .riv una sola volta
    rivBuffer = await loadRivFile("/assets/rive/hero_mne_divided-test.riv");

    const rLogo = new Rive({
      buffer: rivBuffer, // Utilizza il buffer già caricato
      artboard: "test2",
      canvas: canvasRiveRef.value,
      autoplay: true,
      //stateMachines: "State logo",
      //animations: "Logo intro",
      layout: new Layout({
        fit: Fit.Layout, // Adatta senza distorsione
        alignment: Alignment.Center, // Centra l'animazione
        resizeMode: "auto",
      }),
      onLoad: () => {
        rLogo.resizeDrawingSurfaceToCanvas();
        //rLogo.pause(); // metto in pausa l'istanza rLogo dopo averla inizializzata in modo da poterla riprendere in seguito e fare rLogo.play("timelineName")
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
      [rLogo].forEach(aggiornaResize);
    });
  });

});

</script>

<style lang="scss" scoped>

</style>