<template>
  <div id="modules-element" class="element zxzx">
    <Modules id="modules_svg"></Modules>
    <p id="made_for">MADE FOR</p>
  </div>
  <div id="modules-content-wrapper" class="wrapper">
    <div id="modules-content" class="content">
      <div id="module-txt_1" class="module_txt">
        <div class="module_title">
          <h2>Rooms</h2>
          <span class="focus">+</span>
        </div>
        <p>
          Leave folders behind. Experience active workspaces that free you from repetitive
          tasks encoding, watermarking, keeping everyone updated. Enjoy private places
          where people meet around media, playlists are a given, content is easy to find
          and move.
        </p>
      </div>
      <div id="module-txt_2" class="module_txt">
        <div class="module_title">
          <h2>Boxes</h2>
          <span class="focus">+</span>
        </div>
        <p>
          Forget hard drives and LTOs. Welcome to the most advanced and reliable solution
          for long-term preservation of digital film works that also keeps them always
          available for business opportunities and cultural outreach. Arrange immediate
          screenings with integrated Rooms, easily retrieve relevant assets, securely
          deliver to stakeholders.
        </p>
      </div>
      <div id="module-txt_3" class="module_txt">
        <div class="module_title">
          <h2>Masters</h2>
          <span class="focus">+</span>
        </div>
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
        end: "+=2000", // allungata la fine per rendere lo scroll più lento
        scrub: true, // Sincronizzazione con lo scroll
        anticipatePin: 1,
        pin: true, // Fissa il contenitore #hero-section
        markers: true,
        snap: {
          snapTo: 1 / 3,
          //snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
          duration: 0.5,
          ease: "back.out",
        },
        onSnapComplete: ({ progress, direction, isActive }) =>
          console.log(progress, direction, isActive),
      },
    });
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

<style lang="scss" scoped>
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;

.module_txt {
  position: absolute;
  border-radius: 10px;
  border: 2px solid rgba(225, 225, 225, 0.1);
  text-align: left;
  padding: 10px;
  //width: 90vw;
  max-width: 90%;
  h2,
  p {
    text-align: left;
  }
  box-shadow: 0 0 42px rgba(184, 239, 250, 0.1);
}
.module_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #fff;
    margin: 0;
    background-color: $gradient_4;
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
}
</style>
