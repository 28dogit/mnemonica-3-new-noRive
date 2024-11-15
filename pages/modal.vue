<template>
  <div :class="fontClass" class="py-5 px-16 max-w-[1920px] mx-auto">
    <span><button @click="toggleFont">Cambio Font</button></span>
    <article class="prose">
      <h1 :class="fontClass" class="">Modali test</h1>
      <p :class="fontClass" class="font-[300] text-lg">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse suscipit quos nisi
        accusantium ad. Iure tenetur itaque saepe veritatis soluta, dicta, ipsa ab ea
        officia ducimus doloribus blanditiis a odio. <br />Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Esse suscipit quos nisi accusantium ad. Iure tenetur
        itaque saepe veritatis soluta, dicta, ipsa ab ea officia ducimus doloribus
        blanditiis a odio.
        <span>
          <button @click="openModal" class="bg-slate-800 text-orange-500 px-3">
            Focus
          </button>
        </span>
      </p>
      <p :class="fontClass" class="font-[300] text-lg">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse suscipit quos nisi
        accusantium ad. Iure tenetur itaque saepe veritatis soluta, dicta, ipsa ab ea
        officia ducimus doloribus blanditiis a odio.
      </p>
    </article>
  </div>
  <Modals :isOpen="isModalOpen" @close="closeModal" />
</template>

<script setup>
import { ref } from "vue";
import Modals from "~/components/modals.vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

//--------

// Stato reattivo per i classi del font e del background

const fontClass = ref("font-jost");
const toggleFont = () => {
  fontClass.value = fontClass.value === "font-jost" ? "font-montserrat" : "font-jost";
};
</script>

<style></style>
