<template>
  <div class="focusWrapper">
    <!-- <span class="focusTxt">Focus</span>
    <span class="focusBtn">+</span> -->
    <canvas
      ref="canvasRefBtn"
      id="canvasFocusBtn"
      style="position: absolute; height: 70px; width: 70px"
    ></canvas>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { Rive, Fit, Alignment, Layout } from "@rive-app/canvas";
const canvasRefBtn = ref(null);

onMounted(() => {
  const rFocusBtn = new Rive({
    src: "/assets/rive/focusbtn.riv",
    artboard: "Focus",
    canvas: canvasRefBtn.value,
    autoplay: true,
    stateMachines: "FocusBtn_animation",
    layout: new Layout({
      fit: Fit.Layout, // Adatta senza distorsione
      alignment: Alignment.Center, // Centra l'animazione
      resizeMode: "auto",
    }),
    onLoad: () => {
      rFocusBtn.resizeDrawingSurfaceToCanvas();
      //rFocusBtn.pause(); // metto in pausa l'istanza rLogo dopo averla inizializzata in modo da poterla riprendere in seguito e fare rLogo.play("timelineName")
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
    aggiornaResize(rFocusBtn);
  });
});
</script>
<style lang="scss" scoped>
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;
.focusWrapper {
  height: 70px;
  width: 70px;
  // display: flex;
  // align-items: center;
  // justify-content: flex-end;
  // gap: 1rem;
  // height: 30px;
  // border-radius: 30px;
  // width: fit-content;
  // min-width: 120px;
  // padding-left: 1rem;
  // margin-top: 1rem;
  // background-color: $gradient_2;
  // .focusTxt {
  //   opacity: 1;
  //   //display: none;
  // }
  // .focusBtn {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   font-size: 1.5rem;
  //   // color: $mne_secondary;
  //   color: $mne_text-on-dark;
  //   margin: 0;
  //   background-color: $gradient_4;
  //   width: 30px;
  //   height: 30px;
  //   border-radius: 15px;
  // }
}
</style>
