<template>
  <!-- //SECTION - TEMPLATE -->
  <div id="modules-element" class="element">
    <!-- <div class="elementSvg"> -->
    <SvgModules id="modules_svg"></SvgModules>
    <p id="allinOne">All in One</p>
    <!-- </div> -->
  </div>
  <div id="modules-content-wrapper" class="wrapper">
    <div id="modules-content" class="content">
      <div id="module-txt_1" class="module_card">
        <div class="mTitle" v-if="slots.title1" v-html="slots.title1"></div>
        <div class="mSubTitle" v-if="slots.subtitle1" v-html="slots.subtitle1"></div>
        <button
          @click.passive="openModal1"
          @touchstart.passive="openModal1"
          @pointerdown.passive="openModal1"
          @mousedown.passive="openModal1"
        >
          <!-- pointerdown potrebbe sostituire touchstart e mousedown, perchè li contempla, per ora li tengo per sicurezza -->
          <BtnFocus></BtnFocus>
        </button>
      </div>
      <div id="module-txt_2" class="module_card">
        <div class="mTitle" v-if="slots.title2" v-html="slots.title2"></div>
        <div class="mSubTitle" v-if="slots.subtitle2" v-html="slots.subtitle2"></div>
        <div class="mLinks" v-if="slots.link21" v-html="slots.link21"></div>
        <div class="mLinks" v-if="slots.link22" v-html="slots.link22"></div>
        <button
          @click.passive="openModal2"
          @touchstart.passive="openModal2"
          @pointerdown.passive="openModal2"
          @mousedown.passive="openModal2"
        >
          <BtnFocus></BtnFocus>
        </button>
      </div>
      <div id="module-txt_3" class="module_card">
        <h2 class="mTitle">Preserve</h2>
        <h3 class="mSubTitle">perennial availability</h3>
        <button
          @click.passive="openModal3"
          @touchstart.passive="openModal3"
          @pointerdown.passive="openModal3"
          @mousedown.passive="openModal3"
        >
          <BtnFocus></BtnFocus>
        </button>
      </div>
    </div>
  </div>
  <ModalsModale50 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
  <!-- //!SECTION -->
</template>

<script setup>
//SECTION - Nuxt Content CMS

//Uso il composable useExtractSlots per estrarre i dati dal file di markup (slot da estrarre, file .md da leggere)
const { fetchSection } = useExtractSlots("modules", "sections-index");

// Estraggo i dati per ottenere i testi degli slot che mi servono più il file di default nell'html fare riferimento al nome dello slot da richiamare nel file di markup
const { slots, defaultContent } = fetchSection();

//!SECTION
// SECTION - SCRIPT
//le altre importazioni derivano dalla pagina principale
import { _zIndex } from "#tailwind-config/theme";
import { nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// mipreparo le istanze dei modali
const isModalOpen = ref(false);
const modalId = ref("");

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

#modules-section {
  #modules-element {
    overflow: hidden;
  }
  #modules_svg {
    width: 95%;
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }
  #allinOne {
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    color: #fff;
    font-size: 1.3rem;
    margin-bottom: 0;
    text-shadow: 0 0 7px rgba(184, 239, 250, 1), 0 0 10px rgba(184, 239, 250, 1),
      0 0 22px rgba(184, 239, 250, 1);
  }
  #modules-content {
    // display: flex;
    // align-items: flex-start;
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
    position: absolute;
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
