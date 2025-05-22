<template>
  <div class="flex items-center justify-center">
    <UNavigationMenu
      color="neutral"
      variant="pill"
      :items="items"
      class="fixed bottom-[15px] z-50"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

//definisco cosa emettere al click per poi interagire con le funzioni di index.vue
const emit = defineEmits(["menuAction"]);

const activeSection = ref("hero");

// Definisco una prop per permettere al componente genitore di impostare la sezione attiva
const props = defineProps({
  initialActive: {
    type: String,
    default: "hero",
  },
});

// Inizializzo activeSection con il valore della prop initialActive
onMounted(() => {
  activeSection.value = props.initialActive;
});

// Funzione per gestire la selezione di una voce del menu
const handleSelect = (section: string) => {
  activeSection.value = section;
  emit("menuAction", section);
};

// Funzione per aggiornare la sezione attiva dall'esterno
const setActiveSection = (section: string) => {
  activeSection.value = section;
};

// Espongo la funzione setActiveSection per permettere al componente genitore di aggiornare lo stato attivo
defineExpose({
  setActiveSection,
});

// Genero gli elementi del menu con lo stato attivo basato su activeSection
const items = computed(() => {
  return [
    [
      {
        label: "Hero",
        icon: "i-lucide-circle-ellipsis",
        active: activeSection.value === "hero",
        onSelect: () => handleSelect("hero"),
      },
      {
        label: "Phases",
        icon: "i-lucide-circle-dot",
        target: "_self",
        active: activeSection.value === "phases",
        onSelect: () => handleSelect("phases"),
      },
      {
        label: "All In One",
        icon: "i-lucide-circle-dot-dashed",
        active: activeSection.value === "allInOne",
        onSelect: () => handleSelect("allInOne"),
      },
    ],
  ] as NavigationMenuItem[][];
});
</script>
<style lang="scss" scoped></style>
