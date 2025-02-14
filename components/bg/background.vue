<template>
  <div class="bbgWrapper">
    <canvas ref="canvasRefBBG" id="canvasFocusBBG"></canvas>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { Rive, Fit, Alignment, Layout, EventType, RiveEventType } from "@rive-app/canvas";

const canvasRefBBG = ref(null);
let mainBackGround = null; // Istanza di Rive

onMounted(() => {
  mainBackGround = new Rive({
    src: "/assets/rive/background.riv",
    artboard: "bg",
    canvas: canvasRefBBG.value,
    autoplay: true,
    // stateMachines: "State Machine",
    layout: new Layout({
      fit: Fit.Layout, // Adatta senza distorsione
      alignment: Alignment.Center, // Centra l'animazione
      resizeMode: "auto",
    }),
    onLoad: () => {
      mainBackGround.resizeDrawingSurfaceToCanvas();
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
    aggiornaResize(mainBackGround);
  });
});
</script>
<style lang="scss" scoped>
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;

.bbgWrapper {
  position: relative;
  width: 180%;
  height: 180%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
