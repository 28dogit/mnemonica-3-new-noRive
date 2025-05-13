<template>
  <div class="timeline-demo-container">
    <h1 class="text-2xl font-bold mb-6">Demo Timeline Avanzata con Slider</h1>
    <p class="mb-8">
      Questo componente permette di controllare una timeline animata tramite uno slider
    </p>

    <div class="demo-section">
      <h2 class="text-xl font-bold mb-4">Animazione Base</h2>
      <MneTimelineSlider />
    </div>

    <div class="demo-section mt-12">
      <h2 class="text-xl font-bold mb-4">Animazione Avanzata</h2>
      <MneTimelineSliderAdvanced
        title="Processo di Sviluppo"
        description="Le fasi principali del processo di sviluppo software"
        :items="developmentItems"
        startLabel="Inizio Progetto"
        endLabel="Rilascio"
        animationType="slide-in"
        :containerHeight="350"
      />
    </div>

    <div class="demo-section mt-12">
      <h2 class="text-xl font-bold mb-4">Animazione con Effetto Scala</h2>
      <MneTimelineSliderAdvanced
        title="Ciclo di Vita del Prodotto"
        description="Dall'idea al lancio sul mercato"
        :items="productItems"
        startLabel="Concetto"
        endLabel="Mercato"
        animationType="scale"
        :containerHeight="300"
        :autoplay="true"
      />
    </div>

    <div class="mt-12 p-6 bg-gray-100 rounded-lg">
      <h2 class="text-xl font-bold mb-4">Come Utilizzare il Componente</h2>
      <p class="mb-4">
        Il componente TimelineSlider permette di controllare manualmente l'avanzamento di
        una timeline animata tramite uno slider.
      </p>
      <p class="mb-2">Caratteristiche principali:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Controllo manuale dell'animazione tramite slider</li>
        <li>Possibilità di riproduzione automatica</li>
        <li>Diversi tipi di animazione (fade-up, fade-in, slide-in, scale)</li>
        <li>Personalizzazione completa degli elementi</li>
        <li>Design responsive</li>
      </ul>
      <p>
        Spostando lo slider da sinistra a destra, puoi controllare manualmente la
        progressione dell'animazione.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Dati per la timeline di sviluppo software
const developmentItems = ref([
  {
    title: "Analisi",
    text: "Requisiti e specifiche",
    duration: 1000,
    color: "#3b82f6",
    icon: "i-lucide-clipboard-list",
  },
  {
    title: "Design",
    text: "Architettura e UI/UX",
    duration: 800,
    color: "#10b981",
    icon: "i-lucide-pencil",
  },
  {
    title: "Sviluppo",
    text: "Implementazione",
    duration: 1200,
    color: "#f59e0b",
    icon: "i-lucide-code",
  },
  {
    title: "Testing",
    text: "QA e debugging",
    duration: 900,
    color: "#6366f1",
    icon: "i-lucide-bug",
  },
  {
    title: "Deployment",
    text: "Rilascio in produzione",
    duration: 700,
    color: "#ec4899",
    icon: "i-lucide-rocket",
  },
]);

// Dati per la timeline del ciclo di vita del prodotto
const productItems = ref([
  {
    title: "Ideazione",
    text: "Concetto iniziale",
    duration: 1000,
    color: "#8b5cf6",
    icon: "i-lucide-lightbulb",
  },
  {
    title: "Ricerca",
    text: "Analisi di mercato",
    duration: 1200,
    color: "#14b8a6",
    icon: "i-lucide-search",
  },
  {
    title: "Prototipo",
    text: "Versione di test",
    duration: 900,
    color: "#f97316",
    icon: "i-lucide-layers",
  },
  {
    title: "Lancio",
    text: "Rilascio sul mercato",
    duration: 800,
    color: "#ef4444",
    icon: "i-lucide-flag",
  },
]);
</script>

<style scoped>
.timeline-demo-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.demo-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2rem;
}
</style>
