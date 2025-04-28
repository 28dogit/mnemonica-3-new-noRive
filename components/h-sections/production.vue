<template>
  <div class="section-production home">
    <h3>Plans and Pricing</h3>
    <h1>Production</h1>
    <p>Spiegazione: dove si producono gli asset, momento fabbrica complementare al successivo archive.</p>

    <div class="content">
      <NuxtLink to="/screening-rooms" class="txt-link">Main components</NuxtLink>
      <NuxtLink to="/production-use-cases" class="txt-link">Use Cases</NuxtLink>
      <NuxtLink to="/production-hall-fame" class="txt-link">Hall of Fame</NuxtLink>
      <UTabs color="neutral" :items="items" class="w-full"></UTabs>
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    label: "Screening Only",
    icon: "i-lucide-monitor-play",
    content: "Screening Only content.",
  },
  {
    label: "Full",
    icon: "i-lucide-fullscreen",
    content: "Full content.",
  },
];
</script>

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
