<template>
  <UButton
    v-show="showScrollTopBtn"
    @click="scrollToTop"
    icon="i-lucide-arrow-up"
    size="md"
    color="neutral"
    variant="soft"
    aria-label="back to top"
    class="fixed bottom-6 right-6 z-50"
  >
    TOP
  </UButton>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";

const showScrollTopBtn = ref(false);
const route = useRoute();

// Funzione per scorrere verso l'alto della pagina
const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

// Funzione per controllare la posizione dello scroll
const checkScrollPosition = () => {
  if (!import.meta.client) return;

  // Mostra il pulsante solo quando si è scrollato oltre il 50% dell'altezza della pagina
  const scrollPosition = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  showScrollTopBtn.value = scrollPosition > (pageHeight - windowHeight) * 0.5;
};

// Resetta lo stato quando cambia la rotta
watch(
  () => route.path,
  () => {
    showScrollTopBtn.value = false;
    // Esegui un controllo dopo un breve ritardo per assicurarsi che la nuova pagina sia caricata
    if (import.meta.client) {
      setTimeout(checkScrollPosition, 100);
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (!import.meta.client) return;

  // Esegui un controllo iniziale della posizione dello scroll
  checkScrollPosition();

  // Aggiungi event listener per controllare la posizione dello scroll
  window.addEventListener("scroll", checkScrollPosition);

  // Aggiungi un event listener per il caricamento completo della pagina
  window.addEventListener("load", checkScrollPosition);

  // Controlla anche dopo un breve ritardo per assicurarsi che tutti gli elementi siano caricati
  setTimeout(checkScrollPosition, 500);
});

onBeforeUnmount(() => {
  if (!import.meta.client) return;

  // Rimuovi l'event listener per lo scroll
  window.removeEventListener("scroll", checkScrollPosition);
  // Rimuovi l'event listener per il caricamento della pagina
  window.removeEventListener("load", checkScrollPosition);
});
</script>
