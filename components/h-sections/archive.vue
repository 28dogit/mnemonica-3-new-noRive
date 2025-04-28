<template>
  <div class="section-archive home">
    <h3>Plans and Pricing</h3>
    <h1>Archive</h1>
    <p>
      Spiegazione: dove si proteggono si presentano e si vendono gli asset, momento successivo e complementare alla
      production.
    </p>

    <div class="content">
      <NuxtLink to="/masters" class="txt-link">Main components</NuxtLink>
      <NuxtLink to="/archive-use-cases" class="txt-link">Use Cases</NuxtLink>
      <NuxtLink to="/archive-trusted-by" class="txt-link">Trusted by</NuxtLink>
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
