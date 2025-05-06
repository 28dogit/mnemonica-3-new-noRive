<template>
  <teleport to="body">
    <dialog
      id="mioModale_2"
      ref="myModal"
      :class="{ horizontal50: isMounted && !isPortrait }"
      @click="(e) => e.target === myModal && closeModal()"
    >
      <!-- aggiungo una classe dinamica horizontal che viene aggiunta quando la viewport non è portrait -->
      <div ref="modalContent" class="modal-content" id="m-content">
        <!-- <p>Modal ID: {{ isModal }}</p> -->
        <button
          class="modal-x-btn"
          @click.passive="closeModal"
          @touchstart.passive="closeModal"
          @pointerdown.passive="closeModal"
          @mousedown.passive="closeModal"
        >
          <BtnClose></BtnClose>
        </button>
        <!-- <div ref="modalInner" class="modal-inner">
          <ContentRenderer v-if="modalContentData" :value="modalContentData" />
        </div> -->
        <div class="modal-inner">
          <ContentRenderer v-if="modalContentData" :value="modalContentData" />
        </div>
        <div class="modal-inner-2">
          <MneFormContact>Get in touch</MneFormContact>
        </div>
      </div>
    </dialog>
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
  isModal: {
    type: String,
    //default: "",
  },
});

const currentModalType = computed(() => props.isModal);

//carico i dati .md
// const { data: modalContentData } = await useAsyncData(
//   `/modali50/${props.isModal}`,
//   () => {
//     return queryCollection("content").path(`/modali50/${props.isModal}`).first();
//   }
// );
const modalContentData = ref(null);

const emit = defineEmits(["close"]);

const isClient = ref(false);
const isMounted = ref(false);
const myModal = ref(null);
const modalContent = ref(null);
//const modalInner = ref(null);
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
    document.body.style.overflow = "auto";
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
      y: isOpening ? "100vh" : "100vh", //isOpening true = si sta aprendo e y sarà 100, se è false si sta chiudendo quindi y sarà 0
      x: "0%",
      opacity: 0,
    };
  } else {
    // Entrata da destra per orientamento orizzontale, in questo caso usiamo la x
    return {
      x: isOpening ? "100vw" : "100vw",
      y: "0%",
      opacity: 0,
    };
  }
};
//i valori di questa funzione x,y,opacity vengono passati a gsap per l'animazione

//apro il modale
const openModal = () => {
  //prendo i valori delle props dalla funzione AnimationProps passando isOpening=true
  const { x, y, opacity } = AnimationProps(true);
  //le passo a gsap
  $gsap.set(myModal.value, { opacity: 1, x: "0%", y: "0%" });
  $gsap.to(myModal.value, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  });
  $gsap.fromTo(
    modalContent.value,
    { opacity, x, y },
    {
      opacity: 1,
      x: isPortrait.value ? "0vw" : "50vw",
      y: isPortrait.value ? "50vh" : "0vh",
      duration: 1,
      ease: "power2.out",
    }
  );
};
//chiudo il modale
const closeModal = () => {
  const { x, y, opacity } = AnimationProps(false); //passiamo isOpening = false
  $gsap.to(myModal.value, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      $gsap.set(myModal.value, { opacity: 1, x: "100%", y: "100%" });
      emit("close");
    },
  });
  $gsap.to(modalContent.value, {
    opacity,
    x,
    y,
    duration: 0.3,
    ease: "power2.in",
  });
};

// const handleScroll = (event) => {
//   if (!isPortrait.value) {
//     event.preventDefault();
//     event.stopPropagation();

//     $gsap.to(modalInner.value, {
//       scrollTo: {
//         x: modalInner.value.scrollLeft + event.deltaY * 6,
//       },
//       ease: "power2",
//       duration: 0.5,
//     });
//   }
// };

const lastOpenedModalType = ref("");

//tengo d'occhio la props isOpen
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      lastOpenedModalType.value = currentModalType.value;
      disableBodyScroll();
      openModal();
    } else {
      if (
        lastOpenedModalType.value !== "screen" &&
        lastOpenedModalType.value !== "deliver" &&
        lastOpenedModalType.value !== "preserve"
      ) {
        enableBodyScroll();
      }
    }
  },
  { immediate: true }
);
watch(
  () => props.isModal,
  async (newModalId) => {
    if (newModalId) {
      const { data } = await useAsyncData(`/modali50/${newModalId}`, () =>
        queryCollection("content").path(`/modali50/${newModalId}`).first()
      );
      modalContentData.value = data.value;
    }
  },
  { immediate: true }
);
//console.log("modalOpenIs", currentModalType.value);

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

  //modalInner.value.addEventListener("wheel", handleScroll, { passive: false });
});

onBeforeUnmount(() => {
  //modalInner.value.removeEventListener("wheel", handleScroll);
});

onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.horizontal50 .modal-content {
  max-width: 50vw;
}
.modal-inner {
  box-sizing: border-box;
  min-height: 50vh;
  height: 50vh;
}
.modal-inner-2 {
  box-sizing: border-box;
  min-height: 100vh;
  height: 100vh;
  padding: 2em 4em;
}
.modal-content {
  height: auto;
}
</style>
