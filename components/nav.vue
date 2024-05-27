<template>
  <div class="text-right">
    <ul class="flex gap-3 uppercase text-sm">
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/contacts">Contacts</nuxt-link></li>
      <li><nuxt-link to="/focusTransition">Test transition</nuxt-link></li>
    </ul>
    <UToggle color="primary" :model-value="true" />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
