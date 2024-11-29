<template>
  <main>
    <div
      id="ghirlandaContainert"
      class="test w-screen h-screen absolute top-0 left-0 -z-10"
    >
      <div id="ghirlanda-full" data-speed="0.6">
        <img
          src="/assets/img/Ghirlanda_full_web_800_opt.png"
          alt="mnemonica ghirlanda ecosystem"
        />
      </div>
    </div>
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
      <div id="ecosystem-container">
        <img
          src="assets/img/m_ecosystem/m_circle_ecosys_0.svg"
          alt="mnemonica ecosystem pre-production"
          id="m-ecoCircle_0"
        />
        <img
          src="assets/img/m_ecosystem/m_circle_ecosys_1.svg"
          alt="mnemonica ecosystem production"
          id="m-ecoCircle_1"
        />
        <img
          src="assets/img/m_ecosystem/m_circle_ecosys_2.svg"
          alt="mnemonica ecosystem post-production"
          id="m-ecoCircle_2"
        />
        <img
          src="assets/img/m_ecosystem/m_circle_ecosys_3.svg"
          alt="mnemonica ecosystem market"
          id="m-ecoCircle_3"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
//Utilizzo di Gsap!!-----
import { onMounted } from "vue";
import { gsap } from "gsap"; //importa gsap

onMounted(() => {
  var tl = gsap.timeline({ ease: "power2.in" });
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
    "> -=0.3"
  );
  tl.from(
    "#H-preserve",
    {
      y: "-10px",
      opacity: 0,
      duration: 0.5,
    },
    "> -=0.3"
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

  ///ANCHOR - ecosysstem gsap
  // gsap.to("#m-ecoCircle_0", {
  //   rotate: 360,
  //   duration: 2.5,
  //   ease: "linear",
  //   repeat: -1,
  // });
  // gsap.to("#m-ecoCircle_1", {
  //   rotate: 360,
  //   duration: 3.5,
  //   ease: "linear",
  //   repeat: -1,
  // });
  // gsap.to("#m-ecoCircle_2", {
  //   rotate: 360,
  //   duration: 2.8,
  //   ease: "linear",
  //   repeat: -1,
  // });
  // gsap.to("#m-ecoCircle_3", {
  //   rotate: 360,
  //   duration: 4.2,
  //   ease: "linear",
  //   repeat: -1,
  // });
});
//Gsap-fine
</script>

<style></style>
