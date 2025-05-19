<template>
  <teleport to="#teleports">
    <dialog
      id="mioModale"
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
        <!-- Pulsante Espandi/Riduci -->
        <!-- <button
          v-if="isPortrait && props.isOpen"
          @click="toggleExpand"
          class="modal-expand-btn"
          :aria-expanded="isExpanded.toString()"
        >
          {{ isExpanded ? "Riduci" : "Espandi" }}
        </button> -->
        <!-- <div ref="modalInner" class="modal-inner">
          <ContentRenderer v-if="modalContentData" :value="modalContentData" />
        </div> -->
        <div class="modal-inner">
          <ContentRenderer v-if="modalContentData" :value="modalContentData" />
          <UButton
            :trailing-icon="isExpanded ? 'i-lucide-arrow-down' : 'i-lucide-arrow-up'"
            size="md"
            color="neutral"
            v-if="isPortrait && props.isOpen"
            @click="toggleExpand"
            class="modal-expand-btn"
            :aria-expanded="isExpanded.toString()"
            >{{ isExpanded ? "Back to info" : "Discover what Mnemonica can do for you" }}
          </UButton>
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
const modalContentData = ref(null);

const emit = defineEmits(["close"]);

const isClient = ref(false);
const isMounted = ref(false);
const myModal = ref(null);
const modalContent = ref(null);
const { width, height } = useWindowSize({
  initialWidth: 0,
  initialHeight: 0,
});

const isExpanded = ref(false); // Nuova variabile di stato per l'espansione

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

const AnimationProps = (isOpening) => {
  if (isPortrait.value) {
    return {
      y: isOpening ? "100vh" : "100vh",
      x: "0%",
      opacity: 0,
    };
  } else {
    return {
      x: isOpening ? "100vw" : "100vw",
      y: "0%",
      opacity: 0,
    };
  }
};

const openModal = () => {
  const { x: offScreenX, y: offScreenY, opacity: offScreenOpacity } = AnimationProps(
    true
  );
  $gsap.set(myModal.value, { opacity: 1, x: "0%", y: "0%" });
  $gsap.to(myModal.value, {
    opacity: 1,
    duration: 0.3,
    ease: "power2.out",
  });

  let initialContentProps = { opacity: offScreenOpacity, x: offScreenX, y: offScreenY };
  let targetContentProps = {
    opacity: 1,
    x: isPortrait.value ? "0vw" : "50vw",
    y: isPortrait.value ? "50vh" : "0vh",
    duration: 1,
    ease: "power2.out",
  };

  // Quando si apre in portrait, assicurarsi che non sia espanso e l'altezza sia per 50%
  if (isPortrait.value) {
    isExpanded.value = false; // Resetta lo stato di espansione all'apertura
    // L'altezza di modalContent è 'auto' da CSS, overflow-y è 'hidden'.
    // Posizionando a y: '50vh', si vedrà la parte superiore (50vh) del contenuto.
  }

  $gsap.fromTo(modalContent.value, initialContentProps, targetContentProps);
};

const closeModal = () => {
  const { x, y, opacity } = AnimationProps(false);
  $gsap.to(myModal.value, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      $gsap.set(myModal.value, { opacity: 1, x: "100%", y: "100%" });
      // Resetta l'altezza di modalContent se è stata modificata dall'espansione
      if (isPortrait.value && isExpanded.value) {
        modalContent.value.style.height = ""; // Rimuove lo stile inline, torna a CSS
      }
      isExpanded.value = false; // Resetta lo stato di espansione
      emit("close");
    },
  });

  $gsap.to(modalContent.value, {
    opacity,
    x,
    y,
    duration: 0.3,
    ease: "power2.in",
    // Non è necessario onComplete qui se il reset principale è in myModal.value.onComplete
  });
};

const animateExpandCollapse = (expand) => {
  if (!isPortrait.value) return;
  if (expand) {
    // Animazione per espandere a 100%
    $gsap.to(modalContent.value, {
      y: "0vh",
      height: "100vh",
      overflowY: "auto",
      duration: 0.7,
      ease: "power2.out",
    });
  } else {
    // Animazione per ridurre a 50%
    $gsap.to(modalContent.value, {
      y: "50vh",
      height: "50vh",
      overflowY: "hidden", // Già 'hidden' da CSS, ma per coerenza
      duration: 0.7,
      ease: "power2.inOut",
    });
  }
};

const toggleExpand = () => {
  if (!isPortrait.value) return;
  isExpanded.value = !isExpanded.value;
  animateExpandCollapse(isExpanded.value);
};

const lastOpenedModalType = ref("");

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
      // closeModal è già chiamato dal click sul pulsante X o sull'overlay
      // Se props.isOpen diventa false programmaticamente, closeModal dovrebbe essere chiamato.
      // Tuttavia, la logica attuale di chiusura è guidata dall'utente.
      // Se props.isOpen può cambiare esternamente, potrebbe essere necessario chiamare closeModal qui.
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

onMounted(() => {
  isClient.value = true;
  nextTick(() => {
    isMounted.value = true;
    // isPortrait.value è già calcolato dal computed property basato su useWindowSize
  });

  $gsap
    .fromTo(
      myModal.value,
      { opacity: 0, x: "100%", y: "100%" },
      { opacity: 1, x: "0%", y: "0%", duration: 0.5, ease: "power2.out" }
    )
    .pause();
});

onBeforeUnmount(() => {});
onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.horizontal50 .modal-content {
  max-width: 50vw;
}
.modal-inner {
  box-sizing: border-box;
  min-height: 50vh; /* Altezza del contenuto visibile inizialmente in portrait non espanso */
  height: 50vh;
}
.modal-inner-2 {
  box-sizing: border-box;
  /* L'altezza di modal-inner-2 dovrebbe essere relativa al suo contenuto */
  /* o 50vh se si vuole che riempia la seconda metà quando espanso. */
  /* Per ora, il contenuto determina la sua altezza. */
  padding: 2em 4em;
  /* background-color: lightcoral; */ /* Utile per debug visivo */
}
.modal-content {
  height: auto; /* Permette al contenuto di definire l'altezza */
  overflow-y: hidden; /* Nasconde lo scrollbar per default (stato non espanso) */
}

/* Stili per il pulsante di espansione/riduzione */
.modal-expand-btn {
  // position: absolute;
  // top: 15px; /* Adattare secondo il design */
  // /* Posizionare in modo che non si sovrapponga al pulsante di chiusura */
  // /* Esempio: se BtnClose è a destra (tipico), posizionare a sinistra */
  // left: 15px;
  z-index: 1300; /* Assicurarsi che sia sopra il contenuto */
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85em;
  line-height: 1;
  transition: background-color 0.2s ease;
}

.modal-expand-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
