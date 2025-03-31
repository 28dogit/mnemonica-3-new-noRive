<template>
  <main>
    <div id="sectionsWrapper">
      <div id="section1" class="">
        <div class="element">
          <div class="circular">
            <NuxtImg
              id="ghirlanda_img-2"
              src="/assets/img/Ghirlanda_full_web_800_opt.png"
              alt="mnemonica ghirlanda ecosystem"
              densities="x1"
            />
            <SvgModulesProva id="modules_svg-2"></SvgModulesProva>
            <!-- <p id="allinOne-2">All in One</p> -->
            <SvgAllPhases id="Phases_svg" class="phaseCircle-2"></SvgAllPhases>
          </div>
        </div>
        <div class="wrapper">
          <div class="content"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "page-layout",
});
</script>

<style lang="scss" scoped>
@use "@/assets/css/_breakpoints.scss" as bp;
#sectionsWrapper {
  width: 100vw;
  max-width: 1200px;
  height: calc(100vh - 70px);
  //height: var(--total-height);
  position: relative; /* Contenitore relativo per le sezioni sovrapposte */
}
#section1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 70px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 70px);
  // opacity: 0;
  overflow: hidden;
  margin-bottom: 6rem;
  // &:not(#hero-section){
  //   @include bp.for-tablet{ // 576px up
  //     flex-direction: row;
  //   }
  // }
  &.hero {
    justify-content: flex-start;
  }
}
.element-p {
  background-color: rosybrown;
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

  .circular {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(50vh - 2em);
    height: 100%;
    background-color: blue;
    border-radius: 50%;
    @include bp.for-tablet {
      width: calc(60vh - 2em);
    }
    @include bp.for-tablet-portrait-up {
      width: calc(70vh - 2em);
    }
    #ghirlanda_img-2,
    #allinOne-2 {
      position: absolute;
      display: none;
    }
    #modules_svg-2 {
      display: none;
    }
    .Phases_svg {
      width: 100%;
      display: block;
    }
  }
}
.wrapper-p {
  background-color: aquamarine;
  position: relative;
  width: 100%;
  height: calc(50vh - 70px);
}
.content-p {
  background-color: red;
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
