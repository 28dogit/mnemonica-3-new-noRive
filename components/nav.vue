<template>
  <div class="text-right">
    <nav>
      <ul class="block gap-3 uppercase text-sm md:flex">
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/contacts">Contacts</nuxt-link></li>
        <li><nuxt-link to="/focusTransition">Test transitions</nuxt-link></li>
      </ul>
    </nav>
    <UToggle v-model="selected" />
  </div>
</template>

<script lang="ts" setup>
const selected = ref(false);
</script>

<style></style>
