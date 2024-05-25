<template>
  <div ref="overlay" class="overlay" v-show="visible">
    <div class="content">
      <button
        @click="closeOverlay"
        class="close-btn w-8 h-8 bg-transparent text-slate-200 hover:text-slate-400 hover:rotate-[20deg]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="m9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"
          />
        </svg>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";
import gsap from "gsap";

const props = defineProps({
  visible: Boolean,
  buttonRect: Object,
});

const emits = defineEmits(["update:visible"]);

const overlay = ref(null);

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      openOverlay();
    }
  }
);

const openOverlay = () => {
  const { width, height, left, top } = props.buttonRect;
  // const radius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2; // raggio calcolato dal centro dello schermo con il teorema di pitagora

  //calcolo del raggio per l'overlay decentrato sul punto da cui facciamo click
  // calcolo il centro del pulsate / Link (i parametri left, top, ... lip rendo dalla costante definita precedentemente che riceve i valori dalla pagina in cui è implementata, in questo esempio è focusTransition)
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  // Calcolo le distanze del centro del pulsante dai quattro angoli dello schermo non divido per due pechè mi serve la distanza intera al vertice e non il raggio
  const distanceTL = Math.sqrt((centerX - 0) ** 2 + (centerY - 0) ** 2);
  const distanceTR = Math.sqrt((centerX - window.innerWidth) ** 2 + (centerY - 0) ** 2);
  const distanceBL = Math.sqrt((centerX - 0) ** 2 + (centerY - window.innerHeight) ** 2);
  const distanceBR = Math.sqrt(
    (centerX - window.innerWidth) ** 2 + (centerY - window.innerHeight) ** 2
  );
  //dichiaro la costante che racchiude i valori calcolati e ne restituisce il più grande che è quello che userò come raggio per il mio clipPath
  const radius = Math.max(distanceTL, distanceTR, distanceBL, distanceBR);

  gsap.fromTo(
    overlay.value,
    {
      // clipPath: `circle(${width / 2}px at ${left + width / 2}px ${top + height / 2}px)`,
      clipPath: `circle(${width / 10}px at ${left + width / 2}px ${top + height / 2}px)`,
    },
    {
      clipPath: `circle(${radius}px at ${window.innerWidth / 2}px ${
        window.innerHeight / 2
      }px)`,
      duration: 2,
      // ease: "power2.inOut",
      ease: "power2.out",
    }
  );
};

const closeOverlay = () => {
  const { width, height, left, top } = props.buttonRect;
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  const radius = Math.max(window.innerWidth, window.innerHeight) * 1.5;

  gsap.to(overlay.value, {
    // clipPath: `circle(${width / 2}px at ${centerX}px ${centerY}px)`,
    clipPath: `circle(${width / 10}px at ${left + width / 2}px ${top + height / 2}px)`,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      console.log("chiuso");
      emits("update:visible", false);
    },
  });
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  overflow: hidden;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 2rem;
}
</style>
