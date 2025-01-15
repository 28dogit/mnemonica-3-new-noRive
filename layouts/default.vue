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
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script setup>
onMounted(() => {});
//Gsap-fine
</script>

<style lang="scss" scoped>
#ghirlandeContainer {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -19;

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
  #ghirlandeContainer {
    img {
      width: 200px; /* Set a fixed size */
      height: 200px; /* Set a fixed size */
    }
  }
}
</style>
