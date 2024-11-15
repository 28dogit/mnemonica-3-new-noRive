<template>
  <div id="mainContent" class="min-h-screen flex flex-col flex-grow">
    <div class="bbg"></div>
    <Header />
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style>
/* w-screen h-screen bg-slate-300 dark:bg-woodsmoke-950 */
</style>
