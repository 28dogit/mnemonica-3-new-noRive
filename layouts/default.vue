<template>
  <div id="mainContent" :class="BGclass" class="min-h-screen flex flex-col flex-grow">
    <span><button class="btnToggle" @click="toggleBG">Cambio BG</button></span>
    <Header />
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
// Stato reattivo per i classi del font e del background
const fontClass = ref("font-jost");
const BGclass = ref("bg-75_1");
// Funzione per alternare il background
const toggleBG = () => {
  BGclass.value = BGclass.value === "bg-75_1" ? "bg-75_2" : "bg-75_1";
};
const toggleFont = () => {
  fontClass.value = fontClass.value === "font-jost" ? "font-gabarito" : "font-jost";
};
</script>

<style>
.bg-75_1 {
  /* height: 100vh; */
  background: rgb(0, 61, 86);
  background: linear-gradient(
    75deg,
    rgba(0, 61, 86, 1) 0%,
    rgba(31, 113, 140, 1) 50%,
    rgba(0, 42, 65, 1) 100%
  );
}
.bg-75_2 {
  background-image: linear-gradient(
    to left bottom,
    #003d56,
    #054660,
    #0b506a,
    #115974,
    #17637e,
    #17617c,
    #16607b,
    #165e79,
    #10506b,
    #09435d,
    #04364f,
    #002a41
  );
}
/* w-screen h-screen bg-slate-300 dark:bg-woodsmoke-950 */
</style>
