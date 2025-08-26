<template>
  <div class="section-made-for">
    <h1>Made For</h1>
    <span class="divider block h-[2rem]"></span>
    <div class="content">
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('madefor/producers')">
        <UIcon name="i-lucide-sprout" class="size-5" />
        <p class="font-semibold mb-0!">Producers</p>
      </div>
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('madefor/post-supervisors')">
        <UIcon name="i-lucide-flip-horizontal" class="size-5" />
        <p class="font-semibold mb-0!">Post Supervisors</p>
      </div>
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('madefor/post-production-labs')">
        <UIcon name="i-lucide-projector" class="size-5" />
        <p class="font-semibold mb-0!">Post-production Labs</p>
      </div>
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('madefor/distributors')">
        <UIcon name="i-lucide-memory-stick" class="size-5" />
        <p class="font-semibold mb-0!">Distributors</p>
      </div>
      <div class="boxModal BmFlex cursor-pointer" @click="openModal('madefor/broadcasters')">
        <UIcon name="i-lucide-monitor-dot" class="size-5" />
        <p class="font-semibold mb-0!">Broadcasters / OTT</p>
      </div>
    </div>
  </div>
  <ModalsModale100 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
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
