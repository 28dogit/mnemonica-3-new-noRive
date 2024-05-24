<template>
    <div>
      <button ref="button" @click="showOverlay" class="open-btn">Apri Overlay</button>
      <FullScreenOverlay :visible="isOverlayVisible" :buttonRect="buttonRect">
        <p>Contenuto dell'overlay new</p>
      </FullScreenOverlay>
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick } from 'vue';
  import FullScreenOverlay from '~/components/FullScreenOverlay.vue';
  
  const isOverlayVisible = ref(false);
  const buttonRect = ref({});
  
  const showOverlay = async () => {
    const button = document.querySelector('.open-btn');
    buttonRect.value = button.getBoundingClientRect();
    await nextTick();
    isOverlayVisible.value = true;
  };
  </script>
  
  <style scoped>
  .open-btn {
    position: fixed;
    top:300px;
    right: 70px;
    padding: 20px;
    font-size: 1rem;
    cursor: pointer;
  }
  </style>
  