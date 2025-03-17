<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      ref="modalOverlay"
      class="fixed inset-0 z-[9999] bg-black bg-opacity-75 flex"
      :class="isLandscape ? 'items-center justify-end' : 'items-end justify-center'"
      @click.self="closeModal"
    >
      <div
        ref="modalContent"
        :class="[
          isLandscape ? 'w-1/2 h-full' : 'w-full h-1/2',
          contentScrollClass,
          'bg-white p-6 relative',
        ]"
      >
        <button
          class="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors"
          @click="closeModal"
        >
          <span class="text-xl font-bold">×</span>
        </button>
        <div class="h-full overflow-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const emit = defineEmits(["update:isOpen", "close"]);

const modalOverlay = ref(null);
const modalContent = ref(null);
const isLandscape = ref(false);
const contentScrollClass = ref("");

// Close modal function
const closeModal = () => {
  const animationDirection = isLandscape.value ? { x: "100%" } : { y: "100%" };

  gsap.to(modalContent.value, {
    ...animationDirection,
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => {
      emit("close");
      emit("update:isOpen", false);
    },
  });
};

// Disable body scroll when modal is open
const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

// Enable body scroll when modal is closed
const enableBodyScroll = () => {
  document.body.style.overflow = "auto";
};

// Detect screen orientation
const detectOrientation = () => {
  isLandscape.value = window.innerWidth > window.innerHeight;
  contentScrollClass.value = isLandscape.value ? "overflow-x-auto" : "overflow-y-auto";
};

// Watch for changes in isOpen prop
watch(
  () => props.isOpen,
  async (newValue) => {
    if (newValue) {
      disableBodyScroll();
      detectOrientation();
      await nextTick();

      // Set initial position for animation
      const animationFrom = isLandscape.value ? { x: "100%" } : { y: "100%" };
      const animationTo = { x: "0%", y: "0%", duration: 0.4, ease: "power2.out" };

      gsap.fromTo(modalContent.value, animationFrom, animationTo);
    } else {
      enableBodyScroll();
    }
  }
);

onMounted(() => {
  detectOrientation();
  window.addEventListener("resize", detectOrientation);
});

onUnmounted(() => {
  enableBodyScroll();
  window.removeEventListener("resize", detectOrientation);
});
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
  overflow-y: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
