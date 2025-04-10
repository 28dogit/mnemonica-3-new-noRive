<template>
  <div class="section-production home">
    <h3>Plans and Pricing</h3>
    <h1>Production</h1>
    <p>
      Spiegazione: dove si producono gli asset, momento fabbrica complementare al
      successivo archive.
    </p>

    <div class="content">
      <a href="" class="txt-link">Main components</a>
      <a href="" class="txt-link">Use Cases </a>
      <a href="" class="txt-link">Hall of Fame</a>
      <UTabs :items="items"></UTabs>
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
