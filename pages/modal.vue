<template>
  <div>
    <h1>Modali test</h1>
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
          class="bg-orange-500 rounded-full absolute top-[20px] left-[20px] w-9 h-9 flex items-center justify-center"
        >
          <UIcon name="i-heroicons-x-mark" class="text-woodsmoke-950 w-5 h-5"></UIcon>
        </button>
        <div ref="modalInner" class="modal-inner">
          <p class="modal-block">
            Corpo del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
          <p class="modal-block">
            Blocco 1 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
          </p>
          <div class="modal-block">
            <h1>Titolo blocco 3</h1>
            Blocco 2 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
            quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
            perspiciatis deleniti.
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
    <button @click="openModal" class="bg-orange-500 rounded-2xl text-gray-900 p-2">
      show the modal
    </button>
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

//controllo il rapporto tra altezza e larghezza della viewport
// const isPortrait = computed(() => {
//   return window.innerHeight > window.innerWidth;
// });

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
//i valori di questa funzione x,y,opacity vengono passati a gisap per l'animazione

//apro il modale
const openModal = () => {
  myModal.value.showModal();
  //prendo i valori delle props dalla funzione AnimationProps passando idOpening=true
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
  modalInner.value.addEventListener("wheel", handleScroll, { passive: false });
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
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  white-space: normal;
}

.horizontal .modal-inner {
  flex-direction: row;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
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
  min-width: 400px;
  height: 100%;
  margin-right: 20px;
  text-wrap: wrap;
}
</style>
