<template>
  <div class="text-right flex items-center gap-3">
    <!-- <ul class="block gap-3 uppercase text-sm md:flex testSass">
        <li class="nav-hover">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="nav-hover"><NuxtLink to="/security">Security</NuxtLink></li>
        <li class="nav-hover">
          <NuxtLink to="/features">Features</NuxtLink>
        </li>
        <li class="nav-hover"><NuxtLink to="/mobile-app">App</NuxtLink></li>
        <li class="nav-hover">
          <a href="#" @click.prevent="navigateToSection('made-for')">Made For</a>
        </li>
        <li class="nav-hover">
          <a href="#" @click.prevent="navigateToSection('production')">Pricing</a>
        </li>
        <li class="nav-hover">
          <a href="#" @click.prevent="navigateToSection('contacts')">Contacts</a>
        </li>
        <li class="nav-hover">
          <a href="#" @click.prevent="navigateToSection('allInOne')">All In One</a>
        </li> -->
    <!-- <li class="nav-hover"><a href="#" @click="playFast">Blog</a></li> -->
    <!-- </ul> -->

    <UNavigationMenu
      :items="items"
      class="w-full justify-center"
      higlight-color="neutral"
      color="neutral"
    />
  </div>
</template>

<script setup lang="ts">
import { useNavStore } from "@/stores/navigationStore";
//import { navigateTo } from "#app";
//import { NuxtLink } from "#components";
import type { NavigationMenuItem } from "@nuxt/ui";
import { select } from "#build/ui";

const navigationStore = useNavStore();

const navigateToSection = (sectionName: string) => {
  // Imposta la sezione di destinazione e indica che deve essere eseguita la logica personalizzata
  console.log("Navigazione avviata...");
  navigationStore.setTargetSection(sectionName, true);
  console.log("Stato impostato:", navigationStore);
  navigateTo("/");
};

//--------

const items = ref<NavigationMenuItem[]>([
  {
    label: "Home",
    //icon: "i-lucide-book-open",
    to: "/",
    children: [
      {
        label: "Hero",
        description: "Media Asset Magic",
        icon: "i-lucide-circle-ellipsis",
        to: "/",
      },
      {
        label: "Phases",
        description: "From Prep to Eternity",
        icon: "i-lucide-circle-dot",
      },
      {
        label: "Modules",
        description: "All In One",
        icon: "i-lucide-circle-dot-dashed",
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
    children: [],
  },
  {
    label: "Production",
    to: "/",
    onSelect: () => navigateToSection("production"),
    children: [],
  },
  {
    label: "Login",
    to: "https://mnemonica.io",
    active: true,
    target: "_blank",
  },
]);
</script>

<style scoped></style>
