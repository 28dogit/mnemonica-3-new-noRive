<template>
  <div class="text-right flex items-center gap-3">
    <nav>
      <ul class="block gap-3 uppercase text-sm md:flex">
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/contacts">Contacts</nuxt-link></li>
        <li><nuxt-link to="/focusTransition">Test transitions</nuxt-link></li>
      </ul>
    </nav>
    <span>|</span>
    <UToggle
      v-model="selected"
      on-icon="i-heroicons-moon-20-solid"
      off-icon="i-heroicons-sun-20-solid"
      @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')"
    />
  </div>
</template>

<script lang="ts" setup>
const selected = ref(true);
type Theme = "light" | "dark";
const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};
</script>

<style></style>
