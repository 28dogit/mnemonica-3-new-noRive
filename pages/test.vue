<template>
  <div :class="fontClass" class="py-5 px-16 max-w-[1920px] mx-auto">
    <span><button class="btnToggle" @click="toggleFont">Cambio Font</button></span>
    <article class="">
      <h1 :class="fontClass" class="uppercase">Screen deliver preserve</h1>
      <p :class="fontClass" class="font-[300] text-lg">
        1234567890 - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
        suscipit quos nisi accusantium ad. Iure tenetur itaque saepe veritatis soluta,
        dicta, ipsa ab ea officia ducimus doloribus blanditiis a odio. <br />Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Esse suscipit quos nisi accusantium
        ad. Iure tenetur itaque saepe veritatis soluta, dicta, ipsa ab ea officia ducimus
        doloribus blanditiis a odio.
      </p>
      <p :class="fontClass" class="font-[300] text-lg">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse suscipit quos nisi
        accusantium ad. Iure tenetur itaque saepe veritatis soluta, dicta, ipsa ab ea
        officia ducimus doloribus blanditiis a odio.
      </p>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// Stato reattivo per classe del font
const fontClass = ref("font-jost");
const toggleFont = () => {
  fontClass.value = fontClass.value === "font-jost" ? "font-montserrat" : "font-jost";
};
</script>

<style></style>
