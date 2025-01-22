import { useNuxtApp } from "#app";

export const useGsapModules_old=()=>{
  if (import.meta.env.SSR) return { modules_tl: null, getScrollTrigger: null, mm: null };

  const { $gsap } = useNuxtApp();

  if (!$gsap) {
    console.error('GSAP is not available.');
    return { modules_tl: null, getScrollTrigger: null, mm: null };
  }

  const mm = $gsap.matchMedia();

  //dichiaro la timeline fuori da mm in modo da esporla fuori dalla funzione stessa cosa per onComplete
  let modules_tl: gsap.core.Timeline | null = null;
  let onCompleteCallback: (() => void) | null = null; // Callback per onComplete della timeline
  let onEnterCallback: (() => void) | null = null; // Callback per onEnter dello scrollTrigger
  let onEnterBackCallback: (() => void) | null = null; // Callback per onEnter Back dello scrollTrigger

  mm.add(
    //aggiungo una o più media query (conditions)
    {
      isMobile: "(max-width: 575px)",
      isTabletUp: "(min-width: 576px)",
    },
    (context) => {
      //definisco il contesto in cui applicare le condizioni
      //const { isTabletUp, isMobile } = context.conditions;
      // Tipizzo manualmente le condizioni
      const conditions = context.conditions as {
        isMobile: boolean;
        isTabletUp: boolean;
      };
      
      modules_tl = $gsap.timeline({
        //paused:true,
        scrollTrigger: {
          trigger: "#modules-section", // Elemento che attiva l'animazione
          //invalidateOnRefresh: false, // evita di resttare i valori al disable (mantengo così le ghirlande visibili dopo il disable)
          start: conditions.isTabletUp ? "center center" : "top +=75", // Quando inizia l'animazione
          end: "+=4000", // allungata la fine per rendere lo scroll più lento
          scrub: 2, // Sincronizzazione con lo scroll
          //markers: true,
          snap:{
            snapTo:1/4,
            duration: 0.5,
            ease: "back.out",
          },
          // snap: {
          //   snapTo: 1 / 3,
          //   //snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
          //   duration: 2.5,
          //   ease: "back.out",
          // },
          onEnter(){
            console.log("composables entrato");
            if (onEnterCallback) {
              onEnterCallback(); // Esegue la callback se definita
            }
          },
          onEnterBack(){
            console.log("composables entrato back");
            if (onEnterBackCallback) {
              onEnterBackCallback(); // Esegue la callback se definita
            }
          },
        },
        onComplete() {
          console.log("modules_tl è stata eseguita tutta");
          if (onCompleteCallback) {
            onCompleteCallback(); // Esegue la callback se definita
          }
        },
      });
      //modules_tl.set("body", { overflow: "hidden" });
      modules_tl.set("#module-txt_1 .focusWrapper .focusTxt",{opacity: 0});
        modules_tl.to(".ghirlanda-updx, .ghirlanda-dwsx ", {
          opacity: 0.6,
          filter: "blur(0px)",
        });
        modules_tl.to("#Modules_3a #Rooms path", {
          fill: "#CEF372",
        },"<");
        modules_tl.from(
          "#module-txt_1 .focusWrapper .focusBtn",
          {
            // justifyContent: "flex-end",
            x: "-90",
            color: "#CEF372",
          },
          "<"
        );
        modules_tl.to(
          "#module-txt_1 .focusWrapper .focusTxt",
          {
            // justifyContent: "flex-end",
            opacity: 1,
          },
          "< +=0.3"
        );
        //fine primo step
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
        //fine secondo step
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
        //fine terzo step
        modules_tl.to(
          "#Modules_3a #Masters path",
          {
            fill: "#B8EFFA",
          },
          3
        );



    });

    // Funzione per impostare una callback per onComplete
  const setOnComplete = (callback: () => void) => {
    onCompleteCallback = callback;
  };
  const setOnEnter = (callback: () => void) => {
    onEnterCallback = callback;
  };
  const setOnEnterBack = (callback: () => void) => {
    onEnterBackCallback = callback;
  };


        // Funzione per accedere allo ScrollTrigger della timeline
  const getScrollTrigger = () => modules_tl?.scrollTrigger || null;

  return { modules_tl, getScrollTrigger, setOnEnter, setOnComplete, setOnEnterBack, };
  //return { modules_tl, getScrollTrigger , setOnComplete, setOnEnter, setOnLeave };
}