<template>
  <div id="phases-element" class="element">
    <PreSvg id="Pre_svg" class="phaseCircle"></PreSvg>
    <ProductionSvg id="Production_svg" class="phaseCircle"></ProductionSvg>
    <PostSvg id="Post_svg" class="phaseCircle"></PostSvg>
    <MarketSvg id="Market_svg" class="phaseCircle"></MarketSvg>
    <div id="phasesTitle" class="title">
      <h2>All Phases</h2>
    </div>
  </div>
  <div id="phases-content-wrapper" class="wrapper">
    <div id="phases-content" class="content">
      <PhasesChips2></PhasesChips2>
    </div>
  </div>
</template>

<script setup>
//le altre importazioni derivano dalla pagina principale
import { nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { _opacity } from "#tailwind-config/theme";
import { _bottom } from "#tailwind-config/theme/backgroundPosition";
import { PhasesChips2 } from "#components";

//definisco le costanti da esporre con defineExpose, che userò all'interno di onMounted utilizzando .value
// utilizzo shallowRef per non covertire le proprietà interne di Gsap in oggetti reattivi di vue
const rotationTL = shallowRef(null);
const phasesTL = shallowRef(null);
//const intentObserver = shallowRef(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  nextTick(() => {
    //console.log("PhasesComp nexttick mounted");
    // let allowScroll = true; // Variabile per bloccare lo scroll
    // let scrollTimeout = $gsap.delayedCall(1, () => (allowScroll = true)).pause(); // Timeout per evitare doppio scroll, indichiamo quanto tempo dobbiamo aspettare, prima di permettere nuovamente lo scroll naturale
    let currentIndex = 0;
    let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
    let phasesTxtItems = $gsap.utils.toArray(".phaseCircle .innerTxt"); //creo l'array dei testi delle Fasi
    let phasesChipsTitle = $gsap.utils.toArray("#chips-wrapper .container .title");
    let phasesChips = $gsap.utils.toArray("#chips-wrapper .phase-chips");
    let phasesChipsContainer = $gsap.utils.toArray(
      "#chips-wrapper .container .chipsContainer"
    );

    console.log("phasesChipsTitle", phasesChipsTitle);
    console.log("phasesChips", phasesChips);
    console.log("phasesChipsContainer", phasesChipsContainer);

    //SECTION - sezione animazione continua dei cerchi delle Fasi

    rotationTL.value = $gsap.timeline({
      paused: true,
    });

    rotationTL.value.to(phasesItems, {
      rotate: 360,
      transformOrigin: "50% 50%",
      duration: 7,
      ease: "linear",
      repeat: -1,
    });

    //!SECTION

    //SECTION - sezione animazione delle chips delle fasi
    phasesTL.value = $gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top center", //devo allinearmi al fire dello scrollTrigger principale "center"
        end: "+=1000px",
        scrub: true,
        markers: true,
        snap: {
          snapTo: "labels", // snap to one of the labels, or use a function
          duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        },
      },
    });

    phasesChipsTitle.forEach((ChipTitle, i) => {
      phasesTL.value.fromTo(
        ChipTitle,
        {
          y: -10,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          //stagger: 1,
        }
      );
      phasesTL.value.addLabel(`label${i}`);
      phasesTL.value.fromTo(
        phasesChipsContainer[i], // Usa l'elemento corrispondente
        { y: -10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5 }
      );
    });
    //!SECTION

    const containers = [
      "#pre-chips-container",
      "#production-chips-container",
      "#post-chips-container",
      "#market-chips-container",
    ]; // creo un array con i container delle chips delle fasi

    //implemento l'intentObserver che gestirò dalla pagina parent in cui chiamerò il componente
    // intentObserver.value = ScrollTrigger.observe({
    //   type: "wheel,touch,pointer",
    //   tolerance: 10,
    //   preventDefault: true,
    //   // metodo che tiene conto dello scroll naturale di MacOS cioè si basa sulla direzione indicata da deltaY
    //   onChange: (self) => {
    //     const delta = self.deltaY || self.touchDeltaY;
    //     const threshold = 5;
    //     if (Math.abs(delta) > threshold) {
    //       if (delta > 0) {
    //         //console.log("Scrolling down");
    //         allowScroll && circleAnimation(currentIndex + 1, true);
    //       } else if (delta < 0) {
    //         //console.log("Scrolling up");
    //         allowScroll && circleAnimation(currentIndex - 1, false);
    //       }
    //     }
    //   },
    //   onEnable(self) {
    //     allowScroll = false; // blocca lo scroll
    //     scrollTimeout.restart(true); //riattiva lo scroll dopo un secondo
    //     //registro la posizione dello scroll
    //     let savedScroll = self.scrollY();
    //     // Per bloccare il div in posizione durante l'animazione
    //     self._restoreScroll = () => self.scrollY(savedScroll);
    //     //document.addEventListener("scroll", self._restoreScroll, { passive: false });
    //     //ogni volta che l'utente scrolla ripristino la posizione dello scroll salvata
    //     //passive:false serve per non interferire con il preventDefault
    //   },
    //   onDisable: (self) => {
    //     document.removeEventListener("scroll", self._restoreScroll);
    //     // Tolgo il listener e riattivo lo scroll
    //   },
    // });
    // intentObserver.value.disable(); //disabilito l'observer inizialemnte

    function circleAnimation(index, isScrollingDown) {
      //gestiamo il ripristino dello scroll se siamo alla fine o ritornati all'inizio
      if (
        (index === phasesItems.length + 1 && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
      ) {
        intentObserver.value.disable();
        return;
      }

      // console.log("currentIndex", currentIndex, "_", "index", index);

      let target = isScrollingDown ? phasesItems[currentIndex] : phasesItems[index];
      let txtTarget = isScrollingDown
        ? phasesTxtItems[currentIndex]
        : phasesTxtItems[index];
      //console.log("Array dei testi delle fasi", `${txtTarget} path`);
      let targetContainer = isScrollingDown
        ? containers[currentIndex]
        : containers[index];

      let Chips_Title = isScrollingDown
        ? `${containers[currentIndex]} .title`
        : `${containers[index]} .title`;

      let Chips_Title_pre = isScrollingDown
        ? `${containers[currentIndex - 1]} .title`
        : `${containers[index - 1]} .title`;

      //ricavo le chips per ogni container in base a currentIndex

      let targetChips = isScrollingDown
        ? `${containers[currentIndex]} .phase-chips`
        : `${containers[index]} .phase-chips`;

      let targetChips_pre = isScrollingDown
        ? `${containers[currentIndex - 1]} .phase-chips`
        : `${containers[index - 1]} .phase-chips`;

      let phases_tl = $gsap.timeline();

      phases_tl
        .fromTo(
          Chips_Title,
          {
            y: isScrollingDown ? -10 : 0,
          },
          {
            y: isScrollingDown ? 0 : -10,
            autoAlpha: isScrollingDown ? 1 : 0,
            duration: 0.5,
          }
        )
        .fromTo(
          Chips_Title_pre,
          {
            y: isScrollingDown ? 0 : 10,
          },
          {
            y: isScrollingDown ? 10 : 0,
            autoAlpha: isScrollingDown ? 0 : 1,
            duration: 0.3,
          },
          "<"
        )
        .fromTo(
          targetChips,
          {
            y: isScrollingDown ? 10 : 0,
          },
          {
            y: isScrollingDown ? 0 : 10,
            autoAlpha: isScrollingDown ? 1 : 0,
            duration: 0.5,
          }
        )
        .fromTo(
          targetChips_pre,
          {
            y: isScrollingDown ? 0 : -10,
          },
          {
            y: isScrollingDown ? -10 : 0,
            autoAlpha: isScrollingDown ? 0 : 1,
            duration: 0.3,
          },
          "<"
        );

      currentIndex = index;
    } //NOTE - chiusura CircleAnimation
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted

defineExpose({ rotationTL, phasesTL });
</script>

<style scoped></style>
