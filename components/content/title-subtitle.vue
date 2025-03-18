<template>
  <h1 v-if="$slots.title">
    <slot name="title" mdc-unwrap="p" />
  </h1>
  <h2 v-if="$slots.subtitle">
    <slot name="subtitle" mdc-unwrap="p" />
  </h2>
</template>

<script lang="ts" setup></script>

<style></style>
