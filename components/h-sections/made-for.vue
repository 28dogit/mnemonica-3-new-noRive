<template>
  <div class="section-made-for">
    <h1>made-for</h1>
    <div class="content">
      <div class="boxMF">
        <BtnMaster @click="(isModalOpen = true), (modalId = 'producers')"
          >Producers</BtnMaster
        >
      </div>
      <div class="boxMF">Post Supervisors</div>
      <div class="boxMF">Post-production Labs</div>
      <div class="boxMF">Distributors</div>
      <div class="boxMF">Broadcasters / OTT</div>
    </div>
  </div>
  <ModalsModale50 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
</template>

<script setup>
const isModalOpen = ref(false);
const modalId = ref(null); // qui indico il nome del modale che devo aprire in content/modali50
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
