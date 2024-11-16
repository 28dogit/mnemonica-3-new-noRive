<template>
  <div id="mainContent" class="min-h-screen flex flex-col flex-grow">
    <div class="bbg"></div>
    <div class="testghi">
      <div class="ghirlanda-updx">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div>
      <div class="ghirlanda-updx test1">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div>
      <div class="ghirlanda-updx test2">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div>
    </div>
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
  transform: rotate(-20deg);
  max-width: 300px;
  mix-blend-mode: luminosity;
  float: left;
  opacity: 0.6;
}
.ghirlanda-updx.test1 {
  mix-blend-mode: color-dodge;
}
.ghirlanda-updx.test2 {
  mix-blend-mode: screen;
}
</style>
