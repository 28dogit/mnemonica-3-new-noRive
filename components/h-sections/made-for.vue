<template>
  <div class="section-made-for">
    <h1>made-for</h1>
    <div class="content">
      <div class="boxMF cursor-pointer" @click="openModal('madefor/producers')">
        <p class="font-semibold">Producers</p>
      </div>
      <div class="boxMF cursor-pointer" @click="openModal('madefor/post-supervisors')">
        <p class="font-semibold">Post Supervisors</p>
      </div>
      <div class="boxMF cursor-pointer" @click="openModal('madefor/post-production-labs')">
        <p class="font-semibold">Post-production Labs</p>
      </div>
      <div class="boxMF cursor-pointer" @click="openModal('madefor/distributors')">
        <p class="font-semibold">Distributors</p>
      </div>
      <div class="boxMF cursor-pointer" @click="openModal('madefor/broadcasters')">
        <p class="font-semibold">Broadcasters / OTT</p>
      </div>
    </div>
  </div>
  <ModalsModale50 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
</template>

<script setup>
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

<style lang="scss" scoped>
.section-made-for {
  width: 100%;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    padding: 0;
  }
}

.boxMF {
  width: 100%;
  background-color: #253f63;
  color: #fff;
  padding: 1em;
}
</style>
