<template>
  <div class="">
    <UIcon name="i-lucide-align-justify" @click="open_mNav"></UIcon>
    <nav
      id="mobile_Nav"
      v-show="showNav"
      class="w-dvw h-dvh absolute top-0 left-0 pt-20 px-8 pb-10 bg-black z-[9999999]"
    >
      <button
        @click="close_mNav"
        class="menu-x-btn bg-black rounded-full absolute top-[20px] right-[20px] w-9 h-9 flex items-center justify-center"
      >
        <UIcon
          name="i-heroicons-x-mark"
          class="text-woodsmoke-400 hover:text-woodsmoke-100 w-5 h-5"
        ></UIcon>
      </button>
      <svg width="50" height="50" class="absolute top-[13px] right-[13px] -z-10">
        <circle id="x-circle" cx="25" cy="25" r="17" stroke-width="0" fill="#ffffff" />
      </svg>
      <ul class="uppercase text-sm text-left flex flex-col">
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400" @click="close_mNav">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400" @click="close_mNav">
          <nuxt-link to="/animations">Animations</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400" @click="close_mNav">
          <nuxt-link to="/modal">Modals</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400" @click="close_mNav">
          <nuxt-link to="/news">News</nuxt-link>
        </li>
        <li class="dark:hover:text-chenin-300 hover:text-seagull-400" @click="close_mNav">
          <nuxt-link to="/focusTransition">Transitions</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { gsap } from "gsap/gsap-core";

const showNav = ref(false);

const open_mNav = () => {
  gsap.fromTo(
    "#mobile_Nav",
    { opacity: 0, x: "100%", y: "0%" },
    {
      opacity: 1,
      x: "0%",
      y: "0%",
      duration: 0.5,
      ease: "power2.out",
      onStart: () => {
        showNav.value = true;
      },
    }
  );
};
const close_mNav = () => {
  gsap.to("#mobile_Nav", {
    opacity: 0,
    x: "100%",
    y: "0%",
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      showNav.value = false;
      console.log(showNav.value + " ShowNav alla chiusura");
    },
  });
};

watch(showNav, async (newValue) => {
  if (newValue) {
    await nextTick();

    const cClose = document.querySelector(".menu-x-btn");
    if (cClose) {
      const animation = gsap.fromTo(
        "#x-circle",
        { opacity: 1, scale: 1, transformOrigin: "58% 50%", rotate: 0 },
        {
          scale: 1.3,
          opacity: 0.2,
          rotate: 360,
          duration: 0.3,
          ease: "power2",
          transformOrigin: "58% 50%",
        }
      );
      animation.pause();

      cClose.addEventListener("mouseenter", () => animation.play());
      cClose.addEventListener("mouseleave", () => animation.reverse());
    }
  }
});

onMounted(() => {});
</script>

<style scoped>
li {
  margin-bottom: 20px;
  border-bottom: 1px solid #ffffff29;
}
</style>
