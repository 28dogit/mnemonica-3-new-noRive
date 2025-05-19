<template>
  <div class="page-wrapper">
    <h1>Mnemonica is Everywhere</h1>
    <h2>A unique mobile app is the core of Mnemonica’s system and vision.</h2>
    <span class="divider h-[2rem] block"></span>
    <span class="block">
      <div class="col-3-wrapper">
        <div class="shrink-4">
          <h2 class="title-enphasis">More Than an App</h2>
          <span class="divider h-[1rem] block"></span>
          <p>
            More than a fancy gadget with a HDR player. More than a versatile operations
            center, smoothly tuning its power to your role. More than a super pleasant,
            game-like user experience.
          </p>
        </div>
        <div class="w-[148px]">
          <NuxtImg width="148" src="assets/img/mobile-app-iphone13-148x300.png" preload />
        </div>
        <div class="shrink-4">
          <h2 class="title-enphasis">Your Master Key</h2>
          <span class="divider h-[1rem] block"></span>
          <p>
            Mnemonica App is your master key to access your account and to control all
            active sessions anywhere. It can
            <span class="txt-enphasis">let you in with zero input</span> and make
            <span class="txt-enphasis">MFA</span>. a one-time deal with biometric ID.
          </p>
        </div>
      </div>
    </span>
    <span class="divider h-[2rem] block"></span>
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

<style lang="scss" scoped>
.col-3-wrapper {
  gap: 4rem;
  align-items: center;
}
</style>
