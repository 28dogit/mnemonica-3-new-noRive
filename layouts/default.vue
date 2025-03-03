<template>
  <div id="mainContainer">
    <div id="bbg" class=""></div>
    <div id="ghirlandeContainer" class="">
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

    <StructureHeader />
    <div id="ghirlanda-element_start" class="element_start">
      <NuxtImg
        id="ghirlanda_img"
        src="/assets/img/Ghirlanda_full_web_800_opt.png"
        alt="mnemonica ghirlanda ecosystem"
        densities="x1"
      />
    </div>
    <slot class="min-h-screen" />
    <StructureFooter />
  </div>
</template>

<script setup>
import Header from "~/components/structure/header.vue";

onMounted(() => {});
//Gsap-fine
</script>

<style lang="scss" scoped>
@use "@/assets/css/_breakpoints.scss" as bp;

#ghirlandeContainer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -19;
  mix-blend-mode: luminosity;

  img {
    position: fixed;
    width: 300px;
    height: 300px;
    object-fit: cover;
  }
}
.ghirlanda-updx {
  top: 0;
  right: 0;
  opacity: 0;
  filter: blur(5px);
}

.ghirlanda-dwsx {
  bottom: 0;
  left: 0;
  opacity: 0;
  filter: blur(5px);
}
@media screen and (max-width: 600px) {
  #ghirlandeContainer {
    img {
      //opacity: 0;
      width: 200px; /* Set a fixed size */
      height: 200px; /* Set a fixed size */
    }
  }
}
#ghirlanda-element_start {
  //solo per test con logo da sistemare definitivamente
  margin-top: 80px;
  //
  opacity: 0.6;
  height: 300px;
  @include bp.for-desktop-big-up {
    width: 550px;
  }
  #ghirlanda_img {
    width: 90%;
  }
}

.element_start {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 70px;
  width: 100%;
  min-height: 50vh;
  mix-blend-mode: plus-lighter;
  mix-blend-mode: luminosity;
  @include bp.for-tablet-up {
    // 576px up
    width: 40%;
    //min-height: 95vh;
  }
  @include bp.for-desktop-big-up {
    // 1200px up
    width: 30%;
    //min-height: 100vh;
  }
}
</style>
