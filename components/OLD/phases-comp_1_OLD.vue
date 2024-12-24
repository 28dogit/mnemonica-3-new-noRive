<template>
  <div id="phases-element" class="element hjhjhj">
    <PreSvg id="Pre_svg" class="phaseCircle"></PreSvg>
    <ProductionSvg id="Production_svg" class="phaseCircle"></ProductionSvg>
    <PostSvg id="Post_svg" class="phaseCircle"></PostSvg>
    <MarketSvg id="Market_svg" class="phaseCircle"></MarketSvg>
    <NuxtImg
      id="logoPhase"
      src="/assets/img/svg/Logo-mne-Vector.svg"
      alt="Mnemonica logo portrait"
    />
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
onMounted(() => {
  const { $gsap } = useNuxtApp();

  nextTick(() => {
    //console.log("PhasesComp nexttick mounted");
    let allowScroll = true; // Variabile per bloccare lo scroll
    let scrollTimeout = $gsap.delayedCall(1, () => (allowScroll = true)).pause(); // Timeout per evitare doppio scroll, indichiamo quanto tempo dobbiamo aspettare, prima di permettere nuovamente lo scroll naturale
    let currentIndex = 0;
    let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
    let phasesTxtItems = $gsap.utils.toArray(".phaseCircle .innerTxt"); //creo l'array dei testi delle Fasi

    const containers = [
      "#pre-chips-container",
      "#production-chips-container",
      "#post-chips-container",
      "#market-chips-container",
    ]; // creo un array con i container delle chips delle fasi
    // console.log(phasesItems[0]);

    let intentObserver = ScrollTrigger.observe({
      //target: "#phases-section",
      type: "wheel,touch",
      onUp() {
        console.log(allowScroll, " - onUp");
        allowScroll && circleAnimation(currentIndex - 1, false);
        console.log(allowScroll, " - onUp2");
      },
      onDown() {
        console.log(allowScroll, " - onDown");
        allowScroll && circleAnimation(currentIndex + 1, true);
        console.log(allowScroll, " - onDown2");
      },
      tolerance: 10,
      preventDefault: true,
      debounce: false,
      onEnable(self) {
        //console.log("Observer enabled - ----");
        allowScroll = false; // blocca lo scroll
        scrollTimeout.restart(true); //riattiva lo scroll dopo un secondo (cioè riattiva la funzionalità dello scroll)
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
        //console.log("Observer Disabled - ----");
        // come disabilito l'observer tolgo il listener e riattivo lo scroll
      },
    });
    intentObserver.disable(); //disabilito l'observer inizialemnte

    function circleAnimation(index, isScrollingDown) {
      //gestiamo il ripristino dello scroll se siamo alla fine o ritornati all'inizio
      if (
        (index === phasesItems.length + 1 && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
      ) {
        intentObserver.disable();
        return;
      }
      // allowScroll = false;
      // scrollTimeout.restart(true);

      console.log("currentIndex", currentIndex, "_", "index", index);

      let target = isScrollingDown ? phasesItems[currentIndex] : phasesItems[index];
      let txtTarget = isScrollingDown
        ? phasesTxtItems[currentIndex]
        : phasesTxtItems[index];
      let targetContainer = isScrollingDown
        ? containers[currentIndex]
        : containers[index];

      let phases_tl = $gsap.timeline({
        onStart: () => {
          console.log(allowScroll, " - onStart prima di false");
          allowScroll = false;
          console.log(allowScroll, " - onStart dopo false");
        },
        onComplete: () => {
          console.log("complete");
          allowScroll = true;
          //scrollTimeout.restart(true);
          console.log(scrollTimeout);
        },
      });

      phases_tl
        .to(target, {
          rotate: isScrollingDown ? 120 : -120,
          transformOrigin: "50% 50%",
          ease: "back.out",
          //yPercent: isScrollingDown ? -100 : 0,
          duration: 0.75,
          // onStart: () => {
          //   console.log("start");
          //   allowScroll = false;
          //   console.log(allowScroll);
          // },
          // onComplete: () => {
          //   console.log("complete");
          //   scrollTimeout.restart(true);
          //   console.log(scrollTimeout);
          // },
        })
        .to(
          txtTarget,
          {
            autoAlpha: isScrollingDown ? 1 : 0,
            duration: 1,
            ease: "back.out",
          },
          "-=1"
        )
        .to(
          targetContainer,
          {
            autoAlpha: isScrollingDown ? 1 : 0,
            // filter: "blur(5px)",
            duration: 1,
            ease: "back.out",
          },
          "<"
        );

      currentIndex = index;
    }

    ScrollTrigger.create({
      trigger: "#phases-section",
      start: "top +=65",
      end: "+=100",
      pin: true,
      //markers: true,
      onEnter: (self) => {
        if (intentObserver.isEnabled) {
          return;
        } // in case the native scroll jumped past the end and then we force it back to where it should be.

        // const targetY = self.start + 1;
        // // Use ScrollToOptions
        // self.scroll({
        //   top: targetY,
        //   behavior: "instant", // or 'smooth' for smooth scrolling
        // });
        self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
        intentObserver.enable(); // STOP native scrolling
      },
      onEnterBack: () => {
        if (intentObserver.isEnabled) {
          return;
        } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
        // Calculate the target scroll position (adjust as needed)
        const targetY = self.end - 1;

        // Use ScrollToOptions
        self.scroll({
          top: targetY,
          behavior: "instant", // or 'smooth' for smooth scrolling
        });
        //self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
        intentObserver.enable(); // STOP native scrolling
      },
    });
  });
});
</script>

<style scoped></style>
