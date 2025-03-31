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
    <div id="sections-w">
      <div id="section1">
        <div class="element-p">
          <div id="ghirlanda-element_start" class="circular">
            <NuxtImg
              id="ghirlanda_img-2"
              src="/assets/img/Ghirlanda_full_web_800_opt.png"
              alt="mnemonica ghirlanda ecosystem"
              densities="x1"
            />
          </div>
        </div>
        <div class="wrapper-p">
          <div class="content-p"></div>
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
//----------------
#sections-w {
  width: 100vw;
  max-width: 1200px;
  height: calc(100vh - 70px);
}
.element-p {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1em;
  width: 100%;
  height: 50vh;
  @include bp.for-tablet {
    height: 60vh;
  }
  @include bp.for-tablet-portrait-up {
    height: 70vh;
  }

  .circular {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(50vh - 2em);
    height: 100%;
    border-radius: 50%;
    mix-blend-mode: plus-lighter;
    mix-blend-mode: luminosity;
    @include bp.for-tablet {
      width: calc(60vh - 2em);
    }
    @include bp.for-tablet-portrait-up {
      width: calc(70vh - 2em);
    }
  }
}
.wrapper-p {
  position: relative;
  width: 100%;
  height: calc(50vh - 70px);
}
.content-p {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  width: 100%;
  height: 100%;
  color: white;
}
</style>
