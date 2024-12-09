<template>
  <div class="py-5 px-16 max-w-[1920px] mx-auto">
    <h1>Modali test</h1>
    <p class="text-xl">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse suscipit quos nisi
      accusantium ad. Iure tenetur itaque saepe veritatis soluta, dicta, ipsa ab ea
      officia ducimus doloribus blanditiis a odio. <br />Lorem ipsum dolor, sit amet
      consectetur adipisicing elit. Esse suscipit quos nisi accusantium ad. Iure tenetur
      itaque saepe veritatis soluta, dicta, ipsa ab ea officia ducimus doloribus
      blanditiis a odio.
      <span>
        <button @click="openModal" class="bg-slate-800 text-orange-500 px-3">
          Focus
        </button>
      </span>
    </p>
    <p class="text-xl">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse suscipit quos nisi
      accusantium ad. Iure tenetur itaque saepe veritatis soluta, dicta, ipsa ab ea
      officia ducimus doloribus blanditiis a odio.
    </p>
    <dialog
      id="mioModale"
      class="bg-slate-500"
      ref="myModal"
      :class="{ horizontal: !isPortrait }"
    >
      <!-- aggiungo una classe dinamica horizontal che viene aggiunta quando la viewport non è portrait -->

      <div ref="modalContent" class="modal-content" id="m-content">
        <button
          @click="closeModal"
          class="modal-x-btn bg-orange-500 rounded-full absolute top-[20px] left-[20px] w-9 h-9 flex items-center justify-center"
        >
          <UIcon name="i-heroicons-x-mark" class="text-woodsmoke-950 w-5 h-5"></UIcon>
        </button>
        <svg width="100" height="100">
          <circle id="x-circle" cx="38" cy="38" r="17" stroke-width="0" fill="#ffffff" />
        </svg>
        <div ref="modalInner" class="modal-inner">
          <p class="modal-block">
            Corpo del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
          <NuxtImg
            class="modal-block"
            src="assets/img/mia2023-mnemonica.jpg"
            sizes="600px"
          ></NuxtImg>
          <p class="modal-block">
            Blocco 1 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
          <div class="modal-block min-w-80">
            <h1>Titolo blocco 3</h1>
            <h3>
              Blocco 2 del modale, Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Eligendi, earum facilis labore voluptatum nemo optio iste voluptates,
              ducimus quas autem atque! Aspernatur temporibus fuga assumenda! Impedit
              neque amet perspiciatis deleniti.
            </h3>
          </div>
          <p class="modal-block">
            Blocco 3 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
          <p class="modal-block">
            Blocco 4 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
          <p class="modal-block">
            Blocco 5 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
          <p class="modal-block">
            Blocco 6 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { gsap } from "gsap/gsap-core";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useWindowSize } from "@vueuse/core";

gsap.registerPlugin(ScrollToPlugin);

const myModal = ref(null);
const modalContent = ref(null);
const modalInner = ref(null);
const { width, height } = useWindowSize();

//controllo il rapporto tra altezza e larghezza della viewport
const isPortrait = computed(() => {
  return height.value > width.value;
});

//imposto le props da passare in base al rapporto della viewport
//creo la funzione (freccia) AnimationProps che passerà isOpening come come parametro booleano che indica se il modale si sta aprendo (true) o chiudendo (false)
const AnimationProps = (isOpening) => {
  //se isPortait è valido
  if (isPortrait.value) {
    // Entrata dal basso per orientamento verticale
    return {
      y: isOpening ? "100%" : "100%", //isOpening true = si sta aprendo e y sarà 100, se è false si sta chiudendo quindi y sarà 0
      x: "0%",
      opacity: 0,
    };
  } else {
    // Entrata da destra per orientamento orizzontale, in questo caso usiamo la x
    return {
      x: isOpening ? "100%" : "100%",
      y: "0%",
      opacity: 0,
    };
  }
};
//i valori di questa funzione x,y,opacity vengono passati a gsap per l'animazione

//apro il modale
const openModal = () => {
  //myModal.value.showModal();
  //prendo i valori delle props dalla funzione AnimationProps passando isOpening=true
  const { x, y, opacity } = AnimationProps(true);
  //le passo a gsap
  gsap.fromTo(
    myModal.value,
    { opacity, x, y },
    { opacity: 1, x: "0%", y: "0%", duration: 0.5, ease: "power2.out" }
  );
};
//chiudo il modale
const closeModal = () => {
  const { x, y, opacity } = AnimationProps(false); //passiamo isOpening = false
  gsap.to(myModal.value, {
    opacity,
    x,
    y,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => myModal.value.close(),
  });
};

const handleScroll = (event) => {
  if (!isPortrait.value) {
    event.preventDefault();
    gsap.to(modalInner.value, {
      scrollTo: {
        x: modalInner.value.scrollLeft + event.deltaY * 6,
      },
      ease: "power2",
      duration: 0.5,
    });
  }
};

onMounted(() => {
  //metto in pausa l'animazione di apertura del modale
  gsap
    .fromTo(
      myModal.value,
      { opacity: 0, x: "100%", y: "100%" },
      { opacity: 1, x: "0%", y: "0%", duration: 0.5, ease: "power2.out" }
    )
    .pause();

  modalInner.value.addEventListener("wheel", handleScroll, { passive: false });

  const cClose = document.querySelector(".modal-x-btn");

  const animation = gsap.fromTo(
    "#x-circle",
    { opacity: 0, scale: 1, transformOrigin: "58% 50%", rotate: 0 },
    {
      scale: 1.3,
      opacity: 0.3,
      rotate: 360,
      duration: 0.3,
      ease: "power2",
      transformOrigin: "58% 50%",
      // repeat: -1,
      // yoyo: true,
    }
  );

  animation.pause();

  cClose.addEventListener("mouseenter", () => animation.play());
  cClose.addEventListener("mouseleave", () => animation.reverse());
});

onBeforeUnmount(() => {
  modalInner.value.removeEventListener("wheel", handleScroll);
});
</script>

<style>
dialog {
  max-width: none;
  max-height: none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 9999999999;
}
.modal-content {
  height: 100%;
}
.modal-inner {
  padding: 80px 3% 20px 3%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  white-space: normal;
}
.modal-inner .modal-block {
  margin-bottom: 4%;
}

.horizontal .modal-inner {
  flex-direction: row;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  padding-left: 60px;
}

.modal-inner p {
  font-size: 30px;
  line-height: 45px;
  color: black;
}
.horizontal .modal-inner .modal-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  text-wrap: wrap;
}
.horizontal .modal-inner p.modal-block {
  min-width: 400px;
  height: 100%;
}
</style>
