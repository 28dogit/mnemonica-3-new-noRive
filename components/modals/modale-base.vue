<template>
  <teleport to="body">
    <!-- <div class="modal-wrapper"> --
      <!-- <ClientOnly> -->
    <div calss="fondale"></div>
    <dialog
      id="mioModale"
      ref="myModal"
      :class="{ horizontal: isMounted && !isPortrait }"
    >
      <!-- aggiungo una classe dinamica horizontal che viene aggiunta quando la viewport non è portrait -->
      <div ref="modalContent" class="modal-content" id="m-content">
        <button
          class="modal-x-btn"
          @click.passive="closeModal"
          @touchstart.passive="closeModal"
          @pointerdown.passive="closeModal"
          @mousedown.passive="closeModal"
        >
          <BtnClose></BtnClose>
        </button>
        <div ref="modalInner" class="modal-inner">contenuto modale</div>
      </div>
    </dialog>
    <!-- </ClientOnly> -->
  </teleport>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  computed,
  watch,
  nextTick,
} from "vue";
import { useWindowSize } from "@vueuse/core";
const { $gsap } = useNuxtApp();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const isClient = ref(false);
const isMounted = ref(false);
const myModal = ref(null);
const modalContent = ref(null);
const modalInner = ref(null);
const { width, height } = useWindowSize({
  initialWidth: 0,
  initialHeight: 0,
});

// Function to disable body scroll when modal is open
const disableBodyScroll = () => {
  if (isClient.value && typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
  }
};

// Function to enable body scroll when modal is closed
const enableBodyScroll = () => {
  if (isClient.value && typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
};

//controllo il rapporto tra altezza e larghezza della viewport
const isPortrait = computed(() => {
  if (!isMounted.value) return true;
  return height.value > width.value;
});

//imposto le props da passare in base al rapporto della viewport
//creo la funzione (freccia) AnimationProps che passerà isOpening come come parametro booleano che indica se il modale si sta aprendo (true) o chiudendo (false)
const AnimationProps = (isOpening) => {
  //se isPortait è valido
  if (isPortrait.value) {
    // Entrata dal basso per orientamento verticale
    return {
      y: isOpening ? "100%" : "100%", //isOpening true = si sta aprendo e y sarà 100, se è false si sta chiudendo quindi y sarà 0
      x: "0%",
      opacity: 0,
    };
  } else {
    // Entrata da destra per orientamento orizzontale, in questo caso usiamo la x
    return {
      x: isOpening ? "100%" : "100%",
      y: "0%",
      opacity: 0,
    };
  }
};
//i valori di questa funzione x,y,opacity vengono passati a gsap per l'animazione

//apro il modale
const openModal = () => {
  //myModal.value.showModal();
  //prendo i valori delle props dalla funzione AnimationProps passando isOpening=true
  const { x, y, opacity } = AnimationProps(true);
  //le passo a gsap
  $gsap.fromTo(
    myModal.value,
    { opacity, x, y },
    {
      opacity: 1,
      x: isPortrait.value ? "0%" : "0%",
      y: isPortrait.value ? "0%" : "0%",
      duration: 0.3,
      ease: "power2.out",
    }
  );
  $gsap.fromTo(
    modalContent.value,
    { opacity, x, y },
    {
      opacity: 1,
      x: isPortrait.value ? "0%" : "50%",
      y: isPortrait.value ? "50%" : "0%",
      duration: 1,
      ease: "power2.out",
    }
  );
};
//chiudo il modale
const closeModal = () => {
  const { x, y, opacity } = AnimationProps(false); //passiamo isOpening = false
  $gsap.to([modalContent.value, myModal.value], {
    opacity,
    x,
    y,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      // myModal.value.close();
      emit("close");
    },
  });
};

const handleScroll = (event) => {
  if (!isPortrait.value) {
    event.preventDefault();
    event.stopPropagation();

    $gsap.to(modalInner.value, {
      scrollTo: {
        x: modalInner.value.scrollLeft + event.deltaY * 6,
      },
      ease: "power2",
      duration: 0.5,
    });
  }
};

//tengo d'occhio la props isOpen
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      disableBodyScroll();
      openModal();
    } else {
      enableBodyScroll();
    }
  },
  { immediate: true }
);

// // Add these new functions
// const preventBodyScroll = (event) => {
//   if (props.isOpen) {
//     event.preventDefault();
//   }
// };

onMounted(() => {
  isClient.value = true;
  nextTick(() => {
    isMounted.value = true;
    isPortrait.value = height.value > width.value;
  });

  //metto in pausa l'animazione di apertura del modale
  $gsap
    .fromTo(
      myModal.value,
      { opacity: 0, x: "100%", y: "100%" },
      { opacity: 1, x: "0%", y: "0%", duration: 0.5, ease: "power2.out" }
    )
    .pause();

  modalInner.value.addEventListener("wheel", handleScroll, { passive: false });

  // const cClose = document.querySelector(".modal-x-btn");

  // const animation = $gsap.fromTo(
  //   "#x-circle",
  //   { opacity: 0, scale: 1, transformOrigin: "58% 50%", rotate: 0 },
  //   {
  //     scale: 1.3,
  //     opacity: 0.3,
  //     rotate: 360,
  //     duration: 0.3,
  //     ease: "power2",
  //     transformOrigin: "58% 50%",
  //     // repeat: -1,
  //     // yoyo: true,
  //   }
  // );

  // animation.pause();

  // cClose.addEventListener("mouseenter", () => animation.play());
  // cClose.addEventListener("mouseleave", () => animation.reverse());
});

onBeforeUnmount(() => {
  modalInner.value.removeEventListener("wheel", handleScroll);
  enableBodyScroll();
});

onUnmounted(() => {
  enableBodyScroll();
});
</script>

<style lang="scss" scoped></style>
