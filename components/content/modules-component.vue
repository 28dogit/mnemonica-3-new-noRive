<template>
  <!-- //SECTION - TEMPLATE -->
  <div id="modules-element" class="element">
    <Modules id="modules_svg"></Modules>
    <p id="allinOne">All in One</p>
  </div>
  <div id="modules-content-wrapper" class="wrapper">
    <div id="modules-content" class="content">
      <div id="module-txt_1" class="module_card">
        <slot></slot>
        <slot />
        <!-- <h2 class="mTitle">Screening Rooms</h2> -->
        <h2 class="mTitle"><slot name="screentitle" mdc-unwrap="p"></slot></h2>

        <h3 class="mSubTitle"><slot name="screensub" mdc-unwrap="p"></slot></h3>
        <button
          @click.passive="openModal1"
          @touchstart.passive="openModal1"
          @pointerdown.passive="openModal1"
          @mousedown.passive="openModal1"
        >
          <!-- pointerdown potrebbe sostituire touchstart e mousedown, perchè li contempla, per ora li tengo per sicurezza -->
          <FocusBTN></FocusBTN>
        </button>
      </div>
      <div id="module-txt_2" class="module_card">
        <h2 class="mTitle"><slot name="delivertitle"></slot></h2>
        <h3 class="mSubTitle"><slot name="deliversub"></slot></h3>
        <button
          @click.passive="openModal2"
          @touchstart.passive="openModal2"
          @pointerdown.passive="openModal2"
          @mousedown.passive="openModal2"
        >
          <FocusBTN></FocusBTN>
        </button>
      </div>
      <div id="module-txt_3" class="module_card">
        <h2 class="mTitle"><slot name="preservetitle"></slot></h2>
        <h3 class="mSubTitle"><slot name="preservesub"></slot></h3>
        <button
          @click.passive="openModal3"
          @touchstart.passive="openModal3"
          @pointerdown.passive="openModal3"
          @mousedown.passive="openModal3"
        >
          <FocusBTN></FocusBTN>
        </button>
      </div>
    </div>
  </div>
  <FocusRooms :isOpen="isModalOpen1" @close="closeModal" />
  <FocusBoxes :isOpen="isModalOpen2" @close="closeModal" />
  <FocusMasters :isOpen="isModalOpen3" @close="closeModal" />
  <!-- //!SECTION -->
</template>

<script setup>
// SECTION - SCRIPT
//le altre importazioni derivano dalla pagina principale
import { _zIndex } from "#tailwind-config/theme";
import { nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// mipreparo le istanze dei modali
const isModalOpen1 = ref(false);
const isModalOpen2 = ref(false);
const isModalOpen3 = ref(false);

// Controlla se il dispositivo supporta eventi touch
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Apertura dei modali con registrazione evento
const openModal1 = (event) => {
  //apro il modale
  isModalOpen1.value = true;
};
const openModal2 = (event) => {
  isModalOpen2.value = true;
};
const openModal3 = (event) => {
  isModalOpen3.value = true;
};

const closeModal = () => {
  isModalOpen1.value = false;
  isModalOpen2.value = false;
  isModalOpen3.value = false;
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

#modules-section {
  #modules-element {
    overflow: hidden;
  }
  #modules_svg {
    width: 95%;
    position: absolute;
  }
  #modules-content {
    // display: flex;
    // align-items: flex-start;
    position: relative;
    justify-content: center;
    @include bp.for-tablet-up {
      align-items: center;
    }
  }
  #allinOne {
    color: #fff;
    font-size: 1.3rem;
    margin-bottom: 0;
    text-shadow: 0 0 7px rgba(184, 239, 250, 1), 0 0 10px rgba(184, 239, 250, 1),
      0 0 22px rgba(184, 239, 250, 1);
  }
  .module_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 0;
    position: absolute;
    padding: 10px;
    width: 90%;
    @include bp.for-tablet-up {
      width: 50%;
    }
    .mTitle {
      color: $mne_text-on-dark;
    }
    .mSubTitle {
      color: $mne_secondary;
      font-weight: 300;
      text-align: center;
    }
  }
  #module-txt_1 {
    // display: none;
    opacity: 1;
  }
  #module-txt_2 {
    // display: none;
    opacity: 0;
  }
  #module-txt_3 {
    // display: none;
    opacity: 0;
  }
}
//!SECTION
</style>
