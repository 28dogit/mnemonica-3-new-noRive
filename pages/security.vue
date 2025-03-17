<template>
  <div class="container mx-auto p-6">
    <div class="content mb-8">
      <h1 class="text-2xl font-bold mb-4">Security</h1>
      <p class="mb-4">This is the security page content.</p>

      <button
        @click="openModal"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Open Modal
      </button>
    </div>

    <!-- Modal component with v-model binding -->
    <HalfScreenModal
      :is-open="isModalOpen"
      @update:isOpen="isModalOpen = $event"
      @close="isModalOpen = false"
    >
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Security Information</h2>
        <p class="mb-4">
          This modal contains important security information about our platform.
        </p>
        <p class="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl
          eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget
          nisl.
        </p>
        <p class="mb-4">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Donec euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
          eget ultricies nisl nisl eget nisl.
        </p>
        <p class="mb-4">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <p class="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p class="mb-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>
    </HalfScreenModal>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Modal state
const isModalOpen = ref(false);

// Function to open modal
const openModal = () => {
  isModalOpen.value = true;
};
</script>

<style lang="scss" scoped>
// You can add custom styles here if needed
</style>
