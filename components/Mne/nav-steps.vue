<template>
  <div>
    <UNavigationMenu
      color="neutral"
      variant="pill"
      :items="items"
      orientation="vertical"
      class="fixed right-10 top-[30%] z-50"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

//definisco cosa emettere al click per poi interagire con le funzioni di index.vue
const emit = defineEmits(["menuAction"]);

// const items = ref<NavigationMenuItem[][]>([
//   [
//     {
//       label: "Hero",
//       icon: "i-lucide-circle-ellipsis",
//       //badge: "1",
//       active: true,
//       onSelect: () => emit("menuAction", "hero"),
//     },
//     {
//       label: "Phases",
//       icon: "i-lucide-circle-dot",
//       target: "_self",
//       onSelect: () => emit("menuAction", "phases"),
//     },
//     {
//       label: "All In One",
//       icon: "i-lucide-circle-dot-dashed",
//       onSelect: () => emit("menuAction", "allInOne"),
//     },
//   ],
//   [
//     {
//       label: "Made For",
//       icon: "i-lucide-box",
//       // to: "/#made-for",
//       onSelect: () => emit("menuAction", "madeFor"),
//     },
//   ],
// ]);

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
        //badge: "1",
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
    [
      {
        label: "Made For",
        icon: "i-lucide-box",
        // to: "/#made-for",
        active: activeSection.value === "madeFor",
        onSelect: () => handleSelect("madeFor"),
      },
    ],
  ] as NavigationMenuItem[][];
});
</script>
<style lang="scss" scoped></style>
