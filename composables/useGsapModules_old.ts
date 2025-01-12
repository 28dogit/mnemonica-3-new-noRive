import { useNuxtApp } from "#app";

export const useGsapModules_old=()=>{

    //const {$gsap} = useNuxtApp();
    const { $gsap } = useNuxtApp();

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

        const modules_tl = $gsap.timeline({paused: true});

        const modules_st = ScrollTrigger.create({
          animation: modules_tl,
          trigger: "#modules-section", // Elemento che attiva l'animazione
          //start: "top +=75", // Quando inizia l'animazione
          start: isTabletUp ? "center center" : "top +=75", // Quando inizia l'animazione
          end: "+=2000", // allungata la fine per rendere lo scroll più lento
          //scrub: true, // Sincronizzazione con lo scroll
          anticipatePin: 1,
          pin: true, // Fissa il contenitore #hero-section
          //markers: true,
          // snap: {
          //   snapTo: 1 / 3,
          //   //snapTo: (progress) => Math.round(progress * 3) / 3, // Aggancia a ogni 1/3 di progresso (120 gradi)
          //   duration: 2.5,
          //   ease: "back.out",
          // },
          // onSnapComplete: ({ progress, direction, isActive }) =>
          //   console.log(progress, direction, isActive),
        });

        //modules_tl.set("#ghirlandeContainer", { filter: "blur(10px)" });
        modules_tl.from(".ghirlanda-updx, .ghirlanda-dwsx ", {
          autoAlpha: 0,
          filter: "blur(5px)",
        });
        modules_tl.to("#Modules_3a #Rooms path", {
          fill: "#CEF372",
        });
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
      }
    );

  return modules_tl;

}