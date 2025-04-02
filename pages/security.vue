<template>
  <div class="page-wrapper">
    <div class="mausecoordinates">mouse: x: {{ x }} y: {{ y }}</div>
    <ContentRenderer v-if="page" :value="page" />
      <video
      class="video-sfumato"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
    >
      <!-- <source calss="deskMq" src="/assets/video/room-cards_4.webm" type="video/webm" /> -->
      <source calss="mobileMq" src="/assets/video/box-2x-vertical.mp4" type="video/webm" />
      <source calss="deskMq" src="/assets/video/room-cards.mp4" type="video/mp4" />
    </video>

    <video
      class="video-webm"
      autoplay
      loop
      muted
      playsinline
      src="/assets/video/room-cards_5.webm"
    ></video>
  </div>
  <!-- <button @click="isModalOpen = true">Open Modal rooms</button> -->
  <MneParallaxWrapper :speed="100">
    <BtnMaster @click="isModalOpen = true">open Modale security</BtnMaster>
  </MneParallaxWrapper>

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

const { x, y } = useMouse();
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

<style lang="scss" scoped>
@use "@/assets/css/_breakpoints.scss" as bp;

.mobileMq {
  @include bp.for-tablet {
    display: none;
  }
  @include bp.for-phone {
    display: block;
  }
}
.deskMq {
  @include bp.for-tablet {
    display: block;
  }
  @include bp.for-phone {
    display: none;
  }
}

.video-sfumato {
    display: block;
    width: 100%;
    height: auto;
    /* Applica una maschera con gradiente da trasparente a opaco */
    mask-image: linear-gradient(to right, 
        transparent 0%, 
        rgba(0, 0, 0, 0.3) 10%, 
        black 20%);
    -webkit-mask-image: linear-gradient(to right, 
        transparent 0%, 
        rgba(0, 0, 0, 0.3) 10%, 
        black 20%);
}
</style>
