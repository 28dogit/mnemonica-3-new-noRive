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
import { Rive, Fit, Alignment, Layout, EventType, RiveEventType } from "@rive-app/canvas";

const emit = defineEmits(["click", "touch", "pointerdown", "mousedown"]);
// const emit = defineEmits(["click", "touch", "pointerdown", "mousedown", "touchend", "pointerup", "keydown"]);

const canvasRefBtn = ref(null);
let rFocusBtn = null; // Istanza di Rive

onMounted(() => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.app.baseURL;
  rFocusBtn = new Rive({
    src: `${baseURL}/rive/focusbtn.riv`,
    // src: "/assets/rive/focusbtn.riv",
    artboard: "FocusArtboard",
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
    },
  });

  function onRiveEventReceived(riveEvent) {
    const eventData = riveEvent.data;
    switch (eventData.name) {
      case "onClickEvent":
        console.log("Event da switch case", eventData.name);
        emit("click");
        emit("touch");
        emit("pointerdown");
        emit("mousedown");
        break;
      default:
        break;
    }
  }
  // Add event listener and provide callback to handle Rive Event
  rFocusBtn.on(EventType.RiveEvent, onRiveEventReceived);
  // Can unsubscribe to Rive Events at any time via the off() API like below
  // rFocusBtn.off(EventType.RiveEvent, onRiveEventReceived);

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
