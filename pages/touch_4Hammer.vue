<template>
  <div class="w-full min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-6">Animazione Quadrati con Swipe/Scroll</h1>

    <div
      ref="animationContainer"
      class="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden"
      @wheel="handleScroll"
      style="touch-action: none; user-select: none"
    >
      <!-- Quadrati colorati -->
      <div ref="square1" class="square bg-red-500">1</div>
      <div ref="square2" class="square bg-blue-500 opacity-0">2</div>
      <div ref="square3" class="square bg-green-500 opacity-0">3</div>

      <!-- Indicatore di progresso -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <div
          v-for="(_, index) in 3"
          :key="index"
          :class="[
            `h-3 w-3 rounded-full transition-all duration-300`,
            currentStep === index ? 'bg-black scale-125' : 'bg-gray-400',
          ]"
        ></div>
      </div>

      <div class="absolute bottom-10 left-0 right-0 text-center text-gray-600">
        {{
          isClient
            ? isTouchDevice
              ? "Swipe per cambiare quadrato"
              : "Scroll per cambiare quadrato"
            : "Caricamento..."
        }}
      </div>
    </div>

    <div class="mt-4 p-4 bg-gray-100 rounded-lg">
      <p>{{ message }}</p>
      <p>Dispositivo: {{ deviceType }}</p>
      <p>Step corrente: {{ currentStep + 1 }}/3</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

definePageMeta({
  layout: "page-layout",
});

// Refs
const animationContainer = ref(null);
const square1 = ref(null);
const square2 = ref(null);
const square3 = ref(null);

// Stato dell'applicazione
const message = ref("Interagisci con l'area per cambiare quadrato");
const deviceType = ref("");
const currentStep = ref(0);
const isTouchDevice = ref(false);
const isAnimating = ref(false);

// Funzioni di navigazione tra step
const goToNextStep = () => {
  if (currentStep.value < 2 && !isAnimating.value) {
    isAnimating.value = true;
    currentStep.value++;
    playAnimation();
    message.value = `Mostrato quadrato ${currentStep.value + 1}`;

    setTimeout(() => {
      isAnimating.value = false;
    }, 600);
  }
};

const goToPrevStep = () => {
  if (currentStep.value > 0 && !isAnimating.value) {
    isAnimating.value = true;
    currentStep.value--;
    playAnimation();
    message.value = `Mostrato quadrato ${currentStep.value + 1}`;

    setTimeout(() => {
      isAnimating.value = false;
    }, 600);
  }
};

// Animazione con GSAP
const playAnimation = () => {
  const nuxtApp = useNuxtApp();
  const gsapInstance = nuxtApp.$gsap || gsap;

  gsapInstance.set([square1.value, square2.value, square3.value], { opacity: 0 });

  const currentSquare = [square1.value, square2.value, square3.value][currentStep.value];
  gsapInstance.to(currentSquare, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
  });
};

onMounted(async () => {
  const container = animationContainer.value;

  // Rilevamento dispositivo touch
  isTouchDevice.value = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  deviceType.value = isTouchDevice.value ? "Mobile/Tablet" : "Desktop";

  // Carichiamo hammerjs SOLO lato client
  const Hammer = (await import("hammerjs")).default;
  // Inizializzo Hammer.js
  const mc = new Hammer(container);

  mc.get("swipe").set({
    direction: Hammer.DIRECTION_HORIZONTAL,
    threshold: 20,
    velocity: 0.3,
  });

  mc.on("swipeleft", () => {
    goToNextStep();
  });

  mc.on("swiperight", () => {
    goToPrevStep();
  });

  // Cleanup
  onBeforeUnmount(() => {
    mc.off("swipeleft");
    mc.off("swiperight");
    mc.destroy();
  });

  // Inizializzazione animazione iniziale
  const nuxtApp = useNuxtApp();
  const gsapInstance = nuxtApp.$gsap || gsap;
  gsapInstance.set("body", { overflow: "hidden" });
  gsapInstance.set([square2.value, square3.value], { opacity: 0 });
  gsapInstance.set(square1.value, { opacity: 1 });
});
</script>

<style scoped>
.square {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}
</style>
