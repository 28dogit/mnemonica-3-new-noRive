<template>
  <div class="">
    <UNavigationMenu
      :items="items"
      class="w-full justify-flex-end"
      higlight-color="neutral"
      color="neutral"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useNavStore } from "@/stores/navigationStore";

const navigationStore = useNavStore();

const navigateToSection = (sectionName: string) => {
  // Imposta la sezione di destinazione e indica che deve essere eseguita la logica personalizzata
  console.log("Navigazione avviata...");
  navigationStore.setTargetSection(sectionName, true);
  console.log("Stato impostato:", navigationStore);
  //navigateTo("/");
};

//--------

const items = computed(() => {
  return [
    [
      {
        label: "Home",
        icon: "i-lucide-circle",
        to: "/",
      },
      {
        label: "Security",
        to: "/security",
      },
      {
        label: "Features",
        to: "/features",
      },
      {
        label: "App",
        icon: "i-lucide-box",
        to: "/mobile-app",
      },
      {
        label: "About",
        children: [
          {
            label: "Made For",
            to: "/",
            onSelect: () => navigateToSection("made-for"),
          },
          {
            label: "Pricing",
            to: "/",
            onSelect: () => navigateToSection("production"),
          },
          {
            label: "Contacts",
            to: "/",
            onSelect: () => navigateToSection("contacts"),
          },
        ],
      },
      {
        label: "Login",
        to: "https://mnemonica.io",
        active: true,
        target: "_blank",
      },
    ],
  ] as NavigationMenuItem[][];
});
</script>

<style scoped></style>
