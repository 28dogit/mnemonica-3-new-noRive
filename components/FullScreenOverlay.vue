<template>
  <div ref="overlay" class="overlay" v-if="visible">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script lang="ts" setup>
import{ref, watch} from 'vue';
import gsap from 'gsap';

const props = defineProps({
    visible: Boolean,
    buttonRect: Object,
});
const overlay = ref(null);
watch(()=> props.visible, (newValue) =>{
    if(newValue){
        openOverlay();
    }
});
const openOverlay = () => {
    const {width, height, left, top} = props.buttonRect;
    const radius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)/2;

    gsap.fromTo(overlay.value, {
    clipPath: `circle(${width / 2}px at ${left + width / 2}px ${top + height / 2}px)`,
  }, {
    clipPath: `circle(${radius}px at ${left + width / 2}px ${top + height / 2}px)`,
    duration: 1,
    ease: 'power2.inOut',
  });
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  overflow: hidden;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 2rem;
}
</style>
