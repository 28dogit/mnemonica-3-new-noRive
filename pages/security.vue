<template>
  <div class="security-page">
    <div class="content">Security</div>

    <button @click="showModal = true">Open Modal</button>
    <div style="height: 1000px; background: linear-gradient(to bottom, #f5f5f5, #e0e0e0)">
      ciao
    </div>
    <!-- Use the Modal component with v-model for controlling visibility -->
    <ModalsModalTest v-model="showModal" title="Example Modal">
      <div>
        <p>
          This is the modal content. You can scroll within this content if it's long
          enough.
        </p>
        <div
          style="height: 1000px; background: linear-gradient(to bottom, #f5f5f5, #e0e0e0)"
        >
          <p>Scroll down to see more content...</p>
          <p style="margin-top: 500px">You've scrolled down!</p>
          <p>
            Notice that the page behind the modal doesn't scroll, but the content inside
            the modal can scroll.
          </p>
        </div>
      </div>

      <template #footer>
        <button @click="showModal = false">Close</button>
      </template>
    </ModalsModalTest>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
definePageMeta({
  layout: "page-layout",
});

// State to control modal visibility
const showModal = ref(false);
</script>

<style lang="scss" scoped></style>
