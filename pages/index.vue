<template>
  <main>
    <div id="hero-section" class="section">
      <div id="ghirlanda-element" class="element">
        <div id="logo_mne" class="">
          <NuxtImg
            src="/assets/img/svg/Logo-mne-Vector.svg"
            densities="x1"
            alt="Mnemonica logo portrait"
          />
        </div>
        <NuxtImg
          src="/assets/img/Ghirlanda_full_web_800_opt.png"
          alt="mnemonica ghirlanda ecosystem"
          densities="x1"
        />
      </div>
      <div id="hero-content-wrapper" class="wrapper">
        <div id="hero-content" class="content">
          <div id="heroTitle" class="flex items-center gap-10 justify-center flex-wrap">
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
      <div id="modules-element" class="element">
        <Modules id="modules_svg"></Modules>
        <p id="made_for">MADE FOR</p>
      </div>
      <div id="modules-content-wrapper" class="wrapper">
        <div id="modules-content" class="content">
          <div id="module-txt_1" class="module_txt">
            <h2>Rooms</h2>
            <p>
              Leave folders behind. Experience active workspaces that free you from
              repetitive tasks encoding, watermarking, keeping everyone updated. Enjoy
              private places where people meet around media, playlists are a given,
              content is easy to find and move.
            </p>
          </div>
          <div id="module-txt_2" class="module_txt">
            <h2>Boxes</h2>
            <p>
              Forget hard drives and LTOs. Welcome to the most advanced and reliable
              solution for long-term preservation of digital film works that also keeps
              them always available for business opportunities and cultural outreach.
              Arrange immediate screenings with integrated Rooms, easily retrieve relevant
              assets, securely deliver to stakeholders.
            </p>
          </div>
          <div id="module-txt_3" class="module_txt">
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
    <div id="phases-section" class="section">
      <div id="phases-element" class="element">
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
      <div id="phases-content-wrapper" class="wrapper">
        <div id="phases-content" class="content">
          <PhasesChips></PhasesChips>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

onMounted(() => {
  console.log("Home mounted!!");
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

  ///ANCHOR - Modules section

  $gsap.to("#made_for", {
    textShadow: `0 0 7px rgba(184, 239, 250, 0.1), 0 0 10px rgba(184, 239, 250, 0.1), 0 0 42px rgba(184, 239, 250, 0.1)`,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "linear",
  });

  const modules_tl = $gsap.timeline({
    scrollTrigger: {
      trigger: "#modules-section", // Elemento che attiva l'animazione
      start: "top +=75", // Quando inizia l'animazione
      end: "bottom top", // Durata dello scroll
      invalidateOnRefresh: true,
      scrub: true, // Sincronizzazione con lo scroll
      anticipatePin: 1,
      pin: true, // Fissa il contenitore #hero-section
      //markers: true,
      snap: {
        snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
        duration: { min: 0.2, max: 0.5 }, // Durata dell'animazione di aggancio
        ease: "back.out(1.7)", // Easing dell'animazione di aggancio
        // ease: "linear",
      },
      onSnapComplete: ({ progress, direction, isActive }) =>
        console.log(progress, direction, isActive),
    },
    defaults: { duration: 0.75, ease: "back.out" },
  });

  modules_tl.to(
    "#modules_svg",
    {
      rotate: 120,
      onComplete: () => {
        console.log("ho fatt la prima rotate 120");
      },
    },
    0
  );

  modules_tl.to(
    "#modules_svg",
    {
      rotate: 120,
    },
    1
  );
  modules_tl.to(
    "#modules-content #module-txt_1",
    {
      opacity: 0,
    },
    1
  );
  modules_tl.to(
    "#modules-content #module-txt_2",
    {
      opacity: 1,
    },
    1
  );
  modules_tl.to(
    "#modules_svg",
    {
      rotate: 240,
    },
    2
  );
  modules_tl.to(
    "#modules-content #module-txt_2",
    {
      opacity: 0,
    },
    2
  );
  modules_tl.to(
    "#modules-content #module-txt_3",
    {
      opacity: 1,
    },
    2
  );

  //ANCHOR - Phases Section

  const phases_tl = $gsap.timeline({
    scrollTrigger: {
      trigger: "#phases-section", // Elemento che attiva l'animazione
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

  phases_tl
    .to(
      "#m_100_circle_ecosys_0",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0
    )
    .from(
      "#Pre_txt",
      {
        autoAlpha: 0,
      },
      0
    )
    .to(
      "#m_100_circle_ecosys_1",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0.3
    )
    .from(
      "#Production_txt",
      {
        autoAlpha: 0,
      },
      0.3
    )
    .to(
      "#m_100_circle_ecosys_2",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0.6
    )
    .from(
      "#Post_txt",
      {
        autoAlpha: 0,
      },
      0.6
    )
    .to(
      "#m_100_circle_ecosys_3",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0.9
    )
    .from(
      "#Market_txt",
      {
        autoAlpha: 0,
      },
      0.9
    );
});
</script>

<style></style>
