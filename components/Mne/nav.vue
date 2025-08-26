<template>
  <UNavigationMenu
    :items="items"
    class="w-auto justify-center"
    higlight-color="neutral"
    color="neutral"
    :ui="{
      childList: 'flex flex-column gap-2 flex-wrap',
      childItem: 'h-10 w-[30%]',
      childLink: 'text-sm font-normal text-blue-600',
      childLinkLabel: 'text-sm font-normal text-blue-600',
    }">
  </UNavigationMenu>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useNavStore } from "@/stores/navigationStore";

const navigationStore = useNavStore();

// const navigateToSection = (sectionName: string) => {
//   // Imposta la sezione di destinazione e indica che deve essere eseguita la logica personalizzata
//   navigationStore.setTargetSection(sectionName, true);
//   //navigateTo("/");
// };

const navigateToSection = (sectionName: string, event?: Event) => {
  // Previeni la navigazione automatica se presente
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  navigationStore.setTargetSection(sectionName, true);
  navigateTo("/");
};

const items = [
  {
    label: "Home",
    icon: "i-lucide-circle",
    to: "/",
    children: [
      {
        label: "Hero",
        icon: "i-lucide-circle-ellipsis",
        to: null,
        //onSelect: () => navigateToSection("hero-section-2"),
        onSelect: (event: Event) => navigateToSection("hero-section-2", event),
      },
      {
        label: "Phases",
        icon: "i-lucide-circle-dot",
        to: null,
        onSelect: (event: Event) => navigateToSection("phases-section-2", event),
      },
      {
        label: "Modules",
        icon: "i-lucide-circle-dot-dashed",
        to: null,
        onSelect: (event: Event) => navigateToSection("modules-section-2", event),
      },
      {
        label: "Made For",
        to: null,
        onSelect: (event: Event) => navigateToSection("made-for", event),
      },
      {
        label: "Pricing",
        to: null,
        onSelect: (event: Event) => navigateToSection("production", event),
      },
      {
        label: "About Us",
        to: null,
        onSelect: (event: Event) => navigateToSection("about-us", event),
      },
    ],
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
    label: "About Us",
    onSelect: () => navigateToSection("about-us"),
  },
  {
    label: "Contacts",
    onSelect: () => navigateToSection("contacts"),
  },
  {
    label: "Login",
    to: "https://mnemonica.io",
    active: true,
    target: "_blank",
  },
] satisfies NavigationMenuItem[];
</script>

<style scoped>
.navSubItem {
  cursor: pointer;
  padding: 1rem;
}
</style>
