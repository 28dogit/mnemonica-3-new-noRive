<template>
  <div class="gallery-content">
    <slot mdc-unwrap="p" />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.gallery-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
