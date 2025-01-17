<template>
  <div id="phases-element" class="element hjhjhj">
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
      <PhasesChips></PhasesChips>
    </div>
  </div>
</template>

<script setup>
//le altre importazioni derivano dalla pagina principale
import { nextTick } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { _opacity } from "#tailwind-config/theme";
import { _bottom } from "#tailwind-config/theme/backgroundPosition";

//definisco le costanti da esporre con defineExpose, che userò all'interno di onMounted utilizzando .value
// utilizzo shallowRef per non covertire le proprietà interne di Gsap in oggetti reattivi di vue
const rotationTL = shallowRef(null);
const intentObserver = shallowRef(null);

onMounted(() => {
  const { $gsap } = useNuxtApp();

  nextTick(() => {
    //console.log("PhasesComp nexttick mounted");
    let allowScroll = true; // Variabile per bloccare lo scroll
    let scrollTimeout = $gsap.delayedCall(1, () => (allowScroll = true)).pause(); // Timeout per evitare doppio scroll, indichiamo quanto tempo dobbiamo aspettare, prima di permettere nuovamente lo scroll naturale
    let currentIndex = 0;
    let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
    let phasesTxtItems = $gsap.utils.toArray(".phaseCircle .innerTxt"); //creo l'array dei testi delle Fasi

    //SECTION - sezione animazione continua dei cerchi delle Fasi

    rotationTL.value = $gsap.timeline({
      scrollTrigger: {
        start: "top center",
        end: "center center",
        toggleActions: "play pause resume pause",
        trigger: "#phases-section",
      },
    });

    rotationTL.value.to(phasesItems, {
      rotate: 360,
      transformOrigin: "50% 50%",
      duration: 7,
      ease: "linear",
      repeat: -1,
    });

    //!SECTION

    const containers = [
      "#pre-chips-container",
      "#production-chips-container",
      "#post-chips-container",
      "#market-chips-container",
    ]; // creo un array con i container delle chips delle fasi

    //implemento l'intentObserver che gestirò dalla pagina parent in cui chiamerò il componente
    intentObserver.value = ScrollTrigger.observe({
      type: "wheel,touch,pointer",
      tolerance: 10,
      preventDefault: true,
      // metodo che tiene conto dello scroll naturale di MacOS cioè si basa sulla direzione indicata da deltaY
      onChange: (self) => {
        const delta = self.deltaY || self.touchDeltaY;
        const threshold = 5;
        if (Math.abs(delta) > threshold) {
          if (delta > 0) {
            //console.log("Scrolling down");
            allowScroll && circleAnimation(currentIndex + 1, true);
          } else if (delta < 0) {
            //console.log("Scrolling up");
            allowScroll && circleAnimation(currentIndex - 1, false);
          }
        }
      },
      onEnable(self) {
        allowScroll = false; // blocca lo scroll
        scrollTimeout.restart(true); //riattiva lo scroll dopo un secondo
        //registro la posizione dello scroll
        let savedScroll = self.scrollY();
        // Per bloccare il div in posizione durante l'animazione
        self._restoreScroll = () => self.scrollY(savedScroll);
        document.addEventListener("scroll", self._restoreScroll, { passive: false });
        //ogni volta che l'utente scrolla ripristino la posizione dello scroll salvata
        //passive:false serve per non interferire con il preventDefault
      },
      onDisable: (self) => {
        document.removeEventListener("scroll", self._restoreScroll);
        // Tolgo il listener e riattivo lo scroll
      },
    });
    intentObserver.value.disable(); //disabilito l'observer inizialemnte

    function circleAnimation(index, isScrollingDown) {
      //gestiamo il ripristino dello scroll se siamo alla fine o ritornati all'inizio
      if (
        (index === phasesItems.length + 1 && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
      ) {
        intentObserver.value.disable();
        return;
      }
      //non servono più perchè gestiti con la timeline onStart e onComplete
      // allowScroll = false;
      // scrollTimeout.restart(true);

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

      let Chips_Title_post = isScrollingDown
        ? `${containers[currentIndex + 1]} .title`
        : `${containers[index + 1]} .title`;

      //ricavo le chips per ogni container in base a currentIndex
      let targetChips_pre = isScrollingDown
        ? $gsap.utils.toArray(`${containers[currentIndex - 1]} .phase-chips`)
        : $gsap.utils.toArray(`${containers[index - 1]} .phase-chips`);

      let targetChips = isScrollingDown
        ? $gsap.utils.toArray(`${containers[currentIndex]} .phase-chips`)
        : $gsap.utils.toArray(`${containers[index]} .phase-chips`);

      let targetChips_post = isScrollingDown
        ? $gsap.utils.toArray(`${containers[currentIndex + 1]} .phase-chips`)
        : $gsap.utils.toArray(`${containers[index + 1]} .phase-chips`);

      let phases_tl = $gsap.timeline({
        onStart: () => {
          allowScroll = false;
        },
        onComplete: () => {
          allowScroll = true; //riattivo solo dopo la fine dell'animazione
        },
      });

      phases_tl
        // .to(target, {
        //   opacity: 1,
        //   ease: "back.out",
        //   duration: 0.25,
        // })
        // .to(txtTarget.querySelectorAll("path"), {
        //   //autoAlpha: isScrollingDown ? 1 : 0,
        //   fill: isScrollingDown ? "#cef372" : "#6DCFF6",
        //   duration: 0.5,
        //   ease: "power2.out",
        // })
        .fromTo(
          Chips_Title,
          {
            y: isScrollingDown ? -10 : 0,
            //autoAlpha: isScrollingDown ? 0 : 1,
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
        .to(targetChips, {
          autoAlpha: isScrollingDown ? 1 : 0,
          //filter: isScrollingDown ? "blur(0px)" : "blur(5px)",
          duration: 0.5,
          stagger: 0.2,
        })
        // .to(
        //   Chips_Title_pre,
        //   {
        //     //y: isScrollingDown ? 100 : -100,
        //     autoAlpha: isScrollingDown ? 0 : 1,
        //     duration: 0.3,
        //   },
        //   "<"
        // )
        .to(
          targetChips_pre,
          {
            autoAlpha: isScrollingDown ? 0 : 1,
            //filter: isScrollingDown ? "blur(0px)" : "blur(5px)",
            duration: 0.3,
            stagger: 0.2,
          },
          "<"
        );
      // .to(
      //   Chips_Title_post,
      //   {
      //     autoAlpha: 0,
      //     duration: 0.3,
      //   },
      //   "<"
      // )
      // .to(
      //   targetChips_post,
      //   {
      //     autoAlpha: 0,
      //     //filter: isScrollingDown ? "blur(0px)" : "blur(5px)",
      //     duration: 0.3,
      //     stagger: 0.2,
      //   },
      //   "<"
      // );

      currentIndex = index;
    } //NOTE - chiusura CircleAnimation

    // ScrollTrigger.create({
    //   trigger: "#phases-section",
    //   start: "top +=65",
    //   end: "+=100",
    //   pin: true,
    //   //invalidateOnRefresh: true,
    //   //markers: true,
    //   onEnter: (self) => {
    //     circleAnimation(currentIndex + 1, true);
    //     if (intentObserver.value.isEnabled) {
    //       return;
    //     }
    //     self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
    //     intentObserver.value.enable();
    //   },
    //   onEnterBack: (self) => {
    //     if (intentObserver.value.isEnabled) {
    //       return;
    //     }

    //     // Assuming self.end represents the vertical scroll position
    //     window.scrollTo({
    //       top: self.end - 1,
    //       behavior: "instant", // or 'smooth' for a smooth scroll
    //     });

    //     intentObserver.value.enable();
    //   },
    // }); //NOTE - chiusura ScrollTrigger
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted

defineExpose({ rotationTL, intentObserver });
</script>

<style scoped></style>
