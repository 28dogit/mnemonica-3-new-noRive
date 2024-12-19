<template>
  <main>
    <div id="hero-section">
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
        <div id="hero-content">
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
    <div id="modules-section">
      <div id="modules-element" class="element">
        <Modules id="modules_svg"></Modules>
        <p id="made_for">MADE FOR</p>
      </div>
      <div id="modules-content-wrapper" class="wrapper">
        <div id="modules-content">
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
    <div id="phases-section">
      <div id="phases-element" class="element">
        <MarketSvg id="Market_svg"></MarketSvg>
        <PostSvg id="Post_svg"></PostSvg>
        <ProductionSvg id="Production_svg"></ProductionSvg>
        <PreSvg id="Pre_svg"></PreSvg>
        <NuxtImg
          id="logoPhase"
          src="/assets/img/svg/Logo-mne-Vector.svg"
          alt="Mnemonica logo portrait"
        />
      </div>
      <div id="phases-content-wrapper" class="wrapper">
        <div id="phases-content"><p>PHASES</p></div>
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

  //-------------------------

  let animating;
  let m_txt = $gsap.utils.toArray(".module_txt");
  let wrap_txt = $gsap.utils.wrap(0, m_txt.length);
  let lastEventTime = 0; // Per gestire il debounce

  function gotoSection(index, val, dir) {
    animating = true;
    index = wrap_txt(index);
    let tl = $gsap.timeline({
      defaults: { duration: 0.25, ease: "back.out" },
      onComplete: () => (animating = false),
    });
    tl.to("#modules_svg", {
      rotate: `${dir}=${val}`,
      onComplete: () => {
        console.log("ciao", ".module_txt");
      },
    });
    tl.to("#module-txt_1", {
      autoAlpha: 0,
    });
    tl.to("#module-txt_2", {
      autoAlpha: 1,
    });
  }

  // Configura ScrollTrigger per bloccare il div nella viewport
  ScrollTrigger.create({
    trigger: "#modules-section",
    start: "top +=65", // Quando inizia l'animazione
    end: "bottom +=40", // Durata dello scroll
    pin: true, // Blocca il div nella viewport
    onEnter: () => enableObserver(),
    onLeave: () => disableObserver(),
    onEnterBack: () => enableObserver(),
    onLeaveBack: () => disableObserver(),
    //markers: true, // Marker per debug, rimuovere in produzione
  });

  let observerInstance = Observer.create({
    type: "wheel,touch",
    target: "#modules-element",
    wheelSpeed: 0.5,
    tolerance: 10,
    //preventDefault: true,
    debounce: true,
    // onUp: () => !animating && gotoSection(1, 120, "-"),
    // onDown: () => !animating && gotoSection(1, 120, "+"),
    onUp: (event) => {
      handleMomentum(event, () => !animating && gotoSection(1, 120, "-"));
    },
    onDown: (event) => {
      handleMomentum(event, () => !animating && gotoSection(1, 120, "+"));
    },
  });

  // Funzione per abilitare l'Observer
  function enableObserver() {
    console.log("Observer abilitato");
    observerInstance.enable();
  }

  // Funzione per disabilitare l'Observer
  function disableObserver() {
    console.log("Observer disabilitato");
    observerInstance.disable();
  }

  // Funzione per gestire eventi generati dall'inerzia
  function handleMomentum(event, callback) {
    const now = Date.now();
    const momentumThreshold = 300; // Tempo minimo tra eventi (in ms)

    if (now - lastEventTime < momentumThreshold) {
      console.log("Evento ignorato a causa dell'inerzia:", event.deltaY);
      return;
    }

    // Ignora eventi con delta troppo piccolo (inerzia residua)
    if (Math.abs(event.deltaY) < 15) {
      console.log("Evento ignorato per delta troppo piccolo:", event.deltaY);
      return;
    }

    lastEventTime = now;
    callback(); // Esegui la callback se supera tutti i controlli
  }

  //----------------

  // let lastDirection = null;
  // let isRotating = false; // Per prevenire animazioni multiple contemporaneamente

  // const observer = ScrollTrigger.observe({
  //   target: "#modules-section",
  //   type: "touch, pointer, wheel",
  //   enabled: false, // Disabilitato inizialmente
  //   debounce: true, // Minimizza il numero di eventi
  //   tolerance: 10,
  //   //preventDefault: true,
  //   wheelSpeed: 2,
  //   onUp: () => {
  //     if (lastDirection !== "up") {
  //       lastDirection = "up";
  //       isRotating = true;
  //       console.log("onUp_cw", lastDirection + "-" + isRotating);
  //       $gsap.to("#modules_svg", {
  //         rotate: "120_cw",
  //         duration: 0.5,
  //         ease: "power4.out",
  //         //overwrite: true,
  //         onComplete: () => {
  //           isRotating = false; // Abilita nuove animazioni
  //         },
  //       });
  //     }
  //   },
  //   onDown: () => {
  //     if (lastDirection !== "down") {
  //       lastDirection = "down";
  //       isRotating = true;
  //       console.log("OnDown_ccw");
  //       $gsap.to("#modules_svg", {
  //         rotate: "120_ccw",
  //         duration: 0.5,
  //         ease: "power4.out",
  //         //overwrite: true,
  //         onComplete: () => {
  //           isRotating = false; // Abilita nuove animazioni
  //         },
  //       });
  //     }
  //   },
  // });

  // const moduls_tl = $gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#modules-section", // Elemento che attiva l'animazione
  //     start: "top +=65", // Quando inizia l'animazione
  //     end: "bottom +=40", // Durata dello scroll
  //     scrub: true, // Sincronizzazione con lo scroll
  //     anticipatePin: 1,
  //     pin: true, // Fissa il contenitore #hero-section
  //     markers: true,
  //     onEnter: () => {
  //       console.log("Div bloccato DA SOTTO nella viewport, attivando osservazione...");
  //       observer.enable();
  //       lastDirection = null; // Resetta la direzione all'ingresso
  //     },
  //     onLeave: () => {
  //       console.log("Div sbloccato DA SOPRA e in uscita dall viewport");
  //       observer.disable();
  //     },
  //     onEnterBack: () => {
  //       //console.log("Div bloccato DA SOPRA nella viewport, attivando osservazione...");
  //       observer.enable();
  //       lastDirection = null; // Resetta la direzione all'ingresso
  //     },
  //     onLeaveBack: () => {
  //       //console.log("Div sbloccato DA SOTTO e in uscita dall viewport");
  //       observer.disable();
  //     },
  //     // snap: {
  //     //   snapTo: "labels",
  //     //   // snapTo: [0, 1, 2],
  //     //   directional: false,
  //     //   duration: 0.1,
  //     //   ease: "linear",
  //     // },
  //     // onSnapComplete: ({ progress, direction, isActive }) =>
  //     //   console.log(progress, direction, isActive),
  //   },
  // });

  // moduls_tl.to(
  //   "#modules_svg",
  //   {
  //     rotate: 120,
  //     duration: 1,
  //     ease: "power4.out",
  //   },
  //   1
  // );
  // moduls_tl.addLabel("rotationEnd1", 2);
  // moduls_tl.to(
  //   "#modules-content #module-txt_1",
  //   {
  //     opacity: 0,
  //     duration: 1.5, // Durata relativa nella timeline
  //     ease: "power1.out",
  //   },
  //   1
  // );
  // moduls_tl.to(
  //   "#modules-content #module-txt_2",
  //   {
  //     opacity: 1,
  //     duration: 1.5, // Durata relativa nella timeline
  //     ease: "power1.out",
  //   },
  //   1
  // );
  // moduls_tl.to(
  //   "#modules_svg",
  //   {
  //     rotate: 240,
  //     duration: 1,
  //     ease: "power4.out",
  //   },
  //   2
  // );
  // moduls_tl.addLabel("pseudoEnd2", 3);
  // moduls_tl.to(
  //   "#modules-content #module-txt_2",
  //   {
  //     opacity: 0,
  //     duration: 1.5, // Durata relativa nella timeline
  //     ease: "power1.out",
  //   },
  //   2
  // );
  // moduls_tl.to(
  //   "#modules-content #module-txt_3",
  //   {
  //     opacity: 1,
  //     duration: 1.5, // Durata relativa nella timeline
  //     ease: "power1.out",
  //   },
  //   2
  // );
  //ANCHOR - SVG ecosystem

  const phases_tl = $gsap.timeline({
    scrollTrigger: {
      trigger: "#phases-section", // Elemento che attiva l'animazione
      start: "top +=60", // Quando inizia l'animazione
      end: "bottom +=40", // Durata dello scroll
      scrub: true, // Sincronizzazione con lo scroll
      pin: true, // Fissa il contenitore #hero-section
      snap: {
        snapTo: "labels",
        duration: 0.1,
        ease: "linear",
      },
    },
  });

  phases_tl
    .to(
      "#m_100_circle_ecosys_0",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0
    )
    .from(
      "#Pre_txt",
      {
        autoAlpha: 0,
      },
      0
    )
    .to(
      "#m_100_circle_ecosys_1",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0.3
    )
    .from(
      "#Production_txt",
      {
        autoAlpha: 0,
      },
      0.3
    )
    .to(
      "#m_100_circle_ecosys_2",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0.6
    )
    .from(
      "#Post_txt",
      {
        autoAlpha: 0,
      },
      0.6
    )
    .to(
      "#m_100_circle_ecosys_3",
      {
        rotate: 360,
        ease: "linear",
        transformOrigin: "50% 50%",
      },
      0.9
    )
    .from(
      "#Market_txt",
      {
        autoAlpha: 0,
      },
      0.9
    );

  // $gsap.registerEffect({
  //   name: "phaseRotation",
  //   effect: (targets, config) => {
  //     return $gsap.to(targets, {
  //       rotate: 360,
  //       ease: config.ease,
  //       transformOrigin: "50% 50%",
  //       repeat: config.repeat,
  //       //duration: config.duration,
  //       //scrollTrigger: config.scrollTrigger,
  //       scrollTrigger: {
  //         trigger: "#phases-section",
  //         start: "top 80%",
  //         end: "bottom 500px",
  //         scrub: 1,
  //         markers: true,
  //         toggleActions: "resume pause resume pause",
  //       },
  //     });
  //   },
  //   defaults: {
  //     ease: "linear",
  //     //repeat: -1,
  //   },
  //   extendTimeline: false,
  // });

  // //Da continuare!!

  // $gsap.effects.phaseRotation("#m_100_circle_ecosys_0", { duration: 7.5 });
  // $gsap.effects.phaseRotation("#m_100_circle_ecosys_1", { duration: 8.5 });
  // $gsap.effects.phaseRotation("#m_100_circle_ecosys_2", { duration: 7.8 });
  // $gsap.effects.phaseRotation("#m_100_circle_ecosys_3", { duration: 9.5 });
});
</script>

<style></style>
