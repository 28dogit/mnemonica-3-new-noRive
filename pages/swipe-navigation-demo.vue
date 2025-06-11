<template>
  <div class="w-full min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-6">Demo Composable useSwipeNavigation</h1>

    <div
      ref="animationContainer"
      class="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden swipe-container"
    >
      <!-- Elementi da navigare -->
      <div
        v-for="(color, index) in colors"
        :key="index"
        :ref="el => (elementRefs[index] = el)"
        :class="[`square bg-${color}-500`, currentStep === index ? 'opacity-100' : 'opacity-0']"
      >
        {{ index + 1 }}
      </div>

      <!-- Indicatore di progresso -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        <div
          v-for="(_, index) in colors"
          :key="index"
          :class="[
            `h-3 w-3 rounded-full transition-all duration-300`,
            currentStep === index ? 'bg-black scale-125' : 'bg-gray-400',
          ]"
          @click="goToStep(index)"
        ></div>
      </div>

      <div class="absolute bottom-10 left-0 right-0 text-center text-gray-600">
        {{
          isClient
            ? isTouchDevice
              ? "Swipe verticale per cambiare elemento"
              : "Scroll per cambiare elemento"
            : "Caricamento..."
        }}
      </div>
    </div>

    <div class="mt-6 flex justify-center gap-4">
      <button 
        @click="goToPrevStep"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        :disabled="currentStep === 0 || isAnimating"
        :class="{ 'opacity-50 cursor-not-allowed': currentStep === 0 || isAnimating }"
      >
        Precedente
      </button>
      <button 
        @click="goToNextStep"
        class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        :disabled="currentStep === colors.length - 1 || isAnimating"
        :class="{ 'opacity-50 cursor-not-allowed': currentStep === colors.length - 1 || isAnimating }"
      >
        Successivo
      </button>
    </div>

    <div class="mt-4 p-4 bg-gray-100 rounded-lg">
      <p>Step corrente: {{ currentStep + 1 }}/{{ colors.length }}</p>
      <p>Dispositivo: {{ isTouchDevice ? 'Touch' : 'Desktop' }}</p>
      <p>Animazione in corso: {{ isAnimating ? 'Sì' : 'No' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useNuxtApp } from "#app";
import { useSwipeNavigation } from "~/composables/useSwipeNavigation";

definePageMeta({
  layout: "page-layout",
});

// Lista di colori per gli elementi
const colors = ["red", "blue", "green", "purple", "yellow"];

// Refs per gli elementi DOM
const animationContainer = ref(null);
const elementRefs = reactive([]);

// Inizializza il composable con le opzioni
const {
  currentStep,
  isAnimating,
  isTouchDevice,
  isClient,
  goToNextStep,
  goToPrevStep,
  goToStep,
  bindEvents,
} = useSwipeNavigation({
  maxSteps: colors.length,
  initialStep: 0,
  touchThreshold: 25,
  scrollThreshold: 10,
  scrollCooldown: 500,
  animationDuration: 600,
  preventDefaultScroll: true,
  onStepChange: (step) => {
    // Aggiorna l'animazione quando cambia lo step
    playAnimation(step);
  },
});

// Funzione per animare il cambio di elemento
const playAnimation = (step) => {
  const nuxtApp = useNuxtApp();
  const gsapInstance = nuxtApp.$gsap || gsap;

  // Nascondi tutti gli elementi
  elementRefs.forEach((el, index) => {
    if (el) {
      gsapInstance.to(el, {
        opacity: index === step ? 1 : 0,
        scale: index === step ? 1 : 0.8,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });
};

onMounted(() => {
  // Collega gli eventi al container
  if (animationContainer.value) {
    bindEvents(animationContainer.value);
  }

  // Inizializza GSAP per il primo elemento
  const nuxtApp = useNuxtApp();
  const gsapInstance = nuxtApp.$gsap || gsap;

  // Imposta lo stato iniziale di tutti gli elementi
  elementRefs.forEach((el, index) => {
    if (el) {
      gsapInstance.set(el, {
        opacity: index === currentStep.value ? 1 : 0,
        scale: index === currentStep.value ? 1 : 0.8,
      });
    }
  });
});
</script>

<style scoped>
.swipe-container {
  touch-action: none;
  -webkit-user-drag: none;
  user-select: none;
}
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
}
</style>