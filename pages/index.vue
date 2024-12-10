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
    <div id="modules" class="px-5 py-6 relative overflow-hidden text-center">
      <div id="rooms" class="module">
        <h2 class="font-medium">Rooms</h2>
        <p>
          Leave folders behind. Experience active workspaces that free you from repetitive
          tasks encoding, watermarking, keeping everyone updated. Enjoy private places
          where people meet around media, playlists are a given, content is easy to find
          and move.
        </p>
      </div>
      <div id="boxes" class="module">
        <h2 class="font-medium">Boxes</h2>
        <p>
          Forget hard drives and LTOs. Welcome to the most advanced and reliable solution
          for long-term preservation of digital film works that also keeps them always
          available for business opportunities and cultural outreach. Arrange immediate
          screenings with integrated Rooms, easily retrieve relevant assets, securely
          deliver to stakeholders.
        </p>
      </div>
      <div id="masters" class="module">
        <h2 class="font-medium">Masters</h2>
        <p>
          Get rid of third-party shuttles. With the built-in data exchange facility, you
          can send & receive files and folders of any size and complexity directly from/to
          Rooms, as well as local drives. Only between registered users, without leaving
          Mnemonica safe walls.
        </p>
      </div>
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
import { useNuxtApp } from "#app"; // Ottieni NuxtApp dla plugin gsap.js > con $gsap registro sia gsap che i relativi plugins come scrollTrigger
import { _scale } from "#tailwind-config/theme";

onMounted(() => {
  //per i riferimenti vedi test_old_2_gsap_explained.vue
  const { $gsap } = useNuxtApp();

  $gsap.registerEffect({
    // effetto per l'entrata in Fade
    name: "fadeIn",
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
    defaults: {
      autoAlpha: 0,
      filter: "blur(5px)",
      forced3D: true,
      ease: "power2.in",
    },
    extendTimeline: true,
  });

  $gsap.registerEffect({
    // effetto per l'entrata delle scritte e del logo in Hero section
    name: "EnterFrom",
    effect: (targets, config) => {
      return $gsap.from(targets, {
        autoAlpha: 0,
        duration: config.duration,
        y: config.y,
      });
    },
    defaults: {},
    extendTimeline: true,
  });

  var tl = $gsap.timeline();

  tl.fadeIn("#ghirlanda-full", { rotate: -5, duration: 3 });
  tl.EnterFrom("#logo_mne", { duration: 2 });
  tl.EnterFrom("#H-screen", { duration: 0.5, y: "-10px" }, "<");
  tl.EnterFrom("#H-deliver", { duration: 0.5, y: "-10px" }, "> -=0.3");
  tl.EnterFrom("#H-preserve", { duration: 0.5, y: "-10px" }, "> -=0.3");
  tl.EnterFrom("#heroSubTitle", { duration: 0.5, y: "15px" }, "-=1");
  tl.to("#ghirlanda-full", {
    autoAlpha: 0,
    rotate: 5,
    filter: "blur(5px)",
    duration: 1.5,
    scale: 5,
    force3D: true,
    ease: "power1.in",
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

  //SVG
  $gsap.registerEffect({
    name: "phaseRotation",
    effect: (targets, config) => {
      return $gsap.to(targets, {
        rotate: 360,
        ease: config.ease,
        transformOrigin: "50% 50%",
        repeat: config.repeat,
        //duration: config.duration,
        //scrollTrigger: config.scrollTrigger,
        scrollTrigger: {
          trigger: targets,
          start: "top 80%",
          end: "bottom 500px",
          scrub: 1,
          //markers: true,
          toggleActions: "resume pause resume pause",
        },
      });
    },
    defaults: {
      ease: "linear",
      //repeat: -1,
    },
    extendTimeline: false,
  });

  //Da continuare!!

  $gsap.effects.phaseRotation("#m_100_circle_ecosys_0", { duration: 7.5 });
  $gsap.effects.phaseRotation("#m_100_circle_ecosys_1", { duration: 8.5 });
  $gsap.effects.phaseRotation("#m_100_circle_ecosys_2", { duration: 7.8 });
  $gsap.effects.phaseRotation("#m_100_circle_ecosys_3", { duration: 9.5 });

  // ScrollTrigger.batch(
  //   "#m_100_circle_ecosys_0, #m_100_circle_ecosys_1, #m_100_circle_ecosys_2, #m_100_circle_ecosys_3",
  //   {
  //     onEnter: (targets) => {
  //       $gsap.effect.phaseRotation(targets, {
  //         scrollTrigger: { toggleActions: "resume" },
  //       });
  //     },
  //     onLeave: (targets) => {
  //       $gsap.effect.phaseRotation(targets, {
  //         scrollTrigger: { toggleActions: "pause" },
  //       });
  //     },
  //     onEnterBack: (targets) => {
  //       $gsap.effect.phaseRotation(targets, {
  //         scrollTrigger: { toggleActions: "resume" },
  //       });
  //     },
  //     onLeaveBack: (targets) => {
  //       $gsap.effect.phaseRotation(targets, {
  //         scrollTrigger: { toggleActions: "pause" },
  //       });
  //     },
  //   }
  // );

  //ANCHOR - MODULES
  $gsap.from("#modules", {
    autoAlpha: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#rooms",
      pin: "#rooms",
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none none",
      scrub: 1,
      markers: true,
    },
  });
});
//Gsap-fine
</script>

<style></style>
