<template>
  <div class="page-wrapper">
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
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: block;
  /* Add styles here */
}
</style>
