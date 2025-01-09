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

    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch,pointer",

      //vecchio metodo che non teneva conto dello scroll naturale di MacOS
      // onUp() {
      //   allowScroll && circleAnimation(currentIndex - 1, false);
      // },
      // onDown() {
      //   allowScroll && circleAnimation(currentIndex + 1, true);
      // },
      tolerance: 10,
      preventDefault: true,
      //debounce: false,
      //nuovo metodo che tiene conto dello scroll naturale di MacOS cioè si basa sulla direzione indicata da deltaY
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
      //non servono più perchè gestiti con la timeline onStart e onComplete
      // allowScroll = false;
      // scrollTimeout.restart(true);

      // console.log("currentIndex", currentIndex, "_", "index", index);

      let target = isScrollingDown ? phasesItems[currentIndex] : phasesItems[index];
      let txtTarget = isScrollingDown
        ? phasesTxtItems[currentIndex]
        : phasesTxtItems[index];
      let targetContainer = isScrollingDown
        ? containers[currentIndex]
        : containers[index];

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
        .to(target, {
          rotate: isScrollingDown ? 120 : -120,
          transformOrigin: "50% 50%",
          ease: "back.out",
          duration: 0.25,
        })
        .to(txtTarget, {
          autoAlpha: isScrollingDown ? 1 : 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(targetChips, {
          autoAlpha: isScrollingDown ? 1 : 0,
          //filter: isScrollingDown ? "blur(0px)" : "blur(5px)",
          duration: 0.5,
          stagger: 0.2,
        })
        .to(
          targetChips_pre,
          {
            autoAlpha: isScrollingDown ? 0 : 1,
            //filter: isScrollingDown ? "blur(0px)" : "blur(5px)",
            duration: 0.3,
            stagger: 0.2,
          },
          "<"
        )
        .to(
          targetChips_post,
          {
            autoAlpha: 0,
            //filter: isScrollingDown ? "blur(0px)" : "blur(5px)",
            duration: 0.3,
            stagger: 0.2,
          },
          "<"
        );

      currentIndex = index;
    } //NOTE - chiusura CircleAnimation

    ScrollTrigger.create({
      trigger: "#phases-section",
      start: "top +=65",
      end: "+=100",
      pin: true,
      //invalidateOnRefresh: true,
      //markers: true,
      onEnter: (self) => {
        circleAnimation(currentIndex + 1, true);
        if (intentObserver.isEnabled) {
          return;
        }
        self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
        intentObserver.enable();
      },
      onEnterBack: (self) => {
        if (intentObserver.isEnabled) {
          return;
        }

        // Assuming self.end represents the vertical scroll position
        window.scrollTo({
          top: self.end - 1,
          behavior: "instant", // or 'smooth' for a smooth scroll
        });

        intentObserver.enable();
      },
    }); //NOTE - chiusura ScrollTrigger
  }); //NOTE - chiusura nextTick
}); //NOTE - chiusura onMounted
</script>

<style scoped></style>
