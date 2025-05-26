<template>
  <div class="w-full min-h-screen p-4">
    <h1 class="text-2xl font-bold mb-6">Animazione Quadrati con @vueuse/gesture</h1>

    <ClientOnly>
      <div
        ref="animationContainer"
        v-drag="handleDrag"
        class="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        @wheel="handleScroll"
        style="touch-action: none; -webkit-user-select: none; user-select: none"
      >
        <div
          v-for="(square, index) in squares"
          :key="index"
          :class="[
            'square absolute w-20 h-20 flex items-center justify-center text-white font-bold text-xl transition-opacity duration-500',
            square.color,
            square.visible ? 'opacity-100' : 'opacity-0',
          ]"
          :style="{
            left: square.x + 'px',
            top: square.y + 'px',
          }"
        >
          {{ square.number }}
        </div>

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
                ? "Swipe o drag per cambiare quadrato"
                : "Scroll o drag per cambiare quadrato"
              : "Caricamento..."
          }}
        </div>
      </div>
      <template #fallback>
        <div
          ref="animationContainer"
          class="relative w-full h-[70vh] bg-gray-100 rounded-lg overflow-hidden"
          @wheel="handleScroll"
          style="touch-action: none; -webkit-user-select: none; user-select: none"
        >
          <!-- Quadrati colorati per SSR -->
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
            Caricamento...
          </div>
        </div>
      </template>
    </ClientOnly>

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

// Stato dell'applicazione
const message = ref("Interagisci con l'area per cambiare quadrato");
const deviceType = ref("");
const currentStep = ref(0);
const timeline = ref(null);
const isTouchDevice = ref(false);

// Array dei quadrati per il rendering dinamico
const squares = reactive([
  { number: 1, color: "bg-red-500", x: 150, y: 150, visible: true },
  { number: 2, color: "bg-blue-500", x: 150, y: 150, visible: false },
  { number: 3, color: "bg-green-500", x: 150, y: 150, visible: false },
]);

// Variabile per il throttle/debounce
const isAnimating = ref(false);
const lastScrollTime = ref(0);
const scrollCooldown = 500; // Tempo di attesa in ms tra uno scroll e l'altro

// Gestione drag con @vueuse/gesture
const handleDrag = ({ movement: [mx, my], down, velocity, direction, cancel, event }) => {
  // Se è in corso un'animazione, cancella il drag
  if (isAnimating.value) {
    cancel();
    console.log("Animazione in corso, drag cancellato");
    return;
  }

  // Durante il drag, mostra feedback visivo opzionale
  if (down) {
    // Opzionale: aggiungi feedback visivo durante il drag
    console.log("Dragging:", mx, my);
  } else {
    // Al rilascio, determina la direzione del gesto
    const threshold = 50;
    const velocityThreshold = 0.3;

    console.log(
      "Drag ended - movement:",
      mx,
      "velocity:",
      velocity[0],
      "direction:",
      direction[0]
    );

    // Controlla se il movimento è significativo
    if (Math.abs(mx) > threshold || Math.abs(velocity[0]) > velocityThreshold) {
      if (mx < 0 || direction[0] < 0) {
        // Swipe verso sinistra (successivo)
        console.log("Swipe verso sinistra - successivo");
        goToNextStep();
      } else if (mx > 0 || direction[0] > 0) {
        // Swipe verso destra (precedente)
        console.log("Swipe verso destra - precedente");
        goToPrevStep();
      }
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

// Funzioni per navigare tra gli step con migliore gestione dello stato
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
    console.log("Nuovo step:", currentStep.value);
    playAnimation();
    message.value = `Mostrato quadrato ${currentStep.value + 1}`;

    // Reset del flag di animazione con callback più affidabile
    setTimeout(() => {
      isAnimating.value = false;
      console.log("Animazione completata, isAnimating reset a false");
    }, 700); // Tempo leggermente aumentato per iOS
  } else {
    console.log("goToNextStep bloccato - già al massimo o animazione in corso");
  }
};

const goToPrevStep = () => {
  console.log(
    "goToPrevStep chiamato - currentStep:",
    currentStep.value,
    "isAnimating:",
    isAnimating.value
  );

  if (currentStep.value > 0 && !isAnimating.value) {
    isAnimating.value = true;
    currentStep.value--;
    console.log("Nuovo step:", currentStep.value);
    playAnimation();
    message.value = `Mostrato quadrato ${currentStep.value + 1}`;

    // Reset del flag di animazione con callback più affidabile
    setTimeout(() => {
      isAnimating.value = false;
      console.log("Animazione completata, isAnimating reset a false");
    }, 700); // Tempo leggermente aumentato per iOS
  } else {
    console.log("goToPrevStep bloccato - già al minimo o animazione in corso");
  }
};

// Inizializza e riproduce l'animazione in base allo step corrente
const playAnimation = () => {
  // Aggiorna la visibilità dei quadrati nell'array reattivo
  squares.forEach((square, index) => {
    if (index === currentStep.value) {
      // Mostra il quadrato corrente con animazione
      square.visible = true;
    } else {
      // Nascondi gli altri quadrati
      square.visible = false;
    }
  });

  console.log(`Animazione: mostrato quadrato ${currentStep.value + 1}`);
};

onMounted(() => {
  // Imposta isClient a true quando siamo nel browser
  isClient.value = true;

  // Controlla se il dispositivo supporta eventi touch
  if (typeof window !== "undefined") {
    isTouchDevice.value = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    deviceType.value = isTouchDevice.value ? "Mobile/Tablet" : "Desktop";
    console.log("Dispositivo rilevato:", deviceType.value);
  }

  // Inizializzazione completata - il primo quadrato è già visibile tramite l'array squares
  console.log("@vueuse/gesture inizializzato con successo");
  console.log("Stato iniziale squares:", squares);
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
