<template>
  <div class="focusWrapper">
    <canvas
      ref="canvasRefBtn"
      id="canvasFocusBtn"
      style="height: 70px; width: 70px"
    ></canvas>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { Rive, Fit, Alignment, Layout } from "@rive-app/canvas";

const emit = defineEmits(["click"]);

const canvasRefBtn = ref(null);
let rFocusBtn = null; // Istanza di Rive

onMounted(() => {
  rFocusBtn = new Rive({
    src: "/assets/rive/focusbtn.riv",
    artboard: "Focus 2",
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

      // 📌 Stampiamo gli input della State Machine
      const stateMachineInputs = rFocusBtn.stateMachineInputs("FocusBtn_animation");
      console.log("🔍 Stato della state machine:", stateMachineInputs);

      // 🎯 Controlliamo se esiste "Event28"
      const eventTrigger = stateMachineInputs.find((input) => input.name === "Event28");

      if (eventTrigger) {
        console.log("✅ Event28 trovato!");

        // ✅ Intercettiamo il click direttamente in Vue
        canvasRefBtn.value.addEventListener("pointerdown", () => {
          console.log("📢 Click sul canvas intercettato! Attiviamo Event28...");
          eventTrigger.fire(); // 🔥 Attiva manualmente Event28
          emit("click"); // Emettiamo l'evento per Vue
        });
      } else {
        console.warn("⚠️ L'evento Event28 NON è stato trovato nella state machine!");
      }

      // ✅ Rendi `rFocusBtn` accessibile globalmente per il test in console
      window.rFocusBtn = rFocusBtn;
      console.log("🛠 `rFocusBtn` è ora accessibile dalla console!");
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
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
