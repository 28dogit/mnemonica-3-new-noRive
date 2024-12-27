<template>
  <main>
    <div id="hero-section" class="section">
      <div id="ghirlanda-element" class="element">
        <!-- <div id="logo_mne" class=""> -->
        <NuxtImg
          id="logo_mne"
          src="/assets/img/svg/Logo-mne-Vector.svg"
          densities="x1"
          alt="Mnemonica logo portrait"
        />
        <!-- </div> -->
        <NuxtImg
          id="ghirlanda_img"
          src="/assets/img/Ghirlanda_full_web_800_opt.png"
          alt="mnemonica ghirlanda ecosystem"
          densities="x1"
        />
      </div>
      <div id="hero-content-wrapper" class="wrapper">
        <div id="hero-content" class="content">
          <div id="heroTitle" class="flex items-center justify-center flex-wrap">
            <div class="overflowMask overflow-hidden">
              <h1 id="H-screen" class="uppercase">Screen</h1>
            </div>
            <div class="overflowMask overflow-hidden">
              <h1 id="H-deliver" class="uppercase">Deliver</h1>
            </div>
            <div class="overflowMask overflow-hidden">
              <h1 id="H-preserve" class="uppercase">Preserve</h1>
            </div>
          </div>
          <h2 id="heroSubTitle" class="hidden min-[680px]:block text-center">
            Connecting the dots of the digital cinema living ecosystem
          </h2>
          <h2 id="heroSubTitle" class="text-center min-[680px]:hidden">
            Connecting the dots of the digital <br />cinema living ecosystem
          </h2>
        </div>
      </div>
    </div>
    <div id="modules-section" class="section">
      <ModulesComp></ModulesComp>
    </div>
    <div id="phases-section" class="section">
      <PhasesComp></PhasesComp>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
import { ScrollTrigger } from "gsap/ScrollTrigger";

onMounted(() => {
  console.log("Home mounted!!");
  const { $gsap } = useNuxtApp();
  // registro effetto per l'entrata delle scritte e del logo in Hero section
  $gsap.registerEffect({
    name: "EnterFrom",
    effect: (targets, config) => {
      return $gsap.from(targets, {
        autoAlpha: 0,
        duration: config.duration,
        y: config.y,
        ease: config.ease,
      });
    },
    defaults: {
      ease: "back.out",
      y: "100",
    },
    extendTimeline: true,
  });
  // implemento la timeline intro che sbloccherà alla fine l'overflow hidden del body per ripristinare lo scroll
  const intro = $gsap.timeline({
    onComplete: () => {
      //console.log("Ripristino scroll");
      $gsap.set("body", { overflow: "auto" });
    },
  });

  intro.from("#ghirlanda-element", {
    autoAlpha: 0,
    rotate: 5,
    filter: "blur(5px)",
    duration: 1.5,
    scale: 0.9,
    force3D: true,
    ease: "power2.inOut",
  });
  intro.EnterFrom("#logo_mne", { duration: 2, y: "0" });
  intro.EnterFrom("#H-screen", { duration: 0.7 }, "<");
  intro.EnterFrom("#H-deliver", { duration: 0.7 }, "> -=0.3");
  intro.EnterFrom("#H-preserve", { duration: 0.7 }, "> -=0.3");
  intro.EnterFrom("#heroSubTitle", { duration: 0.5, y: "-25px" }, "-=0.7");

  ///ANCHOR - Modules section

  // $gsap.to("#made_for", {
  //   textShadow: `0 0 7px rgba(184, 239, 250, 0.1), 0 0 10px rgba(184, 239, 250, 0.1), 0 0 42px rgba(184, 239, 250, 0.1)`,
  //   duration: 1.2,
  //   repeat: -1,
  //   yoyo: true,
  //   ease: "linear",
  // });

  // const modules_tl = $gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#modules-section", // Elemento che attiva l'animazione
  //     start: "top +=75", // Quando inizia l'animazione
  //     end: "bottom top", // Durata dello scroll
  //     invalidateOnRefresh: true,
  //     scrub: true, // Sincronizzazione con lo scroll
  //     anticipatePin: 1,
  //     pin: true, // Fissa il contenitore #hero-section
  //     //markers: true,
  //     snap: {
  //       snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
  //       duration: { min: 0.2, max: 0.5 }, // Durata dell'animazione di aggancio
  //       ease: "back.out(1.7)", // Easing dell'animazione di aggancio
  //       ease: "linear",
  //     },
  //     onSnapComplete: ({ progress, direction, isActive }) =>
  //       console.log(progress, direction, isActive),
  //   },
  //   defaults: { duration: 0.75, ease: "back.out" },
  // });

  // modules_tl.to(
  //   "#modules_svg",
  //   {
  //     rotate: 120,
  //     onComplete: () => {
  //       console.log("ho fatt la prima rotate 120");
  //     },
  //   },
  //   0
  // );

  // modules_tl.to(
  //   "#modules_svg",
  //   {
  //     rotate: 120,
  //   },
  //   1
  // );
  // modules_tl.to(
  //   "#modules-content #module-txt_1",
  //   {
  //     opacity: 0,
  //   },
  //   1
  // );
  // modules_tl.to(
  //   "#modules-content #module-txt_2",
  //   {
  //     opacity: 1,
  //   },
  //   1
  // );
  // modules_tl.to(
  //   "#modules_svg",
  //   {
  //     rotate: 240,
  //   },
  //   2
  // );
  // modules_tl.to(
  //   "#modules-content #module-txt_2",
  //   {
  //     opacity: 0,
  //   },
  //   2
  // );
  // modules_tl.to(
  //   "#modules-content #module-txt_3",
  //   {
  //     opacity: 1,
  //   },
  //   2
  // );

  //ANCHOR - Phases Section

  // let allowScroll = true; //per sicurezza
  // let scrollTimeout = $gsap.delayedCall(1, () => (allowScroll = true)).pause(); // Timeout per evitare doppio scroll, indichiamo quanto tempo dobbiamo aspettare, prima di permettere nuovamente lo scroll naturale
  // let currentIndex = 0;
  // let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
  // let phasesTxtItems = $gsap.utils.toArray(".phaseCircle .innerTxt"); //creo l'array dei testi delle Fasi
  // console.log(phasesItems[0]);

  // let intentObserver = ScrollTrigger.observe({
  //   //target: "#phases-section",
  //   type: "wheel,touch",
  //   onUp: () => allowScroll && circleAnimation(currentIndex - 1, false),
  //   onDown: () => allowScroll && circleAnimation(currentIndex + 1, true),
  //   tolerance: 10,
  //   preventDefault: true,
  //   onEnable(self) {
  //     console.log("Observer enabled - ----");
  //     allowScroll = false; // blocca lo scroll
  //     scrollTimeout.restart(true); //riattiva lo scroll dopo un secondo (cioè riattiva la funzionalità dello scroll)
  //     //registro la posizione dello scroll
  //     let savedScroll = self.scrollY();
  //     // Per bloccare il div in posizione durante l'animazione
  //     self._restoreScroll = () => self.scrollY(savedScroll);
  //     document.addEventListener("scroll", self._restoreScroll, { passive: false });
  //     //ogni volta che l'utente scrolla ripristino la posizione dello scroll salvata
  //     //passive:false serve per non interferire con il preventDefault
  //   },
  //   onDisable: (self) => {
  //     document.removeEventListener("scroll", self._restoreScroll);
  //     console.log("Observer Disabled - ----");
  //     // come disabilito l'observer tolgo il listener e riattivo lo scroll
  //   },
  // });
  // intentObserver.disable(); //disabilito l'observer inizialemnte

  // function circleAnimation(index, isScrollingDown) {
  //   //gestiamo il ripristino dello scroll se siamo alla fine o ritornati all'inizio
  //   if (
  //     (index === phasesItems.length + 1 && isScrollingDown) ||
  //     (index === -1 && !isScrollingDown)
  //   ) {
  //     intentObserver.disable();
  //     return;
  //   }
  //   allowScroll = false;
  //   scrollTimeout.restart(true);

  //   console.log("currentIndex", currentIndex, "_", "index", index);

  //   let target = isScrollingDown ? phasesItems[currentIndex] : phasesItems[index];
  //   let txtTarget = isScrollingDown
  //     ? phasesTxtItems[currentIndex]
  //     : phasesTxtItems[index];

  //   let phases_tl = $gsap.timeline();

  //   phases_tl
  //     .to(target, {
  //       rotate: isScrollingDown ? 120 : -120,
  //       transformOrigin: "50% 50%",
  //       ease: "back.out",
  //       //yPercent: isScrollingDown ? -100 : 0,
  //       duration: 0.75,
  //       onStart: () => {
  //         console.log("start");
  //         allowScroll = false;
  //       },
  //       onComplete: () => {
  //         console.log("complete");
  //         scrollTimeout.restart(true);
  //       },
  //     })
  //     .to(
  //       txtTarget,
  //       {
  //         autoAlpha: isScrollingDown ? 1 : 0,
  //         duration: 1,
  //         ease: "back.out",
  //       },
  //       "-=1"
  //     );

  //   currentIndex = index;
  // }

  // ScrollTrigger.create({
  //   trigger: "#phases-section",
  //   start: "top +=65",
  //   end: "+=800",
  //   pin: true,
  //   //markers: true,
  //   onEnter: (self) => {
  //     if (intentObserver.isEnabled) {
  //       return;
  //     } // in case the native scroll jumped past the end and then we force it back to where it should be.
  //     self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
  //     intentObserver.enable(); // STOP native scrolling
  //   },
  //   onEnterBack: () => {
  //     if (intentObserver.isEnabled) {
  //       return;
  //     } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
  //     // Calculate the target scroll position (adjust as needed)
  //     const targetY = self.end - 1;

  //     // Use ScrollToOptions
  //     self.scroll({
  //       top: targetY,
  //       behavior: "instant", // or 'smooth' for smooth scrolling
  //     });
  //     // self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
  //     intentObserver.enable(); // STOP native scrolling
  //   },
  // });
});
</script>

<style></style>
