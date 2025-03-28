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
          <div class="tondo">
            <NuxtImg
              id="ghirlanda_img-2"
              src="/assets/img/Ghirlanda_full_web_800_opt.png"
              alt="mnemonica ghirlanda ecosystem"
              densities="x1"
            />
            <!-- <SvgModulesProva id="modules_svg-2"></SvgModulesProva>
            <p id="allinOne-2">All in One</p> -->
            <!-- <SvgAllPhases id="Phases_svg" class="phaseCircle-2"></SvgAllPhases> -->
          </div>
        </div>
        <div class="wrapper-p">
          <div class="content-p"></div>
        </div>
      </div>
    </div>
    <!-- <div id="ghirlanda-element_start" class="element_start">
      <NuxtImg
        id="ghirlanda_img"
        src="/assets/img/Ghirlanda_full_web_800_opt.png"
        alt="mnemonica ghirlanda ecosystem"
        densities="x1"
      />
    </div> -->
    <slot class="min-h-screen" />
    <MneFooter />
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
#ghirlanda-element_start {
  //solo per test con logo da sistemare definitivamente
  // margin-top: 80px;
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
  @include bp.for-tablet {
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
//----------------
#sections-w {
  width: 100vw;
  max-width: 1200px;
  height: calc(100vh - 70px);
  //height: var(--total-height);
  position: relative; /* Contenitore relativo per le sezioni sovrapposte */
}
.element-p {
  // background-color: rosybrown;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1em;
  width: 100%;
  //min-height: 50vh;
  height: 50vh;
  @include bp.for-tablet {
    height: 60vh;
  }
  @include bp.for-tablet-portrait-up {
    height: 70vh;
  }

  .tondo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(50vh - 2em);
    height: 100%;
    // background-color: blue;
    border-radius: 50%;
    @include bp.for-tablet {
      width: calc(60vh - 2em);
    }
    @include bp.for-tablet-portrait-up {
      width: calc(70vh - 2em);
    }
    //#ghirlanda_img-2,
    #allinOne-2 {
      position: absolute;
    }
    #ghirlanda_img-2 {
      mix-blend-mode: plus-lighter;
      mix-blend-mode: luminosity;
    }
    .Phases_svg {
      width: 100%;
    }
  }
}
.wrapper-p {
  // background-color: aquamarine;
  position: relative;
  width: 100%;
  height: calc(50vh - 70px);
}
.content-p {
  // background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  width: 100%;
  height: 100%;
  color: white;
  &.hero {
    align-items: flex-start;
  }
}
</style>
