<template>
  <main>
    <div id="hero-section">
      <div id="ghirlanda-element">
        <div id="pseudoG"></div>
      </div>
      <div id="hero-content-wrapper">
        <div id="hero-content"><p>HERO</p></div>
      </div>
    </div>
    <div id="modules-section">
      <div id="modules-element">
        <svg viewBox="0 0 100 100" class="circle-place-holder">
          <circle cx="50" cy="50" r="50"></circle>
        </svg>
      </div>
      <div id="modules-content-wrapper">
        <div id="modules-content"><p>MODULES</p></div>
      </div>
    </div>
    <div id="phases-section">
      <div id="phases-element">
        <svg viewBox="0 0 100 100" class="circle-place-holder">
          <circle cx="50" cy="50" r="50"></circle>
        </svg>
      </div>
      <div id="phases-content-wrapper">
        <div id="phases-content"><p>PHASES</p></div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
//import { ScrollTrigger } from "gsap/ScrollTrigger";

onMounted(() => {
  const { $gsap } = useNuxtApp();

  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-section", // Elemento che attiva l'animazione
      start: "top +=60", // Quando inizia l'animazione
      end: "bottom +=40", // Durata dello scroll
      scrub: true, // Sincronizzazione con lo scroll
      pin: true, // Fissa il contenitore #hero-section
      snap: {
        snapTo: "labels",
        duration: 0.3,
        ease: "power1.in",
      },
    },
  });

  // console.log(tl.labels); // Mostra tutte le etichette della timeline

  tl.to(
    "#pseudoG",
    {
      rotate: 120,
      duration: 0.3,
      ease: "power4.out",
    },
    0
  );
  tl.addLabel("pseudoEnd1", 0.3);
  tl.from(
    "#hero-content",
    {
      opacity: 0,
      duration: 0.3, // Durata relativa nella timeline
      ease: "power1.out",
    },
    0
  );
  tl.to(
    "#pseudoG",
    {
      rotate: 240,
      duration: 0.3,
      ease: "power4.out",
    },
    0.3
  );
  tl.addLabel("pseudoEnd2", 0.6);
  tl.to(
    "#hero-content",
    {
      opacity: 0,
      duration: 0.3, // Durata relativa nella timeline
      ease: "power1.out",
    },
    0.3
  );
  // tl.from(
  //   "#ghirlanda-element",
  //   {
  //     autoAlpha: 0,
  //     duration: 1, // Durata relativa nella timeline
  //     ease: "power1.inOut",
  //   },
  //   0
  // );
  // tl.to(
  //   "#hero-content",
  //   {
  //     rotation: 50,
  //     duration: 1, // Durata relativa nella timeline
  //     ease: "power1.out",
  //   },
  //   0.3
  // );

  // $gsap.registerEffect({
  //   name: "BehaviorOnScroll",
  //   effect: (targets, config) => {
  //     return $gsap.from(targets, {
  //       autoAlpha: config.autoAlpha,
  //       scrollTrigger: {
  //         trigger: "#hero-section",
  //         pin: "#hero-section",
  //         pinnedContainer: "#hero-section",
  //         start: "top +=70",
  //         end: "bottom +=50",
  //         scrub: 1,
  //         markers: true,
  //       },
  //     });
  //   },
  //   defaults: {
  //     autoAlpha: 0,
  //   },
  //   extendTimeline: true,
  // });

  // $gsap.effects.BehaviorOnScroll("#ghirlanda-element", {});
  // $gsap.effects.BehaviorOnScroll("#hero-content", {}, "<");
});
</script>

<style></style>
