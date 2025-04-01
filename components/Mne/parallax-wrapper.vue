<script setup>
import { useScroll, useThrottleFn } from '@vueuse/core'

const props = defineProps({
  speed: {
    type: Number,
    default: 0.1
  },
  direction: {
    type: String,
    default: 'vertical', // 'vertical', 'horizontal' o 'both'
    validator: value => ['vertical', 'horizontal', 'both'].includes(value)
  },
  throttle: {
    type: Number,
    default: 15
  }
})

const target = ref(null)
const { y: scrollY } = useScroll(window)

const transformStyle = computed(() => {
  const scrollValue = scrollY.value * props.speed
  let transform = ''
  
  if (props.direction === 'vertical' || props.direction === 'both') {
    transform += ` translateY(${scrollValue}px)`
  }
  if (props.direction === 'horizontal' || props.direction === 'both') {
    transform += ` translateX(${scrollValue}px)`
  }
  
  return { transform: transform.trim() }
})

const throttledTransform = useThrottleFn(() => transformStyle.value, props.throttle)
</script>

<template>
  <div 
    ref="target" 
    class="parallax-element"
    :style="throttledTransform"
  >
    <slot />
  </div>
</template>

<style scoped>
.parallax-element {
  will-change: transform;
  transition: transform 0.1s ease-out;
}
</style>
