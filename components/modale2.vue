<template>
  <teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75"
    >
      <div class="bg-white p-8 w-full h-full overflow-y-auto relative">
        <button class="absolute top-4 right-4 text-black" @click="closeModal">X</button>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from "vue";

// Accessing props using defineProps
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isVisible"]);

// Function to close the modal
const closeModal = () => {
  emit("update:isVisible", false);
};

// Function to disable body scroll
const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

// Function to re-enable body scroll
const enableBodyScroll = () => {
  document.body.style.overflow = "auto";
};

// Watch for modal visibility changes
watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }
);

onMounted(() => {
  watch(
    () => props.isVisible,
    (newValue) => {
      if (newValue) {
        disableBodyScroll();
      } else {
        enableBodyScroll();
      }
    }
  );
});

// Clean up when component unmounts
// onMounted(() => {
//   if (!props.isVisible) enableBodyScroll();
// });

onUnmounted(() => {
  enableBodyScroll();
});
</script>

<style scoped>
/* Ensure modal content is scrollable */
</style>
