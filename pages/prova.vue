<template>
  <main>
    <div id="sections-w">
      <div id="section1" class="section_fixed">
        <div class="element-p">
          <div class="tondo">
            <!-- <NuxtImg
              id="ghirlanda_img-2"
              src="/assets/img/Ghirlanda_full_web_800_opt.png"
              alt="mnemonica ghirlanda ecosystem"
              densities="x1"
            />
            <SvgModulesProva id="modules_svg-2"></SvgModulesProva>
            <p id="allinOne-2">All in One</p> -->
            <SvgAllPhases id="Phases_svg" class="phaseCircle-2"></SvgAllPhases>
          </div>
        </div>
        <div class="wrapper-p">
          <div class="content-p"></div>
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
#sections-w {
  width: 100vw;
  max-width: 1200px;
  height: calc(100vh - 70px);
  //height: var(--total-height);
  position: relative; /* Contenitore relativo per le sezioni sovrapposte */
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

  .tondo {
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
    }
    .Phases_svg {
      width: 100%;
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
