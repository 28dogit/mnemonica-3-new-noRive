<template>
  <div class="text-right">
    <nav class="">
      <UNavigationMenu
        :items="items"
        class="w-full justify-flex-end"
        higlight-color="neutral"
        color="neutral"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useNavStore } from "@/stores/navigationStore";
//import { navigateTo } from "#app";
//import { NuxtLink } from "#components";
import type { NavigationMenuItem } from "@nuxt/ui";

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
        //icon: "i-lucide-book-open",
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
      {
        label: "Login",
        to: "https://mnemonica.io",
        active: true,
        target: "_blank",
      },
    ],
    [
      {
        label: "Made For",
        icon: "i-lucide-box",
        // to: "/#made-for",
      },
    ],
  ] as NavigationMenuItem[][];
});

// const items = ref<NavigationMenuItem[]>([
//   {
//     label: "Home",
//     //icon: "i-lucide-book-open",
//     to: "/",
//     children: [
//       {
//         label: "Hero",
//         description: "Media Asset Magic",
//         icon: "i-lucide-circle-ellipsis",
//         to: "/",
//       },
//       {
//         label: "Phases",
//         description: "From Prep to Eternity",
//         icon: "i-lucide-circle-dot",
//       },
//       {
//         label: "Modules",
//         description: "All In One",
//         icon: "i-lucide-circle-dot-dashed",
//       },
//     ],
//   },
//   {
//     label: "Security",
//     to: "/security",
//   },
//   {
//     label: "Features",
//     to: "/features",
//   },
//   {
//     label: "App",
//     icon: "i-lucide-box",
//     to: "/mobile-app",
//   },
//   {
//     label: "Made For",
//     to: "/",
//     onSelect: () => navigateToSection("made-for"),
//   },
//   {
//     label: "Pricing",
//     to: "/",
//     onSelect: () => navigateToSection("production"),
//   },
//   {
//     label: "Contacts",
//     to: "/",
//     onSelect: () => navigateToSection("contacts"),
//   },
//   {
//     label: "Login",
//     to: "https://mnemonica.io",
//     active: true,
//     target: "_blank",
//   },
// ]);
</script>

<style scoped></style>
