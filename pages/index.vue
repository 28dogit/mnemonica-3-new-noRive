<template>
  <main>
    <div
      id="ghirlandaContainert"
      class="test w-screen h-screen absolute top-0 left-0 -z-10 overflow-x-hidden"
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
      class="flex flex-col items-center justify-center h-[calc(100vh-70px)] w-screen overflow-x-hidden"
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
    <div id="modulesSection" class="px-5 py-6 relative text-center">
      <div id="rooms" class="module">
        <h2 class="font-medium">Rooms</h2>
        <p>
          Leave folders behind. Experience active workspaces that free you from repetitive
          tasks encoding, watermarking, keeping everyone updated. Enjoy private places
          where people meet around media, playlists are a given, content is easy to find
          and move.
        </p>
        <div id="rooms--circleBG"></div>
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
        <div id="boxes--circleBG"></div>
      </div>
      <div id="masters" class="module">
        <h2 class="font-medium">Masters</h2>
        <p>
          Get rid of third-party shuttles. With the built-in data exchange facility, you
          can send & receive files and folders of any size and complexity directly from/to
          Rooms, as well as local drives. Only between registered users, without leaving
          Mnemonica safe walls.
        </p>
        <div id="masters--circleBG"></div>
      </div>
    </div>
    <div id="modulesSection_2" class="modules test2">
      <div id="rooms2" class="module2">
        <h1>Rooms</h1>
      </div>
      <div id="boxes2" class="module2"><h1>Boxes</h1></div>
      <div id="masters2" class="module2"><h1>Masters</h1></div>
    </div>
    <div id="ecosystemSection">
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
import { ScrollTrigger } from "gsap/ScrollTrigger"; // importato qui l'ho importato per tutto il progetto
import { useNuxtApp } from "#app"; // Ottieni NuxtApp dla plugin gsap.js > con $gsap registro sia gsap che i relativi plugins come scrollTrigger
import { _scale } from "#tailwind-config/theme";

onMounted(() => {
  //per i riferimenti vedi test_old_2_gsap_explained.vue
  const { $gsap } = useNuxtApp();

  $gsap.to("[data-speed]", {
    y: (i, el) =>
      (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0,
      force3D: true,
    },
  });

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

  //ANCHOR - MODULES
  $gsap.from("#rooms--circleBG", {
    transformOrigin: "50% 35%",
    rotate: 120,
    //autoAlpha: 0,
    scrollTrigger: {
      trigger: "#rooms",
      //pin: "#rooms--circleBG",
      start: "center center",
      end: "+300px center",
      toggleActions: "play reverse play none",
      scrub: 2,
      //markers: true,
    },
  });
  $gsap.from("#rooms", {
    autoAlpha: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#rooms",
      pin: "#rooms",
      start: "center center",
      end: "+300px center",
      //toggleActions: "play reverse play none",
      scrub: 1,
      //markers: true,
    },
  });
  $gsap.from("#boxes--circleBG", {
    transformOrigin: "30% 50%",
    rotate: -120,
    //autoAlpha: 0,
    scrollTrigger: {
      trigger: "#boxes",
      start: "center center",
      end: "+300px center",
      scrub: 2,
      //markers: true,
    },
  });
  $gsap.from("#boxes", {
    autoAlpha: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#boxes",
      pin: "#boxes",
      start: "center center",
      end: "+300px center",
      //toggleActions: "play none none none",
      scrub: 1,
      //markers: true,
    },
  });
  $gsap.from("#masters--circleBG", {
    transformOrigin: "30% 50%",
    rotate: 80,
    //autoAlpha: 0,
    scrollTrigger: {
      trigger: "#masters",
      start: "center center",
      end: "+300px center",
      scrub: 2,
      //markers: true,
    },
  });
  $gsap.from("#masters", {
    autoAlpha: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: "#masters",
      pin: "#masters",
      start: "center center",
      end: "+300px center",
      scrub: 1,
      //markers: true,
      onLeave: () => {
        //ho risolto in modo diverso
        $gsap.set("#modulesSection", {
          css: {
            overflowY: "visible",
          },
        });
        //console.log("Masters Y Uscito da sotto");
      },
    },
  });

  //--------
  //const lines = document.querySelectorAll(".module2");

  // Timeline GSAP
  //const tl2 = $gsap.timeline({ paused: false });

  // Primo h1: parte da sotto e si porta al centro
  // $gsap.from(lines[0], {
  //   y: 100,
  //   autoAlpha: 0,
  //   //duration: 1,
  //   ease: "power4.out",
  //   scrollTrigger: {
  //     trigger: lines[0],
  //     scrub: 1,
  //     start: "top 60%",
  //     end: "bottom center",
  //     pin: ".module2",
  //     markers: true,
  //   },
  // });
  $gsap.from("#rooms2", {
    autoAlpha: 0,
    //duration: 0.8,
    scrollTrigger: {
      trigger: "#rooms2",
      pin: "#rooms2",
      start: "top 60%",
      end: "bottom center",
      //toggleActions: "play reverse play none",
      scrub: 1,
      markers: true,
    },
  });
  $gsap.from("#boxes2", {
    autoAlpha: 0,
    //duration: 0.8,
    scrollTrigger: {
      trigger: "#boxes2",
      pin: "#boxes2",
      start: "top 60%",
      end: "bottom center",
      toggleActions: "play pause play pause",
      scrub: 1,
      markers: true,
    },
  });

  // $gsap.to(lines[0], {
  //   y: -20,
  //   duration: 0.5,
  //   ease: "power4.out",
  // });
  // $gsap.from(
  //   lines[1],
  //   {
  //     y: 100,
  //     opacity: 0,
  //     duration: 1,
  //     ease: "power4.out",
  //   },
  //   "<"
  // );

  // Terzo h1: spinge sia il primo che il secondo h1 verso l'alto.
  // In questo caso il primo andrà a -40px, il secondo a -20px,
  // mentre il terzo rimarrà al centro (0).
  // $gsap.to([lines[0], lines[1]], {
  //   y: (i) => -20 * (i + 2), // lines[0]: -40, lines[1]: -20
  //   duration: 0.5,
  //   ease: "power4.out",
  // });
  // $gsap.from(
  //   lines[2],
  //   {
  //     y: 100,
  //     opacity: 0,
  //     duration: 1,
  //     ease: "power4.out",
  //   },
  //   "<"
  // );

  //--------

  //ANCHOR - SVG ecosystem
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
          trigger: "#ecosystemSection", // problema di lettura degli ingombri!!! arrivano troppo presto
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
});
//Gsap-fine
</script>

<style></style>
