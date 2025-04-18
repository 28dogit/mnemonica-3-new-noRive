<template>
  <div class="page-wrapper">
    <!-- <div class="mausecoordinates">mouse: x: {{ x }} y: {{ y }}</div> -->
    <ContentRenderer v-if="page" :value="page" />
    <!-- <div class="testgrad"></div> -->
    <div class="video-box">
      <div class="video-box-content">
        <h1>Title video UI</h1>
        <h3>
          Spiegazione: dove si producono gli asset,<br />
          momento fabbrica complementare al <br />
          successivo archive
        </h3>
      </div>
      <video class="video-sfumato" autoplay loop muted playsinline preload="auto">
        <!-- <source calss="deskMq" src="/assets/video/room-cards_4.webm" type="video/webm" /> -->
        <source
          calss="mobileMq"
          src="/assets/video/box-2x-vertical.mp4"
          type="video/webm"
        />
        <source calss="deskMq" src="/assets/video/room-cards.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="divider"></div>

    <div class="video-box2">
      <div class="video-box-content">
        <h1>Title video UI</h1>
        <h3>
          Spiegazione: dove si producono gli asset,<br />
          momento fabbrica complementare al<br />
          successivo archive
        </h3>
      </div>
      <video class="video-sfumato2" autoplay loop muted playsinline preload="auto">
        <!-- <source calss="deskMq" src="/assets/video/room-cards_4.webm" type="video/webm" /> -->
        <source
          class="mobileMq"
          src="/assets/video/box-2x-vertical.mp4"
          type="video/webm"
        />
        <source calss="deskMq" src="/assets/video/room-cards.mp4" type="video/mp4" />
      </video>
    </div>
  </div>

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

const { $gsap } = useNuxtApp();

// const videoV = document.querySelector(".video-sfumato");
// videoV.playbackRate=2;

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

.divider {
  height: 200px;
}

.video-box {
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  // box-shadow: 0px 2px 18px 0px #E6EDF5;
  box-shadow: 27px 0px 39px -14px rgba(0, 0, 0, 0.43);
  border-radius: 0px 100px 100px 0px;
  overflow: hidden;
}

.video-box2 {
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
}

.video-box-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  padding: 2em;
}

.testgrad {
  height: 100px;
  width: 500px;
  // background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  background: linear-gradient(
    to right,
    transparent 0%,
    rgb(233 174 0 / 30%) 10%,
    rgb(68 85 209 / 60%) 20%,
    rgb(121 182 42 / 90%) 30%,
    #b62323 40%
  );
}

.video-sfumato {
  max-width: 40%;
  /* Applico una maschera con gradiente da trasparente a opaco su lato destro e in alto */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 10%,
    rgba(0, 0, 0, 0.6) 25%,
    rgba(0, 0, 0, 0.9) 40%,
    black 60%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 10%,
    rgba(0, 0, 0, 0.6) 25%,
    rgba(0, 0, 0, 0.9) 40%,
    black 60%
  );
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

.video-sfumato2 {
  max-width: 40%;
  /* Applico una maschera con gradiente da trasparente a opaco su lato destro e in alto */
  mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 10%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.9) 40%,
      black 60%
    ),
    linear-gradient(
      to top,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 10%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.9) 40%,
      black 60%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 10%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.9) 40%,
      black 60%
    );
  -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 10%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.9) 40%,
      black 60%
    ),
    linear-gradient(
      to top,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 10%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.9) 40%,
      black 60%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 10%,
      rgba(0, 0, 0, 0.6) 25%,
      rgba(0, 0, 0, 0.9) 40%,
      black 60%
    );
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
</style>
