<template>
  <div class="max-w-[1700px] m-auto px-16">
    <!-- <div class="box w-8 h-8 rounded bg-lime-600"></div>
    <div class="box2 w-8 h-8 rounded bg-orange-600"></div>
    <div class="box3 w-8 h-8 rounded bg-violet-600"></div> -->
    <!-- <ContentDoc class="sm:text-orange-500 md:text-slate-600 lg:text-lime-500" /> -->
    <ContentDoc v-slot="{ doc }">
      <article>
        <h1 class="text-seagull-400 dark:text-orange-400">{{ doc.title }}</h1>
        <p class="dark:text-orange-600">{{ doc.description }}</p>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </div>
</template>

<script setup>
// console.groupCollapsed(
//   "%c Site Credits",
//   "display:block;padding:0.125em 1em;font-family:courier;font-size:14px;font-weight:bold;line-height:2;text-transform:uppercase;background:black;color:white;"
// ),
//   console.log(
//     "%cDesign by Alright Studio \n– https://alright.studio",
//     "display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;"
//   ),
//   console.log(
//     "%cDevelopment by Nick DiMatteo \n– https://nickdimatteo.com",
//     "display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;"
//   ),
//   console.groupEnd();

console.groupCollapsed("Site Credits");
console.log("ciao");
console.log("test");

//Utilizzo di Gsap
// import { onMounted } from "vue";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// const tl = gsap.timeline({ defaults: { duration: 1, ease: "back" } });

// onMounted(() => {
//   tl.to(".box2", { rotation: -270 }).to(".box3", { rotation: 360 }).to(".box", {
//     duration: 3,
//     rotation: 360,
//     scale: 2,
//     repeat: -1,
//     yoyo: true,
//   });
// });
//fine - Utilizzo di Gsap
</script>

<style></style>
