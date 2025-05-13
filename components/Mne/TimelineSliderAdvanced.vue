<template>
  <div class="timeline-container">
    <!-- Titolo e descrizione -->
    <div v-if="showHeader" class="timeline-header">
      <h3 class="timeline-title">{{ title }}</h3>
      <p v-if="description" class="timeline-description">{{ description }}</p>
    </div>

    <!-- Elementi da animare -->
    <div class="animation-container" :style="{ height: `${containerHeight}px` }">
      <div
        v-for="(item, index) in timelineItems"
        :key="index"
        :ref="(el) => (itemRefs[index] = el as HTMLElement)"
        class="timeline-item"
        :class="[`item-${index}`, item.customClass]"
        :style="getItemStyle(item)"
      >
        <div v-if="item.icon" class="item-icon" :class="item.icon"></div>
        <div class="item-content">
          <h4 v-if="item.title" class="item-title">{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>

    <!-- Slider per controllare la timeline -->
    <div class="slider-container">
      <div class="slider-controls">
        <button @click="resetTimeline" class="control-button">
          <span class="i-lucide-rotate-ccw"></span>
        </button>
        <input
          type="range"
          min="0"
          max="100"
          v-model="sliderValue"
          @input="updateTimelineProgress"
          class="timeline-slider"
        />
        <button @click="playTimeline" class="control-button">
          <span :class="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'"></span>
        </button>
      </div>
      <div class="slider-labels">
        <span>{{ startLabel }}</span>
        <span>{{ endLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { animate, createTimeline } from "animejs";

// Props per personalizzare il componente
const props = defineProps({
  title: {
    type: String,
    default: "Timeline Animata",
  },
  description: {
    type: String,
    default: "",
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
  startLabel: {
    type: String,
    default: "Inizio",
  },
  endLabel: {
    type: String,
    default: "Fine",
  },
  containerHeight: {
    type: Number,
    default: 300,
  },
  animationType: {
    type: String,
    default: "fade-up", // Opzioni: 'fade-up', 'fade-in', 'slide-in', 'scale'
    validator: (value: string) =>
      ["fade-up", "fade-in", "slide-in", "scale"].includes(value),
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
});

// Definizione degli elementi della timeline
const timelineItems = computed(() => {
  if (props.items && props.items.length > 0) {
    return props.items;
  }

  // Elementi predefiniti se non vengono forniti
  return [
    {
      title: "Fase 1",
      text: "Inizializzazione",
      duration: 1000,
      color: "#3b82f6",
      icon: "i-lucide-flag",
    },
    {
      title: "Fase 2",
      text: "Elaborazione",
      duration: 800,
      color: "#10b981",
      icon: "i-lucide-settings",
    },
    {
      title: "Fase 3",
      text: "Verifica",
      duration: 1200,
      color: "#f59e0b",
      icon: "i-lucide-check-circle",
    },
    {
      title: "Fase 4",
      text: "Completamento",
      duration: 900,
      color: "#6366f1",
      icon: "i-lucide-check-square",
    },
  ];
});

// Riferimenti agli elementi DOM
const itemRefs = ref<HTMLElement[]>([]);

// Valore dello slider
const sliderValue = ref(0);

// Stato di riproduzione
const isPlaying = ref(false);
let playInterval: number | null = null;

// Riferimento alla timeline di Anime.js
let timeline: ReturnType<typeof createTimeline>;

// Funzione per ottenere lo stile personalizzato per ogni elemento
const getItemStyle = (item: any) => {
  return {
    backgroundColor: item.color || "#3b82f6",
    width: item.width || "150px",
    height: item.height || "100px",
  };
};

// Inizializzazione della timeline
onMounted(() => {
  initializeTimeline();

  // Avvia l'autoplay se abilitato
  if (props.autoplay) {
    playTimeline();
  }
});

// Funzione per inizializzare la timeline
const initializeTimeline = () => {
  // Creazione della timeline
  timeline = createTimeline({
    autoplay: false, // Disabilita l'autoplay per controllare manualmente
    //easing: "easeInOutQuad",
    duration: 1000,
  });

  // Aggiungi animazioni per ogni elemento in base al tipo di animazione selezionato
  itemRefs.value.forEach((el, index) => {
    if (el) {
      let animation: any = {};

      // Configurazione dell'animazione in base al tipo selezionato
      switch (props.animationType) {
        case "fade-up":
          animation = {
            translateY: [100, 0],
            opacity: [0, 1],
          };
          break;
        case "fade-in":
          animation = {
            opacity: [0, 1],
          };
          break;
        case "slide-in":
          animation = {
            translateX: [-100, 0],
            opacity: [0, 1],
          };
          break;
        case "scale":
          animation = {
            scale: [0, 1],
            opacity: [0, 1],
          };
          break;
        default:
          animation = {
            translateY: [50, 0],
            opacity: [0, 1],
          };
      }

      // Aggiungi l'animazione alla timeline
      timeline.add(el, {
        ...animation,
        duration: timelineItems.value[index].duration || 1000,
        offset: index * 300, // Ritardo tra le animazioni
      });
    }
  });

  // Imposta la durata totale della timeline
  const totalDuration = timeline.duration;
  console.log(`Durata totale della timeline: ${totalDuration}ms`);
};

// Aggiorna la posizione della timeline in base al valore dello slider
const updateTimelineProgress = () => {
  if (timeline) {
    // Calcola la posizione nella timeline basata sul valore dello slider
    const progress = sliderValue.value / 100;
    const position = timeline.duration * progress;

    // Imposta la posizione della timeline
    timeline.seek(position);
  }
};

// Riproduce o mette in pausa la timeline
const playTimeline = () => {
  if (isPlaying.value) {
    // Metti in pausa
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
    }
    isPlaying.value = false;
  } else {
    // Avvia la riproduzione
    isPlaying.value = true;

    // Crea un intervallo per incrementare gradualmente il valore dello slider
    playInterval = window.setInterval(() => {
      if (sliderValue.value < 100) {
        sliderValue.value += 1;
      } else {
        // Ferma l'intervallo quando raggiunge il 100%
        if (playInterval) {
          clearInterval(playInterval);
          playInterval = null;
          isPlaying.value = false;
        }
      }
    }, timeline.duration / 100); // Dividi la durata totale in 100 passi
  }
};

// Resetta la timeline
const resetTimeline = () => {
  // Ferma la riproduzione se è in corso
  if (isPlaying.value) {
    if (playInterval) {
      clearInterval(playInterval);
      playInterval = null;
    }
    isPlaying.value = false;
  }

  // Reimposta lo slider a 0
  sliderValue.value = 0;

  // Aggiorna la timeline
  updateTimelineProgress();
};

// Osserva i cambiamenti del valore dello slider
watch(sliderValue, () => {
  updateTimelineProgress();
});

// Pulisci gli intervalli quando il componente viene distrutto
onBeforeUnmount(() => {
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
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

.timeline-header {
  text-align: center;
  margin-bottom: 1rem;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.timeline-description {
  color: #666;
  font-size: 0.9rem;
}

.animation-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.timeline-item {
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  opacity: 0;
  transform: translateY(100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.timeline-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.item-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.item-content {
  text-align: center;
}

.item-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.slider-container {
  width: 100%;
}

.slider-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.control-button:hover {
  background-color: #2563eb;
}

.timeline-slider {
  flex: 1;
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
  transition: background-color 0.3s ease;
}

.timeline-slider::-webkit-slider-thumb:hover {
  background: #2563eb;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .animation-container {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .timeline-item {
    width: 80% !important;
  }
}
</style>
