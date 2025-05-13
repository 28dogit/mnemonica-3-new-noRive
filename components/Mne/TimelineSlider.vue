<template>
  <div class="timeline-container">
    <!-- Elementi da animare -->
    <div class="animation-container">
      <div
        v-for="(item, index) in timelineItems"
        :key="index"
        :ref="(el) => (itemRefs[index] = el as HTMLElement)"
        class="timeline-item"
        :class="`item-${index}`"
      >
        {{ item.text }}
      </div>
    </div>

    <!-- Slider per controllare la timeline -->
    <div class="slider-container">
      <input
        type="range"
        min="0"
        max="100"
        v-model="sliderValue"
        @input="updateTimelineProgress"
        class="timeline-slider"
      />
      <div class="slider-labels">
        <span>Inizio</span>
        <span>Fine</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { animate, createTimeline } from "animejs";

// Definizione degli elementi della timeline
const timelineItems = ref([
  { text: "Fase 1", duration: 1000 },
  { text: "Fase 2", duration: 800 },
  { text: "Fase 3", duration: 1200 },
  { text: "Fase 4", duration: 900 },
]);

// Riferimenti agli elementi DOM
//const itemRefs = ref<HTMLElement[]>([]);
const itemRefs = ref<(HTMLElement | null)[]>([]);

// Valore dello slider
const sliderValue = ref(0);

// Riferimento alla timeline di Anime.js la dichiaro e la tipizzo a livello globale per poterla usare più facilmente
let timeline: ReturnType<typeof createTimeline>;

// Inizializzazione della timeline
onMounted(() => {
  // Creazione della timeline
  timeline = createTimeline({
    autoplay: false, // Disabilita l'autoplay per controllare manualmente
    // Remove easing property as it's not a valid TimelineParams property
    duration: 1000,
  });

  // Aggiungi animazioni per ogni elemento
  itemRefs.value.forEach((el, index) => {
    if (el) {
      timeline.add(el, {
        translateY: [100, 0],
        opacity: [0, 1],
        duration: timelineItems.value[index].duration,
        offset: index * 200, // Ritardo tra le animazioni
      });
    }
  });

  // Imposta la durata totale della timeline
  const totalDuration = timeline.duration;
  console.log(`Durata totale della timeline: ${totalDuration}ms`);
});

// Aggiorna la posizione della timeline in base al valore dello slider
const updateTimelineProgress = () => {
  if (timeline) {
    // Calcola la posizione nella timeline basata sul valore dello slider
    const progress = sliderValue.value / 100;
    const position = timeline.duration * progress;

    // Imposta la posizione della timeline
    timeline.seek(position);
    console.log(`Posizione timeline: ${position}ms`);
  }
};

// Osserva i cambiamenti del valore dello slider
watch(sliderValue, () => {
  updateTimelineProgress();
});
</script>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.animation-container {
  display: flex;
  justify-content: space-between;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.timeline-item {
  background-color: #3b82f6;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  opacity: 0;
  transform: translateY(100px);
  width: 120px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.slider-container {
  width: 100%;
}

.timeline-slider {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  appearance: none;
  background: #ddd;
  outline: none;
  border-radius: 5px;
}

.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  cursor: pointer;
  border-radius: 50%;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}
</style>
