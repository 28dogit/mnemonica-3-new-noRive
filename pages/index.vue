<template>
  <main>
    <div id="hero-section" class="section">
      <div id="ghirlanda-element" class="element">
        <div id="logo_mne" class="">
          <NuxtImg
            src="/assets/img/svg/Logo-mne-Vector.svg"
            densities="x1"
            alt="Mnemonica logo portrait"
          />
        </div>
        <NuxtImg
          src="/assets/img/Ghirlanda_full_web_800_opt.png"
          alt="mnemonica ghirlanda ecosystem"
          densities="x1"
        />
      </div>
      <div id="hero-content-wrapper" class="wrapper">
        <div id="hero-content" class="content">
          <div id="heroTitle" class="flex items-center gap-10 justify-center flex-wrap">
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
      <div id="modules-element" class="element">
        <Modules id="modules_svg"></Modules>
        <p id="made_for">MADE FOR</p>
      </div>
      <div id="modules-content-wrapper" class="wrapper">
        <div id="modules-content" class="content">
          <div id="module-txt_1" class="module_txt">
            <h2>Rooms</h2>
            <p>
              Leave folders behind. Experience active workspaces that free you from
              repetitive tasks encoding, watermarking, keeping everyone updated. Enjoy
              private places where people meet around media, playlists are a given,
              content is easy to find and move.
            </p>
          </div>
          <div id="module-txt_2" class="module_txt">
            <h2>Boxes</h2>
            <p>
              Forget hard drives and LTOs. Welcome to the most advanced and reliable
              solution for long-term preservation of digital film works that also keeps
              them always available for business opportunities and cultural outreach.
              Arrange immediate screenings with integrated Rooms, easily retrieve relevant
              assets, securely deliver to stakeholders.
            </p>
          </div>
          <div id="module-txt_3" class="module_txt">
            <h2>Masters</h2>
            <p>
              Get rid of third-party shuttles. With the built-in data exchange facility,
              you can send & receive files and folders of any size and complexity directly
              from/to Rooms, as well as local drives. Only between registered users,
              without leaving Mnemonica safe walls.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="phases-section" class="section">
      <div id="phases-element" class="element">
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
          <!-- <PhasesChips></PhasesChips> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

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

  $gsap.to("#made_for", {
    textShadow: `0 0 7px rgba(184, 239, 250, 0.1), 0 0 10px rgba(184, 239, 250, 0.1), 0 0 42px rgba(184, 239, 250, 0.1)`,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: "linear",
  });

  const modules_tl = $gsap.timeline({
    scrollTrigger: {
      trigger: "#modules-section", // Elemento che attiva l'animazione
      start: "top +=75", // Quando inizia l'animazione
      end: "bottom top", // Durata dello scroll
      invalidateOnRefresh: true,
      scrub: true, // Sincronizzazione con lo scroll
      anticipatePin: 1,
      pin: true, // Fissa il contenitore #hero-section
      //markers: true,
      snap: {
        snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
        duration: { min: 0.2, max: 0.5 }, // Durata dell'animazione di aggancio
        ease: "back.out(1.7)", // Easing dell'animazione di aggancio
        // ease: "linear",
      },
      onSnapComplete: ({ progress, direction, isActive }) =>
        console.log(progress, direction, isActive),
    },
    defaults: { duration: 0.75, ease: "back.out" },
  });

  modules_tl.to(
    "#modules_svg",
    {
      rotate: 120,
      onComplete: () => {
        console.log("ho fatt la prima rotate 120");
      },
    },
    0
  );

  modules_tl.to(
    "#modules_svg",
    {
      rotate: 120,
    },
    1
  );
  modules_tl.to(
    "#modules-content #module-txt_1",
    {
      opacity: 0,
    },
    1
  );
  modules_tl.to(
    "#modules-content #module-txt_2",
    {
      opacity: 1,
    },
    1
  );
  modules_tl.to(
    "#modules_svg",
    {
      rotate: 240,
    },
    2
  );
  modules_tl.to(
    "#modules-content #module-txt_2",
    {
      opacity: 0,
    },
    2
  );
  modules_tl.to(
    "#modules-content #module-txt_3",
    {
      opacity: 1,
    },
    2
  );

  //ANCHOR - Phases Section

  // let allowScroll = true; //per sicurezza
  // let scrollTimeout = $gsap.delayedCall(1, () => (allowScroll = true)).pause(); // Timeout per evitare doppio scroll, indichiamo quanto tempo dobbiamo aspettare, prima di permettere nuovamente lo scroll naturale
  // let currentIndex = 0;
  // let phasesItems = $gsap.utils.toArray(".phaseCircle .innerCircle"); //creo l'array dei cerchi delle Fasi
  // console.log(phasesItems[0]);
  // let intentObserver = ScrollTrigger.observe({
  //   target: "#phases-section",
  //   type: "wheel,touch",
  //   tolerance: 10,
  //   preventDefault: true,
  //   onUp: () => allowScroll && circleAnimation(currentIndex - 1, false),
  //   onDown: () => allowScroll && circleAnimation(currentIndex + 1, true),
  //   onEnable(self) {
  //     console.log("Observer enabled");
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
  //   onDisable: () => {
  //     document.removeEventListener("scroll", self._restoreScroll);
  //     console.log("Observer Disabled");
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
  //   $gsap.to(target, {
  //     rotate: isScrollingDown ? 360 : -360,
  //     duration: 0.75,
  //     ease: "linear",
  //     transformOrigin: "50% 50%",
  //   });
  //   currentIndex = index;
  // }

  // ScrollTrigger.create({
  //   trigger: "#phases-section",
  //   start: "top +=65",
  //   end: "+=800",
  //   pin: true,
  //   markers: true,
  //   onEnter: (self) => {
  //     if (intentObserver.isEnabled) {
  //       return;
  //     } // in case the native scroll jumped past the end and then we force it back to where it should be.
  //     self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
  //     intentObserver.enable(); // STOP native scrolling
  //   },
  //   onLeaveBack: () => {
  //     if (intentObserver.isEnabled) {
  //       return;
  //     } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
  //     self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
  //     intentObserver.enable(); // STOP native scrolling
  //   },
  // });

  //-----------

  // const phases_tl = $gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#phases-section", // Elemento che attiva l'animazione
  //     start: "top +=60", // Quando inizia l'animazione
  //     end: "bottom +=40", // Durata dello scroll
  //     scrub: true, // Sincronizzazione con lo scroll
  //     pin: true, // Fissa il contenitore #hero-section
  //     snap: {
  //       snapTo: "labels",
  //       duration: 0.1,
  //       ease: "linear",
  //     },
  //   },
  // });

  // phases_tl
  //   .to(
  //     "#m_100_circle_ecosys_0",
  //     {
  //       rotate: 360,
  //       ease: "linear",
  //       transformOrigin: "50% 50%",
  //     },
  //     0
  //   )
  //   .from(
  //     "#Pre_txt",
  //     {
  //       autoAlpha: 0,
  //     },
  //     0
  //   )
  //   .to(
  //     "#m_100_circle_ecosys_1",
  //     {
  //       rotate: 360,
  //       ease: "linear",
  //       transformOrigin: "50% 50%",
  //     },
  //     0.3
  //   )
  //   .from(
  //     "#Production_txt",
  //     {
  //       autoAlpha: 0,
  //     },
  //     0.3
  //   )
  //   .to(
  //     "#m_100_circle_ecosys_2",
  //     {
  //       rotate: 360,
  //       ease: "linear",
  //       transformOrigin: "50% 50%",
  //     },
  //     0.6
  //   )
  //   .from(
  //     "#Post_txt",
  //     {
  //       autoAlpha: 0,
  //     },
  //     0.6
  //   )
  //   .to(
  //     "#m_100_circle_ecosys_3",
  //     {
  //       rotate: 360,
  //       ease: "linear",
  //       transformOrigin: "50% 50%",
  //     },
  //     0.9
  //   )
  //   .from(
  //     "#Market_txt",
  //     {
  //       autoAlpha: 0,
  //     },
  //     0.9
  //   );

  //ANCHOR - Test Section
  let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
  let scrollTimeout = $gsap.delayedCall(1, () => (allowScroll = true)).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
  let currentIndex = 0;
  let swipePanels = $gsap.utils.toArray(".phaseCircle .innerCircle");
  console.log(swipePanels[0]);

  // set z-index levels for the swipe panels
  $gsap.set(swipePanels, { zIndex: (i) => swipePanels.length - i });

  // create an observer and disable it to start
  let intentObserver = ScrollTrigger.observe({
    type: "wheel,touch",
    onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
    onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
    tolerance: 10,
    preventDefault: true,
    onEnable(self) {
      allowScroll = false;
      scrollTimeout.restart(true);
      // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
      let savedScroll = self.scrollY();
      self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
      document.addEventListener("scroll", self._restoreScroll, { passive: false });
    },
    onDisable: (self) => document.removeEventListener("scroll", self._restoreScroll),
  });
  intentObserver.disable();

  // handle the panel swipe animations
  function gotoPanel(index, isScrollingDown) {
    // return to normal scroll if we're at the end or back up to the start
    if (
      (index === swipePanels.length && isScrollingDown) ||
      (index === -1 && !isScrollingDown)
    ) {
      intentObserver.disable(); // resume native scroll
      return;
    }
    allowScroll = false;
    scrollTimeout.restart(true);

    let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
    $gsap.to(target, {
      //rotate: isScrollingDown ? 360 : -360,
      yPercent: isScrollingDown ? -100 : 0,
      duration: 0.75,
      onStart: () => {
        console.log("start");
        allowScroll = false;
      },
      onComplete: () => {
        console.log("complete");
        scrollTimeout.restart(true);
      },
    });

    currentIndex = index;
  }

  // pin swipe section and initiate observer
  ScrollTrigger.create({
    trigger: "#phases-section",
    pin: true,
    start: "top +=65",
    end: "+=200", // just needs to be enough to not risk vibration where a user's fast-scroll shoots way past the end
    onEnter: (self) => {
      if (intentObserver.isEnabled) {
        return;
      } // in case the native scroll jumped past the end and then we force it back to where it should be.
      self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
      intentObserver.enable(); // STOP native scrolling
    },
    onEnterBack: (self) => {
      if (intentObserver.isEnabled) {
        return;
      } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
      self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
      intentObserver.enable(); // STOP native scrolling
    },
  });

  // horizontal scrolling section
  let horizontalSections = $gsap.utils.toArray(".horizontal .panel");
  $gsap.to(horizontalSections, {
    xPercent: -100 * (horizontalSections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal",
      pin: true,
      scrub: 1,
      end: "+=3500",
      markers: true,
    },
  });
});
</script>

<style></style>
