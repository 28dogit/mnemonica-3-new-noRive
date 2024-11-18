<template>
  <div id="mainContainer" class="min-h-screen flex flex-col flex-grow relative">
    <div class="bbg"></div>

    <div class="ghirlanda-updx l1">
      <img src="/assets/img/Ghirlanda-web-up-dx.png" alt="" />
    </div>
    <div class="ghirlanda-updx l2">
      <img src="/assets/img/Ghirlanda-web-up-dx.png" alt="" />
    </div>
    <div class="ghirlanda-dwsx l1">
      <img src="/assets/img/Ghirlanda-web-dw-sx.png" alt="" />
    </div>
    <!-- <div class="ghirlanda-updx test1">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div>
      <div class="ghirlanda-updx test2">
        <img src="/assets/img/Ghirlanda-up-dx-600.png" alt="" />
      </div> -->

    <Header />
    <slot class="min-h-screen" />
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style>
/* w-screen h-screen bg-slate-300 dark:bg-woodsmoke-950 */
</style>
