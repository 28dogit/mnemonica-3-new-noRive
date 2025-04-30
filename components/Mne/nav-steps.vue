<template>
  <div>
    <UNavigationMenu
      color="neutral"
      variant="pill"
      :items="items"
      orientation="vertical"
      class="fixed right-10 top-25 z-50"
      @select="handleNavigate"
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
      to: "/",
      badge: "1",
      active: true,
      action: "made-for",
    },
    {
      label: "Phases",
      icon: "i-lucide-circle-dot",
      to: "/",
      badge: "2",
      target: "_self",
      action: "production",
    },
    {
      label: "All In One",
      icon: "i-lucide-circle-dot-dashed",
      to: "/",
      badge: "3",
    },
  ],
  [
    {
      label: "Made For",
      icon: "i-lucide-box",
      to: "/#made-for",
      action: "made-for",
    },
  ],
]);

// Gestisce la navigazione e emette l'evento con l'azione associata
const handleNavigate = (item: NavigationMenuItem) => {
  console.log("Item cliccato:", item);
  if (item.action) {
    console.log("Emetto azione:", item.action);
    emit("menuAction", item.action);
  }
};
</script>

<style lang="scss" scoped></style>
