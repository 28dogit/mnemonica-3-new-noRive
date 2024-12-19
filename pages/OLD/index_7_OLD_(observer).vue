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

  ///ANCHOR - Modules section

  //dichiarazione delle variabili per la gestione del modulo
  let animating;
  let m_txt = $gsap.utils.toArray(".module_txt");
  let wrap_txt = $gsap.utils.wrap(0, m_txt.length);
  let lastEventTime = 0; // Per gestire il debounce
  let currentIndex = 1; // Variabile per tenere traccia dell'indice corrente

  function gotoSection(val, dir) {
    animating = true;
    // index = wrap_txt(index);
    let tl = $gsap.timeline({
      defaults: { duration: 0.25, ease: "back.out" },
      onComplete: () => (animating = false),
    });
    tl.to("#modules_svg", {
      rotate: `${dir}=${val}`,
      onComplete: () => {
        console.log("ciao", m_txt[index]);
      },
    });
    tl.to(`#module-txt_${currentIndex}`, {
      autoAlpha: 0,
    });
    tl.to(`#module-txt_${currentIndex + 1}`, {
      autoAlpha: 1,
    });

    //currentIndex++; // Incrementa l'indice corrente
    //currentIndex += dir === "+" ? 1 : -1; // Incrementa o decrementa l'indice corrente
    if (dir === "+" && currentIndex < 3) {
      currentIndex += 1;
    } else if (dir === "-" && currentIndex > 1) {
      currentIndex -= 1;
    }
  }

  // Configura ScrollTrigger per bloccare il div nella viewport
  ScrollTrigger.create({
    trigger: "#modules-section",
    start: "top +=65", // Quando inizia l'animazione
    //end: "bottom +=40", // Durata dello scroll
    end: "+=700", // Durata dello scroll
    pin: true, // Blocca il div nella viewport
    onEnter: () => enableObserver(),
    onLeave: () => disableObserver(),
    onEnterBack: () => enableObserver(),
    onLeaveBack: () => disableObserver(),
    markers: true, // Marker per debug, rimuovere in produzione
  });

  let observerInstance = Observer.create({
    type: "wheel,touch,scroll,pointer",
    target: "#modules-element",
    wheelSpeed: 0.5,
    tolerance: 10,
    preventDefault: true,
    debounce: true,
    // onUp: () => !animating && gotoSection(1, 120, "-"),
    // onDown: () => !animating && gotoSection(1, 120, "+"),
    onUp: (event) => {
      handleMomentum(event, () => !animating && gotoSection(120, "-"));
    },
    onDown: (event) => {
      handleMomentum(event, () => !animating && gotoSection(120, "+"));
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

  //ANCHOR - Phases Section

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
});
</script>

<style></style>
