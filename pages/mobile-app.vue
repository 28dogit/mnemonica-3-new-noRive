<template>
  <div class="page-wrapper">
    <h1>Mobile App</h1>
    <p>
      Duis at sollicitudin eros. Fusce posuere magna non nisi venenatis, vitae vulputate
      est pellentesque. In a tortor tempor, scelerisque risus sit amet, mattis diam.
    </p>
    <!-- <ContentRenderer v-if="page" :value="page" /> -->
    <!-- <BtnMaster @click="isModalOpen = true">open Modale app</BtnMaster> -->
  </div>
  <!-- <ModalsModale50 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" /> -->
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});
// const route = useRoute();

// const { data: page } = await useAsyncData(route.path, () => {
//   return queryCollection("content").path(route.path).first();
// });

// const isModalOpen = ref(false);
// const modalId = "mobile-app"; // qui indico il nome del modale che devo aprire in content/modali50
// const closeModal = () => {
//   isModalOpen.value = false;
// };
</script>

<style lang="scss" scoped></style>
