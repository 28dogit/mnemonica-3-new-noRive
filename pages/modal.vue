<template>
  <div>
    <h1>Modali test</h1>
    <dialog
      id="mioModale"
      class="bg-slate-500 pt-[150px]"
      ref="myModal"
      :class="{ horizontal: !isPortrait }"
    >
      <!-- aggiungo una classe dinamica horizontal che viene aggiunta quando la viewport non è portrait -->
      <h1>
        <Title>Titolo dell modale</Title>
        <p>
          Corpo del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <button @click="closeModal">chiudi X</button>
        <p>
          Blocco 1 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p>
          Blocco 2 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p>
          Blocco 3 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p>
          Blocco 4 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p>
          Blocco 5 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
        <p>
          Blocco 6 del modale, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi, earum facilis labore voluptatum nemo optio iste voluptates, ducimus
          quas autem atque! Aspernatur temporibus fuga assumenda! Impedit neque amet
          perspiciatis deleniti.
        </p>
      </h1>
    </dialog>
    <button @click="openModal" class="bg-slate-500 rounded-2xl text-gray-900 p-2">
      show the modal
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { gsap } from "gsap/gsap-core";
import { useWindowSize } from "@vueuse/core";

const myModal = ref(null); //imposto la ref
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

onMounted(() => {
  // Aggiorna isPortrait quando la finestra viene ridimensionata
  // window.addEventListener("resize", () => {
  //   isPortrait.value = window.innerHeight > window.innerWidth;
  // });
});
</script>

<style>
dialog {
  max-width: none;
  max-height: none;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
dialog p {
  font-size: 30px;
  line-height: 45px;
}
</style>
