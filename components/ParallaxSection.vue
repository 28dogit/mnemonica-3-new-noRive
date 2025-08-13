<!-- components/ParallaxSection.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useScroll, useElementVisibility } from "@vueuse/core";

const container = ref(null);
const layer1 = ref(null); // background
const layer2 = ref(null); // foreground

const isVisible = useElementVisibility(container);

const { y } = useScroll(window);

onMounted(() => {
    // Evita errori SSR: assicurati che window esista
    if (!process.client) return;
});
</script>

<template>
    <section ref="container" class="parallax-container">
        <div ref="layer1" :style="{
            transform: isVisible ? `translateY(${y * 0.3}px)` : 'none',
            transition: 'transform 0.1s ease',
        }" class="parallax-layer layer-bg">
            <slot name="background" />
        </div>

        <div ref="layer2" :style="{
            transform: isVisible ? `translateY(${y * 0.1}px)` : 'none',
        }" class="parallax-layer layer-fg">
            <slot name="foreground" />
        </div>
    </section>
</template>

<style scoped>
.parallax-container {
    position: relative;
    overflow: hidden;
    height: 100vh;
    width: 100%;
}

.parallax-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.layer-bg {
    z-index: 1;
    background: url("/assets/img/mnemonica-logo-2024-site.png") center/cover no-repeat;
}

.layer-fg {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}
</style>
