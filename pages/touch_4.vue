<template>
  <div class="w-full min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-6">Animazione Quadrati con Swipe/Scroll</h1>

    <div
      ref="animationContainer"
      class="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden swipe-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @wheel="handleScroll"
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
import { ref, onMounted, reactive } from "vue";
import { useNuxtApp } from "#app";

definePageMeta({
  layout: "page-layout",
});

// Verifica se siamo in ambiente client
const isClient = ref(false);

// Refs per gli elementi DOM
const animationContainer = ref(null);
const square1 = ref(null);
const square2 = ref(null);
const square3 = ref(null);

// Stato dell'applicazione
const message = ref("Interagisci con l'area per cambiare quadrato");
const deviceType = ref("");
const currentStep = ref(0);
const timeline = ref(null);
const isTouchDevice = ref(false);

// Variabili per il touch
const touchStartX = ref(0);
const touchEndX = ref(0);
const touchThreshold = 25; // Soglia minima per considerare uno swipe

// Variabile per il throttle/debounce
const isAnimating = ref(false);
const lastScrollTime = ref(0);
const scrollCooldown = 500; // Tempo di attesa in ms tra uno scroll e l'altro

// Gestione eventi touch
const handleTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  event.preventDefault(); // Blocca lo scroll del browser
  touchEndX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  // Se è in corso un'animazione, ignora l'evento
  if (isAnimating.value) return;

  const swipeDistance = touchEndX.value - touchStartX.value;

  if (Math.abs(swipeDistance) > touchThreshold) {
    if (swipeDistance > 0) {
      // Swipe verso destra (precedente)
      goToPrevStep();
    } else {
      // Swipe verso sinistra (successivo)
      goToNextStep();
    }
  }
};

// Gestione evento scroll con throttle
const handleScroll = (event) => {
  // Previeni lo scroll della pagina
  event.preventDefault();

  // Implementazione di throttle per gli eventi di scroll
  const now = Date.now();
  if (isAnimating.value || now - lastScrollTime.value < scrollCooldown) {
    return;
  }

  lastScrollTime.value = now;

  // Riduzione della sensibilità per il Magic Mouse
  // Utilizziamo una soglia più alta per il deltaY
  const scrollThreshold = 10;

  if (Math.abs(event.deltaY) < scrollThreshold) {
    return; // Ignora movimenti troppo piccoli
  }

  if (event.deltaY > 0) {
    // Scroll verso il basso (successivo)
    goToNextStep();
  } else {
    // Scroll verso l'alto (precedente)
    goToPrevStep();
  }
};

// Funzioni per navigare tra gli step
const goToNextStep = () => {
  console.log(
    "goToNextStep chiamato - currentStep:",
    currentStep.value,
    "isAnimating:",
    isAnimating.value
  );
  if (currentStep.value < 2 && !isAnimating.value) {
    isAnimating.value = true;
    currentStep.value++;
    playAnimation();
    message.value = `Mostrato quadrato ${currentStep.value + 1}`;

    // Reset del flag di animazione dopo il completamento
    setTimeout(() => {
      isAnimating.value = false;
    }, 600); // Leggermente più lungo della durata dell'animazione
  }
};

const goToPrevStep = () => {
  console.log(
    "goToNextStep chiamato - currentStep:",
    currentStep.value,
    "isAnimating:",
    isAnimating.value
  );
  if (currentStep.value > 0 && !isAnimating.value) {
    isAnimating.value = true;
    currentStep.value--;
    playAnimation();
    message.value = `Mostrato quadrato ${currentStep.value + 1}`;

    // Reset del flag di animazione dopo il completamento
    setTimeout(() => {
      isAnimating.value = false;
    }, 600); // Leggermente più lungo della durata dell'animazione
  }
};

// Inizializza e riproduce l'animazione in base allo step corrente
const playAnimation = () => {
  const nuxtApp = useNuxtApp();
  const gsapInstance = nuxtApp.$gsap || gsap;

  // Resetta l'opacità di tutti i quadrati
  gsapInstance.set([square1.value, square2.value, square3.value], { opacity: 0 });

  // Mostra il quadrato corrente
  const currentSquare = [square1.value, square2.value, square3.value][currentStep.value];

  gsapInstance.to(currentSquare, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
  });
};

onMounted(() => {
  const container = animationContainer.value;
  container.addEventListener("touchmove", handleTouchMove, { passive: false });
  // Imposta isClient a true quando siamo nel browser
  isClient.value = true;

  // Controlla se il dispositivo supporta eventi touch
  if (typeof window !== "undefined") {
    isTouchDevice.value = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    deviceType.value = isTouchDevice.value ? "Mobile/Tablet" : "Desktop";
  }

  // Inizializza GSAP timeline
  const nuxtApp = useNuxtApp();
  const gsapInstance = nuxtApp.$gsap || gsap;
  gsapInstance.set("body", { overflow: "hidden" }); // blocco lo scroll per poter testare le gesture

  timeline.value = gsapInstance;

  // Mostra il primo quadrato all'avvio
  gsapInstance.set([square2.value, square3.value], { opacity: 0 });
  gsapInstance.set(square1.value, { opacity: 1 });
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
  transition: transform 0.3s ease;
}
</style>
