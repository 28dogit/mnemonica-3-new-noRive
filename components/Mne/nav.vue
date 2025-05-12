<template>
  <UNavigationMenu
    :items="items"
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
          @click="handleSubItemClick(child, item)"
          class="navSubItem"
          :class="{ 'active-subitem': child.active }"
        >
          {{ child.label }}
        </a>
      </div>
    </template>
  </UNavigationMenu>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { useNavStore } from "@/stores/navigationStore";

const navigationStore = useNavStore();

const navigateToSection = (sectionName: string) => {
  // Imposta la sezione di destinazione e indica che deve essere eseguita la logica personalizzata
  console.log("Navigazione avviata...");
  navigationStore.setTargetSection(sectionName, true);
  console.log("Stato impostato:", navigationStore);
  navigateTo("/");
};

const handleSubItemClick = (clickedChild: NavigationMenuItem, parentItem: NavigationMenuItem) => {
  if (parentItem && parentItem.children) {
    parentItem.children.forEach((child: NavigationMenuItem) => {
      child.active = false;
    });
  }
  clickedChild.active = true;

  // Assuming 'onSelect' is a custom property on our child items
  if (typeof (clickedChild as any).onSelect === 'function') {
    ((clickedChild as any).onSelect)();
  } else if (clickedChild.to) {
    navigateTo(clickedChild.to as string);
  }
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

.active-subitem {
  font-weight: bold;
  /* Potresti voler usare un colore del tema qui, es. text-primary-500 se usi il theming di Nuxt UI */
}
</style>
