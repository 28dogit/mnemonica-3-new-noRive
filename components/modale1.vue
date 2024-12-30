<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      ref="modalWrapper"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75"
    >
      <div
        ref="modalContent"
        :class="contentClass"
        class="bg-white p-8 w-full h-full overflow-auto relative"
      >
        <button class="absolute top-4 right-4 text-black" @click="closeModal">X</button>
        <!-- <slot />  è un segnaposto dove verrà renderizzato il contenuto passato dal tag componente del componente genitore-->
        <!-- per esempio nel comp genitore potrei avere una cosa del genere <componente> <h1>questo è quello che verrà renderizzato in "<slot/>"</h1></componente> -->
        <slot />
        <p class="modal-block">
          Blocco 1 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <div class="modal-block min-w-80">
          <h1>Titolo blocco 3</h1>
          <h3>
            Blocco 2 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </h3>
        </div>
        <p class="modal-block">
          Blocco 3 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p class="modal-block">
          Blocco 4 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p class="modal-block">
          Blocco 5 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p class="modal-block">
          Blocco 6 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import gsap from "gsap";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isVisible"]);

const modalWrapper = ref(null);
const modalContent = ref(null);
const isLandscape = ref(false); // Detect orientation
const contentClass = ref(""); // Class for overflow style

// Function to close the modal
const closeModal = () => {
  const animationDirection = isLandscape.value ? { x: "100%" } : { y: "100%" };
  gsap.to(modalContent.value, {
    ...animationDirection,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => emit("update:isVisible", false),
  });
};

// Function to disable body scroll
const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

// Function to enable body scroll
const enableBodyScroll = () => {
  document.body.style.overflow = "auto";
};

// Detect viewport orientation
const detectOrientation = () => {
  isLandscape.value = window.innerWidth > window.innerHeight;
  contentClass.value = isLandscape.value ? "overflow-x-auto" : "overflow-y-auto";
};

onMounted(() => {
  detectOrientation(); // Check on mount
  window.addEventListener("resize", detectOrientation); // Listen for changes
});

watch(
  () => props.isVisible,
  async (newValue) => {
    if (newValue) {
      disableBodyScroll();
      detectOrientation();
      await nextTick(); // Wait for the DOM to update

      const animationFrom = isLandscape.value ? { x: "100%" } : { y: "100%" };
      gsap.fromTo(modalContent.value, animationFrom, {
        x: "0%",
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      enableBodyScroll();
    }
  }
);

onUnmounted(() => {
  enableBodyScroll();
  window.removeEventListener("resize", detectOrientation);
});
</script>

<style scoped>
/* Styles for horizontal or vertical scrolling */
.overflow-x-auto {
  overflow-x: auto;
  overflow-y: hidden;
}
.overflow-y-auto {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
