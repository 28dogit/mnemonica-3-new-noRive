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

    <Header />
    <div id="ghirlanda-elemen2" class="element2">
      <NuxtImg
        id="ghirlanda_img2"
        src="/assets/img/Ghirlanda_full_web_800_opt.png"
        alt="mnemonica ghirlanda ecosystem"
        densities="x1"
      />
    </div>
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script setup>
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

#ghirlanda-element2 {
  opacity: 0.6;
  //max-height: 50vh;
  @include bp.for-desktop-big-up {
    width: 550px;
  }
}
#ghirlanda_img2 {
  width: 90%;
  //mix-blend-mode: luminosity;
  //display: none;
}
.element2 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  min-height: 75vh;
  mix-blend-mode: luminosity;
  @include bp.for-tablet-up {
    // 576px up
    width: 40%;
    min-height: 95vh;
  }
  @include bp.for-desktop-big-up {
    // 1200px up
    width: 30%;
    min-height: 100vh;
  }
}
</style>
