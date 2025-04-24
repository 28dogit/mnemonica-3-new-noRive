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

    <MneHeader />
    <div id="sectionsWrapper">
      <!-- <div id="section1"> -->
      <div id="hero-section" class="hero">
        <div class="element">
          <div id="ghirlanda-element_start" class="circular fixed">
            <NuxtImg
              id="ghirlanda_img"
              src="/assets/img/Ghirlanda_full_web_800_opt.png"
              alt="mnemonica ghirlanda ecosystem"
              densities="x1"
            />
          </div>
        </div>
        <div class="wrapper">
          <div class="content"></div>
        </div>
      </div>
    </div>
    <slot class="min-h-screen" />
    <MneFooter />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "@/assets/css/_breakpoints.scss" as bp;

#ghirlanda-element_start {
  opacity: 0.6;
  mix-blend-mode: plus-lighter;
  mix-blend-mode: luminosity;
}

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
</style>
