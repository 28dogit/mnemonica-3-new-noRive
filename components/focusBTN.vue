<template>
  <div class="focusWrapper">
    <span class="focusTxt">Focus</span>
    <span class="focusBtn">+</span>
  </div>
  <canvas
    ref="canvasRefBtn"
    id="canvasFocusBtn"
    style="position: absolute; height: 105px; width: 100px; z-index: 5"
  ></canvas>
</template>
<script setup></script>
<style lang="scss" scoped>
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;
.focusWrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  height: 30px;
  border-radius: 30px;
  width: fit-content;
  min-width: 120px;
  padding-left: 1rem;
  margin-top: 1rem;
  background-color: $gradient_2;
  .focusTxt {
    opacity: 1;
    //display: none;
  }
  .focusBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    // color: $mne_secondary;
    color: $mne_text-on-dark;
    margin: 0;
    background-color: $gradient_4;
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
}
</style>
