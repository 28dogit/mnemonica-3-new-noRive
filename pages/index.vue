<template>
  <div class="max-w-[1700px] m-auto px-16">
    <!-- <div class="box w-8 h-8 rounded bg-lime-600"></div>
    <div class="box2 w-8 h-8 rounded bg-orange-600"></div>
    <div class="box3 w-8 h-8 rounded bg-violet-600"></div> -->
    <!-- <ContentDoc class="sm:text-orange-500 md:text-slate-600 lg:text-lime-500" /> -->
    <article>
      <h1 class="text-seagull-400 dark:text-orange-400">Home Page</h1>
      <button @click="show = !show">
        <h3>{{ toggleText }}</h3>
      </button>
      <ClientOnly>
        <!-- il wrap ClientOnly serve per permettere il funzionamento della Transition  -->
        <Transition appear>
          <p v-if="show">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a nisl
            tincidunt, ullamcorper ipsum sit amet, efficitur diam. Nullam rutrum mauris
            eget pretium porta. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Suspendisse quis blandit sem, nec
            semper sapien. Donec finibus sem at risus convallis, id tristique purus
            mattis. Integer iaculis eros nulla, in condimentum turpis volutpat sed.
            Phasellus id euismod lorem, vel lacinia erat. Curabitur finibus dolor non
            mauris aliquam vestibulum. Suspendisse in blandit dolor, eget rutrum libero.
            Curabitur congue quam iaculis, mollis felis eu, viverra erat. Vivamus
            pellentesque at ex ut egestas. <br /><br />Etiam quis pretium nisi, ac
            pulvinar tellus. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Donec sit amet luctus neque. Sed mattis sem
            at rutrum tristique. Cras eget tristique arcu. Vestibulum mollis eros urna, et
            dictum tortor viverra ac. Nam vitae dapibus purus, quis semper mauris.
            Vestibulum non elementum neque. Integer urna est, congue in malesuada in,
            vestibulum vel augue. Vestibulum id velit enim. Donec libero nisi, dapibus sed
            urna quis, tempus imperdiet turpis. Fusce dictum erat sed justo malesuada, sed
            pretium metus varius. <br /><br />Donec efficitur, ex molestie finibus
            ullamcorper, nisl nisl rutrum magna, eget ultrices metus nisl non metus.
            Vestibulum in porta dui. Vestibulum nulla leo, ornare eget est sit amet,
            cursus pharetra quam. Sed ac pulvinar ex, quis ultricies leo. Morbi egestas
            pretium finibus. Donec pharetra vitae magna quis auctor. Cras rhoncus ac est
            quis semper. Cras faucibus a ex a tincidunt. Etiam sit amet mi quis eros
            feugiat iaculis. In tincidunt enim eget felis pretium tempor. Cras interdum
            quam ac purus aliquam fermentum. Ut sit amet auctor libero. Donec finibus,
            diam a rutrum interdum, lacus quam fringilla purus, sed ultrices augue risus
            quis arcu. In vel nisl sit amet sapien faucibus porta sit amet et tortor.
            <br /><br />Donec ut odio nec ex porttitor sollicitudin lobortis eu nisl.
            Phasellus pulvinar fringilla bibendum. Etiam facilisis turpis et ligula
            laoreet, sit amet fermentum eros faucibus. Mauris at laoreet metus, luctus
            laoreet enim. Curabitur sagittis, justo nec ullamcorper tempus, enim diam
            luctus est, a dapibus metus sem a neque. Nullam nulla metus, scelerisque sit
            amet lacus sed, dapibus iaculis enim. Curabitur a eleifend mi. Quisque
            pellentesque, elit eu sodales fermentum, augue orci ultricies ante, eu
            faucibus nisl diam sit amet est. Proin eget massa ut tortor porta laoreet.
            Nullam lacinia tempus elementum.
          </p>
        </Transition>
      </ClientOnly>
    </article>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const show = ref(true);
const toggleText = computed(() => {
  return show.value ? "Nascondi testo" : "Mostra testo";
});

// console.groupCollapsed("Site Credits");
// console.log("ciao");
// console.log("test");

//Utilizzo di Gsap
// import { onMounted } from "vue";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// const tl = gsap.timeline({ defaults: { duration: 1, ease: "back" } });

// onMounted(() => {
//   tl.to(".box2", { rotation: -270 }).to(".box3", { rotation: 360 }).to(".box", {
//     duration: 3,
//     rotation: 360,
//     scale: 2,
//     repeat: -1,
//     yoyo: true,
//   });
// });
//fine - Utilizzo di Gsap
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
