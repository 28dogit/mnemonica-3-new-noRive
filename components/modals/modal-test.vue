<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click="closeOnOverlayClick ? $emit('update:modelValue', false) : null"
      >
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <slot name="header">
              <h3>{{ title }}</h3>
            </slot>
            <button class="modal-close" @click="$emit('update:modelValue', false)">
              &times;
            </button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Modal",
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Client-side only checks for document access

// Create a ref to track if we're on client-side
const isClient = ref(false);

// Set isClient to true when component is mounted (client-side only)
onMounted(() => {
  isClient.value = true;
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

// Watch for changes in the modelValue prop to toggle body scroll
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  },
  { immediate: true }
);

// Ensure body scroll is re-enabled when component is unmounted
onBeforeUnmount(() => {
  enableBodyScroll();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.modal-content {
  padding: 15px;
  overflow-y: auto; /* Allow scrolling within the modal content */
  flex-grow: 1;
}

.modal-footer {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

/* Transition effects */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
