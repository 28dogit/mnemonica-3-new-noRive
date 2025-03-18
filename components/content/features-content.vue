<template>
  <div class="home-hero">
    <slot></slot>
    <h2 v-if="$slots.title">
      <slot name="title" mdc-unwrap="p" />
    </h2>
    <div class="flex items-center justify-center">
      <slot name="immagine1" mdc-unwrap="p" />
      <slot name="immagine2" mdc-unwrap="p" />
    </div>
    <div class="flex items-center justify-center">
      <slot name="img3" mdc-unwrap="p" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
