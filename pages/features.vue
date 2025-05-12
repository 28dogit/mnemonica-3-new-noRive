<template>
  <div class="page-wrapper">
    <div class="section-made-for">
      <h1>Magic Features</h1>
      <h2>Things you can only find in mnemonica</h2>
      <div class="content">
        <div class="boxModal cursor-pointer" @click="openModal('dailies')">
          <p class="font-semibold mb-0!">Ingenious Dailies</p>
        </div>
        <div class="boxModal cursor-pointer" @click="openModal('workflow')">
          <p class="font-semibold mb-0!">One-upload workflow</p>
        </div>
        <div class="boxModal cursor-pointer" @click="openModal('playlists')">
          <p class="font-semibold mb-0!">Instant Playlists</p>
        </div>
        <div class="boxModal cursor-pointer" @click="openModal('users')">
          <p class="font-semibold mb-0!">Virtually unlimited users</p>
        </div>
      </div>
    </div>
    <ModalsModale100 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});

const isModalOpen = ref(false);
const modalId = ref(null); // qui indico il nome del modale che devo aprire in content/modali50

const openModal = (id) => {
  modalId.value = id;
  console.log("Modale: ", modalId.value);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style lang="scss" scoped></style>
