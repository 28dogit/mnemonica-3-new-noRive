<template>
  <main>
    <div
      id="heroSection"
      class="flex flex-col items-center justify-center h-[calc(100vh-70px)] w-screen"
    >
      <div id="logo_mne" class="absolute opacity-5 w-3xl">
        <img src="/assets/img/svg/Logo-mne-Vector.svg" alt="Mnemonica logo portrait" />
      </div>
      <div id="heroTitle" class="flex items-center gap-10 justify-center flex-wrap">
        <h1 id="H-screen" class="uppercase">Screen</h1>
        <h1 id="H-deliver" class="uppercase">Deliver</h1>
        <h1 id="H-preserve" class="uppercase">Preserve</h1>
      </div>
      <h2 id="heroSubTitle" class="hidden min-[680px]:block text-center">
        Connecting the dots of the digital cinema living ecosystem
      </h2>
      <h2 id="heroSubTitle" class="text-center min-[680px]:hidden">
        Connecting the dots of the digital <br />cinema living ecosystem
      </h2>
    </div>
  </main>
</template>

<script lang="ts" setup>
//Utilizzo di Gsap!!-----
import { onMounted } from "vue";
import { gsap } from "gsap"; //importa gsap

onMounted(() => {
  var tl = gsap.timeline({ ease: "power2.in" });

  tl.from(".ghirlanda-updx img", {
    opacity: 0,
    filter: "blur(5px)",
    duration: 2,
  });

  tl.from(
    ".ghirlanda-dwsx img",
    {
      opacity: 0,
      filter: "blur(5px)",
      duration: 2,
    },
    "<"
  );
  tl.from("#logo_mne", {
    opacity: 0,
    duration: 2,
  });
  tl.from(
    "#H-screen",
    {
      y: "-10px",
      opacity: 0,
      duration: 0.5,
    },
    "<"
  );
  tl.from(
    "#H-deliver",
    {
      y: "-10px",
      opacity: 0,
      duration: 0.5,
    },
    ">"
  );
  tl.from(
    "#H-preserve",
    {
      y: "-10px",
      opacity: 0,
      duration: 0.5,
    },
    ">"
  );
  tl.from(
    "#heroSubTitle",
    {
      y: "15px",
      opacity: 0,
      duration: 0.5,
    },
    "-=1"
  );
});
//Gsap-fine
</script>

<style></style>
