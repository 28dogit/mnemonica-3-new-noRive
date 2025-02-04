<template>
  <!-- //SECTION - TEMPLATE -->
  <div id="modules-element" class="element">
    <Modules id="modules_svg"></Modules>
    <p id="allinOne">All in One</p>
  </div>
  <div id="modules-content-wrapper" class="wrapper">
    <div id="modules-content" class="content">
      <div id="module-txt_1" class="module_card">
        <!-- <h2 class="mTitle">Screening Rooms</h2> -->
        <h2 class="mTitle">Screen</h2>
        <h3 class="mSubTitle">streaming and discussion</h3>
        <button @click="isModalOpen1 = true">
          <FocusBTN></FocusBTN>
        </button>
      </div>
      <div id="module-txt_2" class="module_card">
        <!-- <h2 class="mTitle">Sharing Boxes</h2> -->
        <h2 class="mTitle">Deliver</h2>
        <h3 class="mSubTitle">data transfer</h3>
        <button @click="isModalOpen2 = true">
          <FocusBTN></FocusBTN>
        </button>
      </div>
      <div id="module-txt_3" class="module_card">
        <!-- <h2 class="mTitle">HQ Masters</h2> -->
        <h2 class="mTitle">Preserve</h2>
        <h3 class="mSubTitle">perennial availability</h3>
        <button @click="isModalOpen3 = true">
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

const isModalOpen1 = ref(false);
const isModalOpen2 = ref(false);
const isModalOpen3 = ref(false);

const closeModal = () => {
  isModalOpen1.value = false;
  isModalOpen2.value = false;
  isModalOpen3.value = false;
};

onMounted(() => {
  nextTick(() => {
    // console.log(
    //   "la logica di Gsap per questo componente eè affidata al composable useGsapModules.ts"
    // );
  }); //NOTE - end nextTick
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
    display: flex;
    align-items: flex-start;
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
