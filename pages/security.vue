<template>
  <div class="page-wrapper">
    <ContentRenderer v-if="page" :value="page" />
  </div>
  <!-- <button @click="isModalOpen = true">Open Modal rooms</button> -->
  <BtnMaster @click="isModalOpen = true">open Modale security</BtnMaster>
  <div style="height: 1000px; width: 100%; background: #e0e0e000">
    <!-- Spazio per controllo scroll con modal aperto -->
  </div>
  <!-- <ModalsModaleBase :isOpen="isModalOpen" @close="closeModal" /> -->
  <ModalsModale50 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
</template>

<script setup>
import { ref } from "vue";
definePageMeta({
  layout: "page-layout",
});
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

const isModalOpen = ref(false);
const modalId = "security"; // qui indico il nome del modale che devo aprire in content/modali50
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style lang="scss" scoped></style>
