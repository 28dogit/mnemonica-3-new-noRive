<template>
  <div class="text-right flex items-center gap-3">
    <nav class="font-jost">
      <ul class="block gap-3 uppercase text-sm md:flex testSass">
        <!-- <li class="dark:hover:text-chenin-300 hover:text-seagull-400">
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
        </li> -->
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400">
          <nuxt-link to="/test">Test</nuxt-link>
        </li>
      </ul>
    </nav>
    <span class="vDivider w-px h-5 bg-slate-600 dark:bg-slate-300"></span>
    <UToggle
      v-model="selected"
      on-icon="i-heroicons-moon-20-solid"
      off-icon="i-heroicons-sun-20-solid"
      @click="toggleTheme"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useColorMode } from "@vueuse/core";

const selected = ref(false);
type Theme = "light" | "dark";
const colorMode = useColorMode();
const setColorTheme = (newTheme: Theme) => {
  colorMode.value = newTheme;
};
const toggleTheme = () => {
  setColorTheme(colorMode.value == "dark" ? "light" : "dark");
};

onMounted(() => {
  selected.value = colorMode.value === "dark";
});

watch(
  () => colorMode.value,
  (newvalue) => {
    selected.value = newvalue === "dark";
  }
);
</script>

<style scoped>
/* .testSass {
  background-color: brown;
}
.dark .testSass {
  background-color: blue;
} */
</style>
