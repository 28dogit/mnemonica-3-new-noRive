<template>
  <main>
    <div
      id="heroSection"
      class="flex flex-col items-center justify-center h-[calc(100vh-70px)] w-screen"
    >
      <div id="logo_mne" class="absolute opacity-5">
        <!-- <NuxtImg
          src="/assets/img/svg/Logo-mne-Vector.svg"
          alt="Mnemonica logo portrait"
        /> -->
      </div>
      <div id="logo_mne" class="absolute opacity-5">
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
    </div>
    <div id="modules" class="px-5 py-6 relative overflow-hidden text-center">
      <!-- <div
        id="module-bg"
        class="absolute top-[10em] left-0 w-screen flex items-start justify-center"
      >
        <NuxtImg
          id="bgCircle_1"
          src="/assets/img/svg/circle-690-50.svg"
          alt="mne module background"
          class="absolute w-96"
        />
        <NuxtImg
          id="bgCircle_2"
          src="/assets/img/svg/circle-690-50.svg"
          alt="mne module background"
          class="absolute"
        />
        <NuxtImg
          id="bgCircle_3"
          src="/assets/img/svg/circle-690-50.svg"
          alt="mne module background"
          class="absolute"
        />
      </div> -->
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
  </main>
</template>

<script lang="ts" setup>
//Utilizzo di Gsap!!-----
import { onMounted } from "vue";
import { gsap } from "gsap"; //importa gsap
//solo per il test ghirlande
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  var tl = gsap.timeline({ ease: "power2.in" });

  tl.from(".ghirlanda-updx img", {
    opacity: 0,
    filter: "blur(5px)",
    duration: 3,
  });

  tl.from(
    ".ghirlanda-dwsx img",
    {
      opacity: 0,
      filter: "blur(5px)",
      duration: 3,
    },
    "<"
  );
  tl.from(
    "#logo_mne",
    {
      opacity: 0,
      duration: 2,
    },
    "> -=1.5"
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
});
//Gsap-fine
</script>

<style>
/*Contenitore #modules come flex container */
#modules {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Stili per ogni modulo */
.module {
  overflow: hidden;
  /* border: 1px solid #ccc; */
  /* padding: 1rem; */
  transition: all 2s ease-in-out;
}

.module p {
  max-height: 0;
  overflow: hidden;
  transition: max-height 2s ease-in;
  margin: 0;
}
/* Stili per il titolo */
.module h2 {
  cursor: pointer;
  margin: 0;
}

.module:hover p {
  max-height: 500px;
}
</style>
