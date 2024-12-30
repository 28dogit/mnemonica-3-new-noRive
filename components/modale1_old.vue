<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      ref="modalWrapper"
      class="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div ref="modalContent" class="bg-white p-8 w-full h-full overflow-y-auto relative">
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
import { onUnmounted, watch, nextTick } from "vue";
import gsap from "gsap";
// Accessing props using defineProps
const modalWrapper = ref(null);
const modalContent = ref(null);

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isVisible"]);

// Function to close the modal
const closeModal = () => {
  gsap.to(modalContent.value, {
    y: "-100%",
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => emit("update:isVisible", false),
  });
};
// Function to disable body scroll
const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

// Function to re-enable body scroll
const enableBodyScroll = () => {
  document.body.style.overflow = "auto";
};

watch(
  () => props.isVisible,
  async (newValue) => {
    if (newValue) {
      disableBodyScroll();
      await nextTick(); // Wait for the DOM to update
      gsap.fromTo(
        modalContent.value,
        { y: "-100%" },
        { y: "0%", duration: 0.5, ease: "power2.out" }
      );
    } else {
      enableBodyScroll();
    }
  }
);

// onMounted(() => {
//   watch(
//     () => props.isVisible,
//     (newValue) => {
//       if (newValue) {
//         disableBodyScroll();
//       } else {
//         enableBodyScroll();
//       }
//     }
//   );
// });

// Clean up when component unmounts
onUnmounted(() => {
  enableBodyScroll();
});
</script>

<style scoped>
/* Ensure modal content is scrollable */
</style>
