<template>
  <div class="page-wrapper">
    <h1>Boxes</h1>
    <p>
      Sed ornare scelerisque massa, sed facilisis neque vulputate a. Fusce et enim ac erat
      consectetur tempor. Mauris sit amet auctor arcu, sed imperdiet nisl.
    </p>
    <span class="link-wrapper flex flex-col gap-2 items-start">
      <NuxtLink to="/screening-rooms" class="txt-link"
        >How Boxes work with Rooms</NuxtLink
      >
      <NuxtLink to="/gate" class="txt-link">Mnemonica Gate transfer accelerator</NuxtLink>
    </span>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: block;
  /* Add styles here */
}
</style>
