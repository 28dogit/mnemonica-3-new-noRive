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
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="w-auto justify-center"
        higlight-color="neutral"
        color="neutral"
        :ui="{
          childList: 'flex flex-row gap-2',
          childItem: 'h-10',
          childLink: 'text-sm font-normal text-blue-600',
          childLinkLabel: 'text-sm font-normal text-blue-600',
        }"
      >
        <template #subItems-content="{ item }">
          <div class="subMenuWrapper flex flex-col gap-2">
            <a
              v-for="child in item.children"
              :key="child.label"
              @click="
                () => {
                  child.onSelect();
                  close_mNav();
                }
              "
              class="navSubItem"
            >
              {{ child.label }}
            </a>
          </div>
        </template>
      </UNavigationMenu>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useNavStore } from "@/stores/navigationStore";

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

const navigationStore = useNavStore();

const navigateToSection = (sectionName: string) => {
  // Imposta la sezione di destinazione e indica che deve essere eseguita la logica personalizzata
  console.log("Navigazione avviata...");
  navigationStore.setTargetSection(sectionName, true);
  console.log("Stato impostato:", navigationStore);
  navigateTo("/");
};

const items = [
  {
        label: "Home",
        icon: "i-lucide-circle",
        to: "/",
      },
      {
        label: "Security",
        to: "/security",
      },
      {
        label: "Features",
        to: "/features",
      },
      {
        label: "App",
        icon: "i-lucide-box",
        to: "/mobile-app",
      },
      {
        label: "About",
        slot: "subItems" as const,
        children: [
          {
            label: "Made For",
            to: "/",
            active: false,
            onSelect: () => navigateToSection("made-for"),
          },
          {
            label: "Pricing",
            to: "/",
            active: false,
            onSelect: () => navigateToSection("production"),
          },
          {
            label: "Contacts",
            to: "/",
            onSelect: () => navigateToSection("contacts"),
            active: false,
          },
        ],
      },
      {
        label: "Login",
        to: "https://mnemonica.io",
        active: true,
        target: "_blank",
      },
] satisfies NavigationMenuItem[]
</script>

<style scoped>
.navSubItem {
  cursor: pointer;
  padding: 1rem;
}
</style>
