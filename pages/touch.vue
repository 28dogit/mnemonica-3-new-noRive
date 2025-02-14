<template>
  <div>
    <h1>Touch & Click Event Tester</h1>
    <div
      ref="touchArea"
      class="touch-area"
      @click="handleClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <p>{{ message }}</p>
      <p>Device Type: {{ deviceType }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const message = ref("Interagisci con l'area per testare gli eventi.");
const touchArea = ref(null);
const deviceType = ref("");

// Controlla se il dispositivo supporta eventi touch
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const handleClick = () => {
  message.value = "Hai fatto un click!";
  console.log("Click rilevato");
};

const handleTouchStart = () => {
  message.value = "Touch Start!";
  console.log("Touch Start");
};

const handleTouchMove = () => {
  message.value = "Touch Move!";
  console.log("Touch Move");
};

const handleTouchEnd = () => {
  message.value = "Touch End!";
  console.log("Touch End");
};

onMounted(() => {
  deviceType.value = isTouchDevice() ? "Mobile/Tablet" : "Desktop";
  console.log("Device Type:", deviceType.value);
});
</script>

<style scoped>
.touch-area {
  width: 300px;
  height: 200px;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid #000;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
}
</style>
