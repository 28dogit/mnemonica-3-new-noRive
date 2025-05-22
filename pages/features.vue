<template>
  <div class="page-wrapper">
    <div class="page-title">
      <h1>Magic Features</h1>
      <h2>Things you can only find in mnemonica</h2>
    </div>
    <div class="content">
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('dailies')">
        <UIcon name="i-lucide-lightbulb" class="size-5" />
        <p class="font-semibold mb-0!">Ingenious Dailies</p>
      </div>
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('workflow')">
        <UIcon name="i-lucide-bird" class="size-5" />
        <p class="font-semibold mb-0!">One-upload workflow</p>
      </div>
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('playlists')">
        <UIcon name="i-lucide-boom-box" class="size-5" />
        <p class="font-semibold mb-0!">Instant Playlists</p>
      </div>
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('users')">
        <UIcon name="i-lucide-container" class="size-5" />
        <p class="font-semibold mb-0!">Virtually unlimited users</p>
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
