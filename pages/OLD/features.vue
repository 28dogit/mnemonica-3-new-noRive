<template>
  <div class="page-wrapper">
    <div class="section-made-for">
      <h1>Magic Features</h1>
      <h2>Things you can only find in mnemonica</h2>
      <div class="content">
        <div class="boxMF cursor-pointer" @click="openModal('madefor/producers')">
          <p class="font-semibold mb-0!">Ingenious Dailies</p>
        </div>
        <div class="boxMF cursor-pointer" @click="openModal('madefor/post-supervisors')">
          <p class="font-semibold mb-0!">One-upload workflow</p>
        </div>
        <div
          class="boxMF cursor-pointer"
          @click="openModal('madefor/post-production-labs')"
        >
          <p class="font-semibold mb-0!">Instant Playlists</p>
        </div>
        <div class="boxMF cursor-pointer" @click="openModal('madefor/distributors')">
          <p class="font-semibold mb-0!">Virtually unlimited users</p>
        </div>
      </div>
    </div>
    <ModalsModale50 :isOpen="isModalOpen" :isModal="modalId" @close="closeModal" />
    <!-- <div
      class="boxMF cursor-pointer mb-0!"
      v-if="slots.dailies"
      v-html="slots.dailies"
      @click="openModal('madefor/producers')"
    ></div>
    <div
      class="boxMF cursor-pointer mb-0!"
      v-if="slots.workflow"
      v-html="slots.workflow"
      @click="openModal('madefor/producers')"
    ></div>
    <div
      class="boxMF cursor-pointer mb-0!"
      v-if="slots.playlists"
      v-html="slots.playlists"
      @click="openModal('madefor/producers')"
    ></div>
    <div
      class="boxMF cursor-pointer mb-0!"
      v-if="slots.users"
      v-html="slots.users"
      @click="openModal('madefor/producers')"
    ></div> -->

    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});

//SECTION - Nuxt Content CMS

//Uso il composable useExtractSlots per estrarre i dati dal file di markup (slot da estrarre, file .md da leggere)
const { fetchSection } = useExtractSlots("features", "features-block");

// Estraggo i dati per ottenere i testi degli slot che mi servono più il file di default nell'html fare riferimento al nome dello slot da richiamare nel file di markup
const { slots, defaultContent } = fetchSection();

//!SECTION
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
