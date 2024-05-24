<template>
    <div>
      <button ref="button" @click="showOverlay" class="open-btn">Apri Overlay</button>
      <FullScreenOverlay :visible="isOverlayVisible" :buttonRect="buttonRect">
        <p>Contenuto dell'overlay</p>
      </FullScreenOverlay>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import FullScreenOverlay from '~/components/FullScreenOverlay.vue';
  
  const isOverlayVisible = ref(false);
  const buttonRect = ref({});
  
  const showOverlay = () => {
    const button = document.querySelector('.open-btn');
    buttonRect.value = button.getBoundingClientRect();
    isOverlayVisible.value = true;
  };
  </script>
  
  <style scoped>
  .open-btn {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
  </style>
  