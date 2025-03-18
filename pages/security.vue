<template>
  <div class="page-wrapper">
    <ContentRenderer v-if="page" :value="page" />
  </div>
  <button @click="showModal = true">Open Modal</button>
  <button @click="isModalOpen = true">Open Modal rooms</button>
  <div style="height: 1000px; width: 100%; background: #e0e0e01a">
    Spazio per controllo scroll con modal aperto
  </div>
  <!-- Use the Modal component with v-model for controlling visibility -->
  <ModalsModalTest v-model="showModal" title="Example Modal">
    <div>
      <p>
        This is the modal content. You can scroll within this content if it's long enough.
      </p>
      <div style="height: 1000px; background: #e0e0e0; color: black">
        <p>Scroll down to see more content...</p>
        <p style="margin-top: 500px">You've scrolled down!</p>
        <p>
          Notice that the page behind the modal doesn't scroll, but the content inside the
          modal can scroll.
        </p>
      </div>
    </div>

    <template #footer>
      <button @click="showModal = false">Close</button>
    </template>
  </ModalsModalTest>
  <FocusRoomsTest :isOpen="isModalOpen" @close="closeModal" />
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

// State to control modal visibility
const showModal = ref(false);
const isModalOpen = ref(false);
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style lang="scss" scoped></style>
