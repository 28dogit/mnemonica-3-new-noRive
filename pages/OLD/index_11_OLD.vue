<template>
  <main>
    <div id="hero-section" class="section">
      <div id="ghirlanda-element" class="element">
        <!-- <div id="logo_mne" class=""> -->
        <!-- <NuxtImg
          id="logo_mne"
          src="/assets/img/svg/Logo-mne-Vector.svg"
          densities="x1"
          alt="Mnemonica logo portrait"
        /> -->
        <!-- </div> -->
        <NuxtImg
          id="ghirlanda_img"
          src="/assets/img/Ghirlanda_full_web_800_opt.png"
          alt="mnemonica ghirlanda ecosystem"
          densities="x1"
        />
      </div>
      <div id="hero-content-wrapper" class="wrapper">
        <div id="hero-content" class="content">
          <div id="heroTitle" class="flex items-center justify-center flex-wrap">
            <div class="overflowMask overflow-hidden">
              <h1 id="H-screen" class="uppercase">Screen</h1>
            </div>
            <div class="overflowMask overflow-hidden">
              <h1 id="H-deliver" class="uppercase">Deliver</h1>
            </div>
            <div class="overflowMask overflow-hidden">
              <h1 id="H-preserve" class="uppercase">Preserve</h1>
            </div>
          </div>
          <h2 id="heroSubTitle" class="hidden min-[680px]:block text-center">
            Connecting the dots of the digital cinema living ecosystem
          </h2>
          <h2 id="heroSubTitle" class="text-center min-[680px]:hidden">
            Connecting the dots of the digital <br />cinema living ecosystem
          </h2>
        </div>
      </div>
    </div>
    <div id="modules-section" class="section">
      <ModulesComp></ModulesComp>
    </div>
    <div id="phases-section" class="section">
      <PhasesComp></PhasesComp>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
import { ScrollTrigger } from "gsap/ScrollTrigger";

onMounted(() => {
  //console.log("Home mounted!!");
  const { $gsap } = useNuxtApp();

  // registro effetto per l'entrata delle scritte e del logo in Hero section
  $gsap.registerEffect({
    name: "EnterFrom",
    effect: (targets, config) => {
      return $gsap.from(targets, {
        autoAlpha: 0,
        duration: config.duration,
        y: config.y,
        ease: config.ease,
      });
    },
    defaults: {
      ease: "back.out",
      y: "100",
    },
    extendTimeline: true,
  });
  // implemento la timeline intro che sbloccherà alla fine l'overflow hidden del body per ripristinare lo scroll
  const intro = $gsap.timeline({
    onComplete: () => {
      //console.log("Ripristino scroll");
      $gsap.set("body", { overflow: "auto" });
    },
  });

  intro.from("#ghirlanda-element", {
    autoAlpha: 0,
    rotate: 5,
    filter: "blur(5px)",
    duration: 1.5,
    scale: 0.9,
    force3D: true,
    ease: "power2.inOut",
  });
  intro.EnterFrom("#logo_mne", { duration: 2, y: "0" });
  intro.EnterFrom("#H-screen", { duration: 0.7 }, "<");
  intro.EnterFrom("#H-deliver", { duration: 0.7 }, "> -=0.3");
  intro.EnterFrom("#H-preserve", { duration: 0.7 }, "> -=0.3");
  intro.EnterFrom("#heroSubTitle", { duration: 0.5, y: "-25px" }, "-=0.7");
});
</script>

<style lang="scss" scoped></style>
