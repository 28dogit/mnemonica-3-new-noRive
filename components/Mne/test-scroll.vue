<template>
    <div class="parallax-container" ref="parallaxContainer">
      <div class="parallax-item" :style="{ transform: `translateY(${parallaxY1}px)` }">
        Contenuto del primo div
      </div>
      <div class="parallax-item2" :style="{ transform: `translateY(${parallaxY2}px)` }">
        Contenuto del secondo div
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useWindowScroll } from '@vueuse/core';
  
  const parallaxContainer = ref(null);
  const { y: scrollY } = useWindowScroll();
  
  const parallaxY1 = ref(0);
  const parallaxY2 = ref(0);
  
  const updateParallax = () => {
    if (parallaxContainer.value) {
      const rect = parallaxContainer.value.getBoundingClientRect();
      const offsetY1 = (scrollY.value - rect.top) * 0.9; // Velocità di scorrimento del primo div
      const offsetY2 = (scrollY.value - rect.top) * 0.6; // Velocità di scorrimento del secondo div
      parallaxY1.value = offsetY1;
      parallaxY2.value = offsetY2;
    }
  };
  
  onMounted(() => {
    window.addEventListener('scroll', updateParallax);
    updateParallax(); // Inizializza l'effetto parallasse
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateParallax);
  });
  </script>
  
  <style scoped>
  .parallax-container {
    position: relative;
    height: 100vh; /* Altezza del contenitore */
    overflow: auto;
  }
  
  .parallax-item {
    background-color: lightcoral;
    position: absolute;
    width: 100%;
    height: 30%;
    will-change: transform;
  }
  .parallax-item2 {
    background-color: aquamarine;
    position: absolute;
    width: 100%;
    top: 200px;
    height: 40%;
    will-change: transform;
  }
  </style>
  