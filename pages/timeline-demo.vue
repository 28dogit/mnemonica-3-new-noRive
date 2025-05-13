<template>
  <div class="timeline-demo-container">
    <h1 class="text-2xl font-bold mb-6">Demo Timeline con Slider</h1>
    <p class="mb-8">Muovi lo slider per controllare l'animazione della timeline</p>

    <MneTimelineSlider />

    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Come funziona</h2>
      <p class="mb-2">
        Questo componente utilizza Anime.js per creare una timeline animata che può essere
        controllata tramite uno slider.
      </p>
      <p>
        Spostando lo slider da sinistra a destra (o dall'alto verso il basso su
        dispositivi mobili), puoi controllare manualmente la progressione dell'animazione.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "page-layout",
});
// La pagina importa automaticamente il componente MneTimelineSlider
</script>

<style scoped>
.timeline-demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
