<template>
  <div id="mainContainer">
    <div id="bbg" class="-z-20"></div>

    <!-- <div id="ghirlandeContainer" class="w-screen h-screen absolute top-0 left-0 -z-10">
      <div class="ghirlanda-updx l1" data-speed="0.4">
        <NuxtImg src="/assets/img/Ghirlanda-web-up-dx-500.png" densities="x1" alt="" />
      </div>
      <div class="ghirlanda-dwsx l1" data-speed="0.6">
        <NuxtImg src="/assets/img/Ghirlanda-web-dw-sx-500.png" densities="x1" alt="" />
      </div>
    </div> -->

    <div id="ghirlandeContainer" class="w-screen h-screen absolute top-0 left-0 -z-19">
      <NuxtImg
        src="/assets/img/Ghirlanda-web-up-dx-500.png"
        class="ghirlanda-updx"
        data-speed="0.4"
        densities="x1"
        alt=""
      />
      <NuxtImg
        src="/assets/img/Ghirlanda-web-dw-sx-500.png"
        class="ghirlanda-dwsx"
        data-speed="0.6"
        densities="x1"
        alt=""
      />
    </div>

    <Header />
    <slot class="min-h-screen z-20" />
    <Footer />
  </div>
</template>

<script setup>
//Utilizzo di Gsap!!-----
// import { onMounted } from "vue";
// import { ScrollTrigger } from "gsap/ScrollTrigger"; // importato qui l'ho importato per tutto il progetto
//import { useNuxtApp } from "#app"; //import gsap from plugins gsap.js

//gsap.registerPlugin(ScrollTrigger); la registrazione avviene grazie al plugin gsap.js

// Aggiunge animazione quando il componente viene montato
onMounted(() => {
  //const { $gsap } = useNuxtApp();
  // exp mouse follow
  // $gsap.set(".ghirlanda-updx", { xPercent: -50, yPercent: -50 });
  // let xSetter = $gsap.quickSetter(".ghirlanda-updx", "x", "px");
  // let ySetter = $gsap.quickSetter(".ghirlanda-updx", "y", "px");
  // window.addEventListener("mousemove", (e) => {
  //   xSetter(e.x);
  //   ySetter(e.y);
  // });
  // fine exp mouse follow
  // console.log("gsap-- ", $gsap, "scrollTrigger----- ", ScrollTrigger);
  // $gsap.to("[data-speed]", {
  //   y: (i, el) =>
  //     (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
  //   ease: "none",
  //   scrollTrigger: {
  //     start: 0,
  //     end: "max",
  //     invalidateOnRefresh: true,
  //     scrub: 0,
  //     force3D: true,
  //   },
  // });
});
//Gsap-fine
</script>

<style lang="scss" scoped>
#ghirlandeContainer {
  position: relative;
  width: 100%;
  height: 100%;
}

img {
  position: fixed;
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.ghirlanda-updx {
  top: 0;
  right: 0;
  mix-blend-mode: luminosity;
  opacity: 0.6;
}

.ghirlanda-dwsx {
  bottom: 0;
  left: 0;
  mix-blend-mode: luminosity;
  opacity: 0.6;
}
@media screen and (max-width: 600px) {
  img {
    width: 200px; /* Set a fixed size */
    height: 200px; /* Set a fixed size */
  }
}
</style>
