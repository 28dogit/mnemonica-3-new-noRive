<template>
  <div class="text-right flex items-center gap-3">
    <nav class="">
      <ul class="block gap-3 uppercase text-sm md:flex testSass">
        <li class="hover:text-seagull-400">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="nav-hover"><nuxt-link to="/security">Security</nuxt-link></li>
        <li class="nav-hover">
          <nuxt-link to="/features">Features</nuxt-link>
        </li>
        <li class="nav-hover"><nuxt-link to="/mobile-app">App</nuxt-link></li>
        <li class="nav-hover">
          <a href="#" @click.prevent="navigateToSection('made-for')">Made For</a>
        </li>
        <li class="nav-hover">
          <a href="#" @click.prevent="navigateToSection('production')">Pricing</a>
        </li>
        <li class="nav-hover">
          <a href="#" @click.prevent="navigateToSection('contacts')">Contacts</a>
        </li>
        <!-- <li class="nav-hover"><a href="#" @click="playFast">Blog</a></li> -->
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigationStore";
import { navigateTo } from "#app";

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
