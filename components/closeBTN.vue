<template>
  <div class="btnWrapper">
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
let rCloseBtn = null; // Istanza di Rive

onMounted(() => {
  rCloseBtn = new Rive({
    src: "/assets/rive/focusbtn.riv",
    artboard: "CloseBTnN",
    canvas: canvasRefBtn.value,
    autoplay: true,
    stateMachines: "CloseBtn_animation",
    layout: new Layout({
      fit: Fit.Layout, // Adatta senza distorsione
      alignment: Alignment.Center, // Centra l'animazione
      resizeMode: "auto",
    }),
    onLoad: () => {
      rCloseBtn.resizeDrawingSurfaceToCanvas();
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
  rCloseBtn.on(EventType.RiveEvent, onRiveEventReceived);
  // Can unsubscribe to Rive Events at any time via the off() API like below
  // rCloseBtn.off(EventType.RiveEvent, onRiveEventReceived);

  function aggiornaResize(elemento) {
    elemento.layout = new Layout({
      fit: Fit.Layout, // Cambia il fit per coprire l'area
      alignment: Alignment.Center, // Allinea in basso
      resizeMode: "auto",
    });
    elemento.resizeDrawingSurfaceToCanvas();
  }

  window.addEventListener("resize", () => {
    aggiornaResize(rCloseBtn);
  });
});
</script>
<style lang="scss" scoped>
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;

.btnWrapper {
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
