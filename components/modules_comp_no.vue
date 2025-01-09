<template>
  <!-- //SECTION - TEMPLATE -->
  <div id="modules-element" class="element">
    <Modules id="modules_svg"></Modules>
    <p id="allinOne">All in One</p>
  </div>
  <div id="modules-content-wrapper" class="wrapper">
    <div id="modules-content" class="content">
      <div id="moduleRooms" class="module_content">
        <h2 class="mTitle">Screening Rooms</h2>
        <h3 class="mSubTitle">streaming and discussion</h3>
        <button @click="isModalOpen1 = true">
          <FocusBTN></FocusBTN>
        </button>
      </div>
      <div id="moduleBoxes" class="module_content">
        <h2 class="mTitle">Sharing Boxes</h2>
        <h3 class="mSubTitle">data transfer</h3>
        <button @click="isModalOpen2 = true">
          <FocusBTN></FocusBTN>
        </button>
      </div>
      <div id="moduleMasters" class="module_content">
        <h2 class="mTitle">HQ Masters</h2>
        <h3 class="mSubTitle">perennial availability</h3>
        <button @click="isModalOpen3 = true">
          <FocusBTN></FocusBTN>
        </button>
      </div>

      <div id="module-txt_1" class="module_card">
        <div class="module_title">
          <h2>Rooms</h2>
          <button @click="isModalOpen1 = true">
            <span class="focus">+</span>
          </button>
        </div>
        <p>
          Leave folders behind. Experience active workspaces that free you from repetitive
          tasks encoding, watermarking, keeping everyone updated. Enjoy private places
          where people meet around media, playlists are a given, content is easy to find
          and move.
        </p>
      </div>
      <div id="module-txt_2" class="module_card">
        <div class="module_title">
          <h2>Boxes</h2>
          <button @click="isModalOpen2 = true">
            <span class="focus">+</span>
          </button>
        </div>
        <p>
          Forget hard drives and LTOs. Welcome to the most advanced and reliable solution
          for long-term preservation of digital film works that also keeps them always
          available for business opportunities and cultural outreach. Arrange immediate
          screenings with integrated Rooms, easily retrieve relevant assets, securely
          deliver to stakeholders.
        </p>
      </div>
      <div id="module-txt_3" class="module_card">
        <div class="module_title">
          <h2>Masters</h2>
          <button @click="isModalOpen3 = true">
            <span class="focus">+</span>
          </button>
        </div>
        <p>
          Get rid of third-party shuttles. With the built-in data exchange facility, you
          can send & receive files and folders of any size and complexity directly from/to
          Rooms, as well as local drives. Only between registered users, without leaving
          Mnemonica safe walls.
        </p>
      </div>
    </div>
  </div>
  <FocusRooms :isOpen="isModalOpen1" @close="closeModal" />
  <FocusBoxes :isOpen="isModalOpen2" @close="closeModal" />
  <FocusMasters :isOpen="isModalOpen3" @close="closeModal" />
  <!-- //!SECTION -->
</template>

<script setup>
// SECTION - SCRIPT
//le altre importazioni derivano dalla pagina principale
import { _zIndex } from "#tailwind-config/theme";
import { nextTick } from "vue";

const isModalOpen1 = ref(false);
const isModalOpen2 = ref(false);
const isModalOpen3 = ref(false);

const closeModal = () => {
  isModalOpen1.value = false;
  isModalOpen2.value = false;
  isModalOpen3.value = false;
};

onMounted(() => {
  const { $gsap } = useNuxtApp();
  nextTick(() => {
    //console.log("ModulesComp nexttick mounted");
    // $gsap.to("#allinOne", {
    //   textShadow: `0 0 7px rgba(184, 239, 250, 0.1), 0 0 10px rgba(184, 239, 250, 0.1), 0 0 22px rgba(184, 239, 250, 0.1)`,
    //   duration: 1.2,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "linear",
    // });

    let mm = $gsap.matchMedia(); // Creo un'istanza matchMedia per gestire lo start dello scrollTrigger
    mm.add(
      //aggiungo una o più media query (conditions)
      {
        isMobile: "(max-width: 575px)",
        isTabletUp: "(min-width: 576px)",
      },
      (context) => {
        //definisco il contesto in cui applicare le condizioni
        let { isTabletUp, isMobile } = context.conditions;
        //NOTE - inserisco la logica dell'animazione gsap nel context per poter utilizzare le condizioni isTabletUp e isMobile
        const modules_tl = $gsap.timeline({
          scrollTrigger: {
            trigger: "#modules-section", // Elemento che attiva l'animazione
            //start: "top +=75", // Quando inizia l'animazione
            start: isTabletUp ? "center center" : "top +=75", // Quando inizia l'animazione
            end: "+=2000", // allungata la fine per rendere lo scroll più lento
            scrub: true, // Sincronizzazione con lo scroll
            anticipatePin: 1,
            pin: true, // Fissa il contenitore #hero-section
            //markers: true,
            snap: {
              snapTo: 1 / 3,
              //snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
              duration: 0.5,
              ease: "back.out",
            },
            // onSnapComplete: ({ progress, direction, isActive }) =>
            //   console.log(progress, direction, isActive),
          },
        });
        //modules_tl.set("#ghirlandeContainer", { filter: "blur(10px)" });
        modules_tl.from(".ghirlanda-updx, .ghirlanda-dwsx ", {
          autoAlpha: 0,
          filter: "blur(5px)",
        });
        modules_tl.to("#Modules_3a #Rooms path", {
          fill: "#CEF372",
        });
        modules_tl.to(
          "#modules_svg",
          {
            rotate: 120,
          },
          1
        );
        modules_tl.to(
          "#Modules_3a #Rooms path",
          {
            fill: "#B8EFFA",
          },
          1
        );
        modules_tl.from(
          ".focusWrapper .focusBtn",
          {
            // justifyContent: "flex-end",
            x: "-90",
          },
          "<"
        );
        modules_tl.to(
          ".focusWrapper .focusTxt",
          {
            // justifyContent: "flex-end",
            opacity: 1,
          },
          "< +=0.3"
        );
        modules_tl.to(
          "#Modules_3a #Boxes path",
          {
            fill: "#CEF372",
          },
          1
        );
        modules_tl.set(
          "#modules-content #module-txt_1",
          {
            zIndex: 0,
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
        modules_tl.set(
          "#modules-content #module-txt_2",
          {
            zIndex: 110,
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
          "#Modules_3a #Boxes path",
          {
            fill: "#B8EFFA",
          },
          2
        );
        modules_tl.to(
          "#Modules_3a #Masters path",
          {
            fill: "#CEF372",
          },
          2
        );
        modules_tl.set(
          "#modules-content #module-txt_2",
          {
            zIndex: 0,
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
        modules_tl.set(
          "#modules-content #module-txt_3",
          {
            zIndex: 110,
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
      } //NOTE - end context
    ); //NOTE - end mm.add
  }); //NOTE - end nextTick
}); //NOTE - end onMounted
//!SECTION
</script>

<style lang="scss" scoped>
//SECTION - SCSS
@use "@/assets/css/_globals.scss" as *;
@use "@/assets/css/_breakpoints.scss" as bp;

#modules-section {
  #modules-element {
    overflow: hidden;
  }
  #modules_svg {
    width: 95%;
    position: absolute;
  }
  #modules-content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    @include bp.for-tablet-up {
      align-items: center;
    }
  }
  #allinOne {
    color: #fff;
    font-size: 1.3rem;
    margin-bottom: 0;
    text-shadow: 0 0 7px rgba(184, 239, 250, 1), 0 0 10px rgba(184, 239, 250, 1),
      0 0 22px rgba(184, 239, 250, 1);
  }
  .module_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .mTitle {
      color: $mne_text-on-dark;
    }
    .mSubTitle {
      color: $mne_secondary;
      font-weight: 300;
    }
  }

  #moduleRooms {
    display: none;
    opacity: 1;
    z-index: 110;
  }
  #moduleBoxes {
    display: none;
    opacity: 0;
  }
  #moduleMasters {
    display: none;
    opacity: 0;
  }

  .module_content {
    z-index: 100;
    position: absolute;
    border-radius: 10px;
    border: 2px solid rgba(225, 225, 225, 0.1);
    text-align: left;
    padding: 10px;
    width: 90%;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 42px rgba(184, 239, 250, 0.1);
    h2,
    p {
      text-align: left;
    }
    @include bp.for-tablet-up {
      width: 50%;
    }
  }

  // .module_card {
  //   z-index: 100;
  //   position: absolute;
  //   border-radius: 10px;
  //   border: 2px solid rgba(225, 225, 225, 0.1);
  //   text-align: left;
  //   padding: 10px;
  //   width: 90%;
  //   backdrop-filter: blur(5px);
  //   box-shadow: 0 0 42px rgba(184, 239, 250, 0.1);
  //   h2,
  //   p {
  //     text-align: left;
  //   }
  //   @include bp.for-tablet-up {
  //     width: 50%;
  //   }
  // }
  // .module_title {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   margin-bottom: 1rem;
  //   span {
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     font-size: 1.5rem;
  //     //color: #cef372;
  //     color: $mne_secondary;
  //     margin: 0;
  //     background-color: $gradient_4;
  //     width: 30px;
  //     height: 30px;
  //     border-radius: 15px;
  //   }
  // }
}
//!SECTION
</style>
