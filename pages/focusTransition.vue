<template>
  <div>
    <!-- Integrare componente NUXT UI e centrare bene il punto di partenza calcolare padding eventuali -->
    <!-- <button ref="button" @click="showOverlay" class="open-btn">Apri Overlay</button> -->
    <UButton
      label="Open Overlay Focus"
      ref="button"
      @click="showOverlay"
      class="open-btn cursor-pointer text-base p-5"
      icon="i-heroicons-pencil-square"
      size="sm"
      color="primary"
      variant="soft"
    />
    <FullScreenOverlay
      :visible.sync="isOverlayVisible"
      :buttonRect="buttonRect"
      @update:visible="isOverlayVisible = $event"
    >
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

<style scoped></style>
