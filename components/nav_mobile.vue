<template>
  <div class="text-right">
    <UIcon name="i-lucide-align-justify" @click="open_mNav"></UIcon>
    <nav v-if="showNav">
      <ul class="uppercase text-sm flex flex-col">
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400">
          <nuxt-link to="/animations">Animations</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400">
          <nuxt-link to="/modal">Modals</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400">
          <nuxt-link to="/news">News</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400">
          <nuxt-link to="/focusTransition">Transitions</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const showNav = ref(false);
const open_mNav = () => {
  showNav.value = true;
};
</script>

<style scoped></style>
