<template>
  <div ref="overlay" class="overlay" v-show="visible">
    <button
      @click="closeOverlay"
      class="close-btn fixed top-5 right-5 bg-transparent text-4xl text-slate-200 hover:text-slate-400 hover:rotate-[20deg]"
    >
      <UIcon name="i-heroicons-x-circle" class="flex" />
    </button>
    <div class="content py-20 px-5 text-white h-full">
      <h2 class="text-4xl">Contenuto dell'overlay</h2>
      <p class="text-base font-thin">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a nisl tincidunt,
        ullamcorper ipsum sit amet, efficitur diam. Nullam rutrum mauris eget pretium
        porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Suspendisse quis blandit sem, nec semper sapien. Donec finibus
        sem at risus convallis, id tristique purus mattis. Integer iaculis eros nulla, in
        condimentum turpis volutpat sed. Phasellus id euismod lorem, vel lacinia erat.
        Curabitur finibus dolor non mauris aliquam vestibulum. Suspendisse in blandit
        dolor, eget rutrum libero. Curabitur congue quam iaculis, mollis felis eu, viverra
        erat. Vivamus pellentesque at ex ut egestas. <br /><br />Etiam quis pretium nisi,
        ac pulvinar tellus. Pellentesque habitant morbi tristique senectus et netus et
        malesuada fames ac turpis egestas. Donec sit amet luctus neque. Sed mattis sem at
        rutrum tristique. Cras eget tristique arcu. Vestibulum mollis eros urna, et dictum
        tortor viverra ac. Nam vitae dapibus purus, quis semper mauris. Vestibulum non
        elementum neque. Integer urna est, congue in malesuada in, vestibulum vel augue.
        Vestibulum id velit enim. Donec libero nisi, dapibus sed urna quis, tempus
        imperdiet turpis. Fusce dictum erat sed justo malesuada, sed pretium metus varius.
        <br /><br />Donec efficitur, ex molestie finibus ullamcorper, nisl nisl rutrum
        magna, eget ultrices metus nisl non metus. Vestibulum in porta dui. Vestibulum
        nulla leo, ornare eget est sit amet, cursus pharetra quam. Sed ac pulvinar ex,
        quis ultricies leo. Morbi egestas pretium finibus. Donec pharetra vitae magna quis
        auctor. Cras rhoncus ac est quis semper. Cras faucibus a ex a tincidunt. Etiam sit
        amet mi quis eros feugiat iaculis. In tincidunt enim eget felis pretium tempor.
        Cras interdum quam ac purus aliquam fermentum. Ut sit amet auctor libero. Donec
        finibus, diam a rutrum interdum, lacus quam fringilla purus, sed ultrices augue
        risus quis arcu. In vel nisl sit amet sapien faucibus porta sit amet et tortor.
        <br /><br />Donec ut odio nec ex porttitor sollicitudin lobortis eu nisl.
        Phasellus pulvinar fringilla bibendum. Etiam facilisis turpis et ligula laoreet,
        sit amet fermentum eros faucibus. Mauris at laoreet metus, luctus laoreet enim.
        Curabitur sagittis, justo nec ullamcorper tempus, enim diam luctus est, a dapibus
        metus sem a neque. Nullam nulla metus, scelerisque sit amet lacus sed, dapibus
        iaculis enim. Curabitur a eleifend mi. Quisque pellentesque, elit eu sodales
        fermentum, augue orci ultricies ante, eu faucibus nisl diam sit amet est. Proin
        eget massa ut tortor porta laoreet. Nullam lacinia tempus elementum.
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
//defineEmits is a compiler macro and no longer needs to be imported.
// import { ref, watch, onMounted, defineEmits } from "vue";

import { ref, watch, onMounted } from "vue";
import gsap from "gsap";
import { _flex } from "#tailwind-config/theme";

const props = defineProps({
  visible: Boolean,
  buttonRect: Object,
});

const emits = defineEmits(["update:visible"]);

const overlay = ref(null);

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      openOverlay();
    }
  }
);

const openOverlay = () => {
  const { width, height, left, top } = props.buttonRect;
  // const radius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) / 2; // raggio calcolato dal centro dello schermo con il teorema di pitagora

  //calcolo del raggio per l'overlay decentrato sul punto da cui facciamo click
  // calcolo il centro del pulsate / Link (i parametri left, top, ... lip rendo dalla costante definita precedentemente che riceve i valori dalla pagina in cui è implementata, in questo esempio è focusTransition)
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  // Calcolo le distanze del centro del pulsante dai quattro angoli dello schermo non divido per due pechè mi serve la distanza intera al vertice e non il raggio
  const distanceTL = Math.sqrt((centerX - 0) ** 2 + (centerY - 0) ** 2);
  const distanceTR = Math.sqrt((centerX - window.innerWidth) ** 2 + (centerY - 0) ** 2);
  const distanceBL = Math.sqrt((centerX - 0) ** 2 + (centerY - window.innerHeight) ** 2);
  const distanceBR = Math.sqrt(
    (centerX - window.innerWidth) ** 2 + (centerY - window.innerHeight) ** 2
  );
  //dichiaro la costante che racchiude i valori calcolati e ne restituisce il più grande che è quello che userò come raggio per il mio clipPath
  const radius = Math.max(distanceTL, distanceTR, distanceBL, distanceBR);

  gsap.fromTo(
    overlay.value,
    {
      // clipPath: `circle(${width / 2}px at ${left + width / 2}px ${top + height / 2}px)`,
      clipPath: `circle(${width / 10}px at ${left + width / 2}px ${top + height / 2}px)`,
    },
    {
      clipPath: `circle(${radius}px at ${window.innerWidth / 2}px ${
        window.innerHeight / 2
      }px)`,
      duration: 2,
      // ease: "power2.inOut",
      ease: "power2.out",
    }
  );
};

const closeOverlay = () => {
  const { width, height, left, top } = props.buttonRect;
  // const centerX = left + width / 2;
  // const centerY = top + height / 2;

  // const radius = Math.max(window.innerWidth, window.innerHeight) * 1.5;

  gsap.to(overlay.value, {
    // clipPath: `circle(${width / 2}px at ${centerX}px ${centerY}px)`,
    clipPath: `circle(${width / 10}px at ${left + width / 2}px ${top + height / 2}px)`,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      emits("update:visible", false);
    },
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
  overflow: scroll;
}
</style>
