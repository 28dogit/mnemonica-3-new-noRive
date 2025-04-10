<template>
  <div class="page-archive">
    <h3>Plans and Pricing</h3>
    <h1>Archive</h1>
    <p>
      Spiegazione: dove si proteggono si presentano e si vendono gli asset, momento
      successivo e complementare alla production.
    </p>

    <div class="content">
      <a href="">Main components</a>
      <a href="">Use Cases </a>
      <a href="">Trusted by</a>
      <UTabs :items="items"></UTabs>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});
</script>

<style lang="scss" scoped></style>
