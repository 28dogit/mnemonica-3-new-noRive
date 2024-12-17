<template>
  <main>
    <div id="hero-section">
      <div id="ghirlanda-element">
        <svg viewBox="0 0 100 100" class="circle-place-holder">
          <circle cx="50" cy="50" r="50"></circle>
        </svg>
      </div>
      <div id="hero-content-wrapper">
        <div id="hero-content">
          <p>Hero Section</p>
        </div>
      </div>
    </div>
    <div id="modules-section">
      <div id="modules-element">
        <Modules id="modules_svg"></Modules>
        <p id="made_for">MADE FOR</p>
      </div>
      <div id="modules-content-wrapper">
        <div id="modules-content">
          <div id="module-txt_1">
            <p>Hero Section</p>
            <h2>Rooms</h2>
            <p>
              Leave folders behind. Experience active workspaces that free you from
              repetitive tasks encoding, watermarking, keeping everyone updated. Enjoy
              private places where people meet around media, playlists are a given,
              content is easy to find and move.
            </p>
          </div>
          <div id="module-txt_2">
            <h2>Boxes</h2>
            <p>
              Forget hard drives and LTOs. Welcome to the most advanced and reliable
              solution for long-term preservation of digital film works that also keeps
              them always available for business opportunities and cultural outreach.
              Arrange immediate screenings with integrated Rooms, easily retrieve relevant
              assets, securely deliver to stakeholders.
            </p>
          </div>
          <div id="module-txt_3">
            <h2>Masters</h2>
            <p>
              Get rid of third-party shuttles. With the built-in data exchange facility,
              you can send & receive files and folders of any size and complexity directly
              from/to Rooms, as well as local drives. Only between registered users,
              without leaving Mnemonica safe walls.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="phases-section">
      <div id="phases-element">
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
      trigger: "#modules-section", // Elemento che attiva l'animazione
      start: "top +=60", // Quando inizia l'animazione
      end: "bottom +=40", // Durata dello scroll
      scrub: true, // Sincronizzazione con lo scroll
      pin: true, // Fissa il contenitore #hero-section
      snap: {
        snapTo: "labels",
        duration: 0.1,
        ease: "linear",
      },
    },
  });

  console.log(tl.labels); // Mostra tutte le etichette della timeline

  tl.to(
    "#modules_svg",
    {
      rotate: 120,
      duration: 3,
      ease: "power4.out",
    },
    0
  );
  tl.addLabel("pseudoEnd1", 3);
  tl.to(
    "#modules-content #module-txt_1",
    {
      opacity: 0,
      duration: 1.5, // Durata relativa nella timeline
      ease: "power1.out",
    },
    0
  );
  tl.to(
    "#modules-content #module-txt_2",
    {
      opacity: 1,
      duration: 1.5, // Durata relativa nella timeline
      ease: "power1.out",
    },
    0
  );
  tl.to(
    "#modules_svg",
    {
      rotate: 240,
      duration: 3,
      ease: "power4.out",
    },
    3
  );
  tl.addLabel("pseudoEnd2", 6);
  tl.to(
    "#modules-content #module-txt_2",
    {
      opacity: 0,
      duration: 1.5, // Durata relativa nella timeline
      ease: "power1.out",
    },
    3
  );
  tl.to(
    "#modules-content #module-txt_3",
    {
      opacity: 1,
      duration: 1.5, // Durata relativa nella timeline
      ease: "power1.out",
    },
    3
  );
  // tl.to(
  //   "#modules-content",
  //   {
  //     autoAlpha: 0,
  //     duration: 3, // Durata relativa nella timeline
  //     ease: "power1.out",
  //   },
  //   3
  // );
  // tl.to(
  //   "#modules_svg",
  //   {
  //     rotate: 360,
  //     duration: 4,
  //     ease: "power4.out",
  //   },
  //   6
  // );
  // tl.addLabel("pseudoEnd3", 10);
  // tl.to(
  //   "#modules-content",
  //   {
  //     opacity: 1,
  //     duration: 4, // Durata relativa nella timeline
  //     ease: "power1.out",
  //   },
  //   6
  // );
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
