<template>
  <div id="modules-element" class="element">
    <!-- <div class="elementSvg"> -->
    <div class="circular">
      <SvgModules id="modules_svg"></SvgModules>
      <p id="allinOne">All in One</p>
    </div>
    <!-- </div> -->
  </div>
  <div id="modules-content-wrapper" class="wrapper">
    <div id="modules-content" class="content">
      <div id="module-txt_1" class="module_card">
        <div class="mTitle">
          <h2>Screen</h2>
        </div>
        <div class="mSubTitle">
          <h3>Streaming & Discussion</h3>
        </div>
        <button
          @click.passive="openModal1"
          @touchstart.passive="openModal1"
          @pointerdown.passive="openModal1"
          @mousedown.passive="openModal1"
        >
          <BtnMaster>More</BtnMaster>
        </button>
      </div>
      <div id="module-txt_2" class="module_card">
        <div class="mTitle">
          <h2>Move</h2>
        </div>
        <div class="mSubTitle">
          <h3>File Exchange & Delivery</h3>
        </div>
        <button
          @click.passive="openModal2"
          @touchstart.passive="openModal2"
          @pointerdown.passive="openModal2"
          @mousedown.passive="openModal2"
        >
          <BtnMaster>More</BtnMaster>
        </button>
      </div>
      <div id="module-txt_3" class="module_card">
        <div class="mTitle">
          <h2>Preserve</h2>
        </div>
        <div class="mSubTitle">
          <h3>Perennial Availability</h3>
        </div>
        <button
          @click.passive="openModal3"
          @touchstart.passive="openModal3"
          @pointerdown.passive="openModal3"
          @mousedown.passive="openModal3"
        >
          <BtnMaster>More</BtnMaster>
        </button>
      </div>
    </div>
  </div>
  <ModalsModale100 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
</template>

<script setup>
// SECTION - SCRIPT
//le altre importazioni derivano dalla pagina principale
import { nextTick } from "vue";

// mipreparo le istanze dei modali
const isModalOpen = ref(false);
//const modalId = ref("");
const modalId = ref(null);

// Controlla se il dispositivo supporta eventi touch
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Apertura dei modali con registrazione evento
const { lockScroll, unlockScroll } = useScrollLock();

const openModal1 = () => {
  //apro il modale
  isModalOpen.value = true;
  modalId.value = "screen";
  lockScroll(); // Blocca lo scroll quando il modale è aperto
};
const openModal2 = () => {
  isModalOpen.value = true;
  modalId.value = "deliver";
  lockScroll();
};
const openModal3 = (event) => {
  isModalOpen.value = true;
  modalId.value = "preserve";
  lockScroll();
};

const closeModal = () => {
  isModalOpen.value = false;
  modalId.value = "";
  unlockScroll(); // Sblocca lo scroll quando il modale è chiuso
};

onMounted(() => {
  nextTick(() => {}); //NOTE - end nextTick
}); //NOTE - end onMounted
//!SECTION
</script>

<style lang="scss" scoped>
//SECTION - SCSS
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;

#modules-section-2 {
  #allinOne {
    position: absolute;
    color: #fff;
    font-size: 1.3rem;
    margin-bottom: 0;
    text-shadow:
      0 0 7px rgba(184, 239, 250, 1),
      0 0 10px rgba(184, 239, 250, 1),
      0 0 22px rgba(184, 239, 250, 1);
  }

  #modules-content {
    position: relative;
    justify-content: center;
    @include bp.for-tablet {
      align-items: center;
    }
  }

  .module_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 0;
    padding: 10px;
    width: 90%;

    @include bp.for-tablet {
      width: 50%;
    }

    .mTitle {
      color: $mne_text-on-dark;
    }

    .mSubTitle {
      color: $mne_secondary;
      font-weight: 400;
      text-align: center;
    }
  }

  #module-txt_1 {
    // display: none;
    opacity: 1;
  }

  #module-txt_2 {
    // display: none;
    opacity: 1;
  }

  #module-txt_3 {
    // display: none;
    opacity: 1;
  }
}

//!SECTION
</style>
