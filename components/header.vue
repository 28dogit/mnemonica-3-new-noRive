<template>
  <div
    id="hWrapper"
    class="sticky top-0 max-w-[1920px] px-7 pt-5 text-center z-[999] backdrop-blur-md"
  >
    <!-- <div
      id="menuWrapper"
      class="flex min-h-[100px] items-center text-black bg-slate-200 dark:text-slate-300 dark:bg-slate-800 rounded-3xl m-auto"
    > -->
    <div
      id="menuWrapper"
      class="flex min-h-[100px] items-center text-black dark:text-slate-300 m-auto border-b-[1px] border-solid border-slate-700"
    >
      <div id="logoWrapper" class="flex w-3/12 justify-start pl-10">
        <img
          class="logo max-w-44"
          alt="Vue logo"
          src="@/assets/img/svg/MN-Brand-Light.svg"
        />
      </div>
      <div id="navWrapper" class="flex w-9/12 justify-end pr-10">
        <Nav class="hidden md:visible md:flex" />
        <NavMobile class="md:hidden" />

        <!-- <div class="darktoggle ml-12"><DarkModeToggle /></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
//Utilizzo di Gsap!!-----
gsap.registerPlugin(ScrollTrigger);

import { onMounted } from "vue";
import { gsap } from "gsap"; //importa gsap
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Aggiungi un'animazione quando il componente viene montato sarà poi triggerata allo scroll
onMounted(() => {
  gsap.to("#menuWrapper", {
    scrollTrigger: {
      trigger: "#mainContent",
      start: "top+=150px top+=135px",
      end: "top+=150px top+=130px",
      toggleActions: "play none reverse none",
      markers: false,
      // scrub: true, //animazione durante lo scroll
    },
    boxShadow: "0px 12px 18px -6px rgba(0, 0, 0, 0.3)",
    duration: 0.5,
  });
});
//Gsap-fine
</script>
