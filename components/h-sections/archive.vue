<template>
  <div class="section-archive home">
    <h3>Plans and Pricing</h3>
    <h1>Archive</h1>
    <p>
      Spiegazione: dove si proteggono si presentano e si vendono gli asset, momento successivo e complementare alla
      production.
    </p>

    <div class="content">
      <nuxt-link to="/masters" class="txt-link">Main components</nuxt-link>
      <nuxt-link to="/archive-use-cases" class="txt-link">Use Cases</nuxt-link>
      <nuxt-link to="/archive-trusted-by" class="txt-link">Trusted by</nuxt-link>
      <img src="https://placehold.co/600x400" alt="Placeholder" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 0;
}
</style>
