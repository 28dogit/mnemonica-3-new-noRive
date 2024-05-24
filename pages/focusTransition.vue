<template>
  <div>
    <!-- Integrare componente NUXT UI e centrare bene il punto di partenza calcolare padding eventuali -->
    <!-- <button ref="button" @click="showOverlay" class="open-btn">Apri Overlay</button> -->
    <UButton
      label="Open Overlay Focus"
      ref="button"
      @click="showOverlay"
      class="open-btn"
      icon="i-heroicons-pencil-square"
      size="sm"
      color="primary"
      variant="soft"
      :ui="{
        strategy: 'override',
        color: {
          primary: {
            soft: 'bg-white dark:bg-orange-900 text-red-600',
          },
        },
      }"
    />
    <FullScreenOverlay :visible="isOverlayVisible" :buttonRect="buttonRect">
      <p>Contenuto dell'overlay new</p>
    </FullScreenOverlay>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import FullScreenOverlay from "~/components/FullScreenOverlay.vue";

const isOverlayVisible = ref(false);
const buttonRect = ref({});

const showOverlay = async () => {
  const button = document.querySelector(".open-btn");
  buttonRect.value = button.getBoundingClientRect();
  await nextTick();
  isOverlayVisible.value = true;
};
</script>

<style scoped>
.open-btn {
  padding: 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
