<template>
  <div
    id="mainContent"
    class="min-h-screen flex flex-col flex-grow relative overflow-hidden"
  >
    <div class="bbg"></div>
    <!-- <div class="testghi relative overflow-hidden"> -->
    <div class="ghirlanda-updx">
      <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
    </div>
    <!-- <div class="ghirlanda-updx test1">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div>
      <div class="ghirlanda-updx test2">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div> -->
    <!-- </div> -->
    <Header />
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style>
/* w-screen h-screen bg-slate-300 dark:bg-woodsmoke-950 */
.testghi {
  display: flex;
}
.ghirlanda-updx {
  transform: rotate(10deg);
  max-width: 600px;
  mix-blend-mode: luminosity;
  float: left;
  opacity: 0.6;
  position: absolute;
  top: 80px;
  right: -100px;
}
.ghirlanda-updx.test1 {
  mix-blend-mode: color-dodge;
}
.ghirlanda-updx.test2 {
  mix-blend-mode: screen;
}
</style>
