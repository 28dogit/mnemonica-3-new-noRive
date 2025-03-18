<template>
  <div class="home-hero">
    <slot></slot>
    <h2 v-if="$slots.title">
      <slot name="title" mdc-unwrap="p" />
    </h2>
    <div v-if="$slots.description">
      <slot name="description" mdc-unwrap="p" />
    </div>
    <div class="flex items-center justify-center">
      <slot name="immagine1" mdc-unwrap="p" />
      <slot name="immagine2" mdc-unwrap="p" />
    </div>
    <div class="gallery-content">
      <slot name="gallery" mdc-unwrap="p" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style>
.gallery-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
