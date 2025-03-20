<template>
  <div class="btnWrapper">
    <span class="btnTxt"><slot>btn name</slot></span>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;
.btnWrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 35px;
  width: fit-content;
  min-width: 120px;
  padding: 1rem;
  margin: 1rem;
  background-color: $gradient_2;
  border: 2px solid $mne-secondary;
  .btnTxt {
    opacity: 1;
    color: $mne_text-on-dark;
  }
}
</style>
