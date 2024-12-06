<template>
  <main>
    <div
      id="ghirlandaContainert"
      class="test w-screen h-screen absolute top-0 left-0 -z-10"
    >
      <div id="ghirlanda-full" data-speed="0.6" class="max-w-2xl">
        <NuxtImg
          src="/assets/img/Ghirlanda_full_web_800_opt.png"
          alt="mnemonica ghirlanda ecosystem"
          densities="x1"
        />
      </div>
    </div>
    <div
      id="heroSection"
      class="flex flex-col items-center justify-center h-[calc(100vh-70px)] w-screen"
    >
      <div id="logo_mne" class="absolute opacity-5">
        <NuxtImg
          src="/assets/img/svg/Logo-mne-Vector.svg"
          densities="x1"
          alt="Mnemonica logo portrait"
        />
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
    <div id="ecosystem-container_svg">
      <MarketSvg id="Market_svg"></MarketSvg>
      <PostSvg id="Post_svg"></PostSvg>
      <ProductionSvg id="Production_svg"></ProductionSvg>
      <PreSvg id="Pre_svg"></PreSvg>
      <NuxtImg
        id="logoPhase"
        src="/assets/img/svg/Logo-mne-Vector.svg"
        alt="Mnemonica logo portrait"
      />
    </div>
  </main>
</template>

<script setup>
//Utilizzo di Gsap!!-----
import { onMounted } from "vue";
//import { gsap } from "gsap"; //importa gsap
import { useNuxtApp } from "#app"; // Ottieni NuxtApp

const { $gsap } = useNuxtApp();
//il plugin gsap ScrollTrigger lo carico direttamente con $gsap, vedi il plugin configurrato plugins/gsap.js

onMounted(() => {
  // inutile?
  // $gsap.set(".ghirlanda-updx img", { opacity: 0 });
  // $gsap.set(".ghirlanda-dwsx img", { opacity: 0 });

  //utilizzo la proprietà di gsap registerEffect per registrare un efetto che poi applico a più ogetti, per rendere il codice migliore, più leggibile e ottimizzato
  $gsap.registerEffect({
    name: "fadeIn", //il nome dell'effetto registrato
    //l'effetto vero e proprio con le sue caratteristiche
    effect: (targets, config) => {
      return $gsap.from(targets, {
        autoAlpha: config.autoAlpha,
        filter: config.filter,
        forced3D: config.forced3D,
        ease: config.ease,
        rotate: config.rotate,
        duration: config.duration,
      });
    },
    //qui dichiaro i valori di default che se non vengono passati tramite config, vengono applicati con i valori di default!!
    defaults: {
      autoAlpha: 0,
      filter: "blur(5px)",
      forced3D: true,
      ease: "power2.in",
    },
    //questo serve per utilizzare l'effetto nelle timeline senza usare add, ma semplicemente richiamando l'effetto
    // semplifica tl.add($gsap.effect.fadeIn("#ghirlanda-full", { rotate: -5, duration: 3 }))
    // in tl.fadeIn("#ghirlanda-full", { rotate: -5, duration: 3 })
    extendTimeline: true,
  });

  //applico l'effetto registrato agli elementi che voglio oppure in una timeline
  //$gsap.effect.fadeIn("#ghirlanda-full", { rotate: -5, duration: 3 });

  var tl = $gsap.timeline();
  //richiamo l'effetto registrato fadeIn nella timeline
  tl.fadeIn("#ghirlanda-full", { rotate: -5, duration: 3 });
  // la riga sopra sostituisce quanto sotto grazie alla registrazione degli effetti di gsap
  //tl.from("#ghirlanda-full", {
  //   autoAlpha: 0,
  //   rotate: -5,
  //   filter: "blur(5px)",
  //   duration: 3,
  //   force3D: true,
  // });
  tl.to("#ghirlanda-full", {
    autoAlpha: 0,
    rotate: 5,
    filter: "blur(5px)",
    duration: 3,
    force3D: true,
  });
  tl.fromTo(
    ".ghirlanda-updx img",
    {
      autoAlpha: 0,
      filter: "blur(5px)",
      duration: 0.1,
      force3D: true,
    },
    {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 3,
      force3D: true,
    },
    "< +=1"
  );
  tl.fromTo(
    ".ghirlanda-dwsx img",
    {
      autoAlpha: 0,
      filter: "blur(5px)",
      duration: 0.1,
      force3D: true,
    },
    {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 3,
      force3D: true,
    },
    "<"
  );
  tl.from(
    "#logo_mne",
    {
      opacity: 0,
      duration: 2,
    },
    "<"
  );
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

  //SVG
  $gsap.to("#m_100_circle_ecosys_0", {
    rotate: 360,
    //duration: 7.5,
    ease: "linear",
    //repeat: -1,
    transformOrigin: "50% 50%",
    scrollTrigger: {
      trigger: "#m_100_circle_ecosys_0",
      toggleActions: "resume pause resume pause",
      // start: "top 80%",
      // end: "top 20%",
      // markers: true,
      scrub: 2,
      //pin: true,
      onEnter: () => {
        console.log("Entrato da sotto");
      },
      onEnterBack: () => {
        console.log("Rientrato da sopra");
      },
      onLeave: () => {
        console.log("Uscito da sopra");
      },
      onLeaveBack: () => {
        console.log("Riuscito da sotto");
      },
      onUpdate: () => {
        console.log("Aggiornato", self.progress);
      },
    },
  });
  $gsap.to("#m_100_circle_ecosys_1", {
    rotate: 360,
    duration: 7.5,
    ease: "linear",
    repeat: -1,
    transformOrigin: "50% 50%",
    scrollTrigger: {
      trigger: "#m_100_circle_ecosys_1",
      toggleActions: "resume pause resume pause",
    },
  });
  $gsap.to("#m_100_circle_ecosys_2", {
    rotate: 360,
    duration: 7.5,
    ease: "linear",
    repeat: -1,
    transformOrigin: "50% 50%",
    scrollTrigger: {
      trigger: "#m_100_circle_ecosys_2",
      toggleActions: "resume pause resume pause",
    },
  });
  $gsap.to("#m_100_circle_ecosys_3", {
    rotate: 360,
    duration: 7.5,
    ease: "linear",
    repeat: -1,
    transformOrigin: "50% 50%",
    scrollTrigger: {
      trigger: "#m_100_circle_ecosys_3",
      toggleActions: "resume pause resume pause",
    },
  });
});
//Gsap-fine
</script>

<style>
/* @keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
} */
</style>
