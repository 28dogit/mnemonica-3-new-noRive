<template>
  <div id="mainContent" class="min-h-screen flex flex-col flex-grow">
    <Header />
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style>
#mainContent {
  /* height: 100vh; */
  background: rgb(0, 61, 86);
  background: linear-gradient(
    75deg,
    rgba(0, 61, 86, 1) 0%,
    rgba(31, 113, 140, 1) 50%,
    rgba(0, 42, 65, 1) 100%
  );
}
/* w-screen h-screen bg-slate-300 dark:bg-woodsmoke-950 */
</style>
