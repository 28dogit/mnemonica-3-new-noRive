<template>
  <div class="text-right flex items-center gap-3">
    <nav class="">
      <ul class="block gap-3 uppercase text-sm md:flex testSass">
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
        </li>
        <!-- <li class="nav-hover"><a href="#" @click="playFast">Blog</a></li> -->
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigationStore";
import { navigateTo } from "#app";
import { NuxtLink } from "#components";

const navigationStore = useNavStore();

const navigateToSection = (sectionName) => {
  // Imposta la sezione di destinazione e indica che deve essere eseguita la logica personalizzata
  console.log("Navigazione avviata...");
  navigationStore.setTargetSection(sectionName, true);
  console.log("Stato impostato:", navigationStore);
  navigateTo("/");
};
</script>

<style scoped></style>
