<template>
  <div id="modules-element" class="element zxzx">
    <Modules id="modules_svg"></Modules>
    <p id="made_for">MADE FOR</p>
  </div>
  <div id="modules-content-wrapper" class="wrapper">
    <div id="modules-content" class="content">
      <div id="module-txt_1" class="module_txt">
        <h2>Rooms</h2>
        <p>
          Leave folders behind. Experience active workspaces that free you from repetitive
          tasks encoding, watermarking, keeping everyone updated. Enjoy private places
          where people meet around media, playlists are a given, content is easy to find
          and move.
        </p>
      </div>
      <div id="module-txt_2" class="module_txt">
        <h2>Boxes</h2>
        <p>
          Forget hard drives and LTOs. Welcome to the most advanced and reliable solution
          for long-term preservation of digital film works that also keeps them always
          available for business opportunities and cultural outreach. Arrange immediate
          screenings with integrated Rooms, easily retrieve relevant assets, securely
          deliver to stakeholders.
        </p>
      </div>
      <div id="module-txt_3" class="module_txt">
        <h2>Masters</h2>
        <p>
          Get rid of third-party shuttles. With the built-in data exchange facility, you
          can send & receive files and folders of any size and complexity directly from/to
          Rooms, as well as local drives. Only between registered users, without leaving
          Mnemonica safe walls.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
//le altre importazioni derivano dalla pagina principale
import { nextTick } from "vue";
onMounted(() => {
  const { $gsap } = useNuxtApp();
  console.log("ModulesComp mounted");
  nextTick(() => {
    console.log("ModulesComp nexttick mounted");
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
        invalidateOnRefresh: false,
        scrub: true, // Sincronizzazione con lo scroll
        //anticipatePin: 1,
        pin: true, // Fissa il contenitore #hero-section
        markers: true,
        // snap: {
        //   snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
        //   duration: { min: 0.2, max: 0.5 }, // Durata dell'animazione di aggancio
        //   ease: "back.out(1.7)", // Easing dell'animazione di aggancio
        //   ease: "linear",
        // },
        // onSnapComplete: ({ progress, direction, isActive }) =>
        //   console.log(progress, direction, isActive),
      },
      defaults: { duration: 0.75, ease: "back.out" },
    });
    // modules_tl.to(
    //   "#modules_svg",
    //   {
    //     rotate: 120,
    //     onComplete: () => {
    //       console.log("Prima rotazione ultimata");
    //     },
    //   },
    //   0
    // );
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
  });
});
</script>

<style scoped></style>
