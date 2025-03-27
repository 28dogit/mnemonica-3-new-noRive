<template>
  <div class="flex-wrap">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.flex-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
