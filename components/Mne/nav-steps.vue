<template>
  <div>
    <UNavigationMenu
      color="neutral"
      variant="pill"
      :items="items"
      orientation="vertical"
      class="fixed right-10 top-25 z-50"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

//definisco cosa emettere al click per poi interagire con le funzioni di index.vue
const emit = defineEmits(["menuAction"]);

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Hero",
      icon: "i-lucide-circle-ellipsis",
      //badge: "1",
      active: true,
      onSelect: () => emit("menuAction", "hero"),
    },
    {
      label: "Phases",
      icon: "i-lucide-circle-dot",
      target: "_self",
      onSelect: () => emit("menuAction", "phases"),
    },
    {
      label: "All In One",
      icon: "i-lucide-circle-dot-dashed",
      onSelect: () => emit("menuAction", "allInOne"),
    },
  ],
  [
    {
      label: "Made For",
      icon: "i-lucide-box",
      // to: "/#made-for",
      onSelect: () => emit("menuAction", "made-for"),
    },
  ],
]);
</script>
<style lang="scss" scoped></style>
