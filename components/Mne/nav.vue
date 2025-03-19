<template>
  <div class="text-right flex items-center gap-3">
    <nav class="">
      <ul class="block gap-3 uppercase text-sm md:flex testSass">
        <li class="hover:text-seagull-400">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="nav-hover"><nuxt-link to="/security">Security</nuxt-link></li>
        <li class="nav-hover">
          <nuxt-link to="/specialty-features">Features</nuxt-link>
        </li>
        <li class="nav-hover"><nuxt-link to="/mobile-app">App</nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
