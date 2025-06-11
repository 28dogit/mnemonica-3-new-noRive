/**
 * Composable per la gestione della navigazione tramite swipe verticale e scroll
 * Basato sulla logica implementata in touch_4a_y.vue
 */
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useNuxtApp } from '#app';

export const useSwipeNavigation = (options = {}) => {
  // Opzioni configurabili con valori predefiniti
  const {
    maxSteps = 3,                // Numero massimo di step disponibili
    initialStep = 0,             // Step iniziale
    touchThreshold = 25,         // Soglia minima per considerare uno swipe valido
    scrollThreshold = 10,        // Soglia per il deltaY dello scroll
    scrollCooldown = 500,        // Tempo di attesa tra eventi di scroll
    animationDuration = 600,     // Durata dell'animazione
    preventDefaultScroll = true, // Se prevenire lo scroll predefinito
    reverseDirection = false,    // Inverte la direzione (true: giù=avanti, su=indietro)
    onStepChange = null,         // Callback quando cambia lo step
    onAnimationComplete = null   // Callback quando l'animazione è completata
  } = options;

  // Stato dell'applicazione
  const currentStep = ref(initialStep);
  const isAnimating = ref(false);
  const lastScrollTime = ref(0);
  
  // Variabili per il touch
  const touchStartY = ref(0);
  const touchEndY = ref(0);
  const isTouchDevice = ref(false);
  
  // Riferimenti agli elementi DOM
  const containerRef = ref(null);
  
  // Determina se siamo in ambiente client
  const isClient = ref(typeof window !== 'undefined');

  // Gestione eventi touch
  const handleTouchStart = (event) => {
    touchStartY.value = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (preventDefaultScroll) {
      event.preventDefault(); // Blocca lo scroll del browser
    }
    touchEndY.value = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    // Se è in corso un'animazione, ignora l'evento
    if (isAnimating.value) return;

    const swipeDistance = touchEndY.value - touchStartY.value;

    if (Math.abs(swipeDistance) > touchThreshold) {
      if ((swipeDistance > 0 && !reverseDirection) || (swipeDistance < 0 && reverseDirection)) {
        // Swipe verso il basso (precedente)
        goToPrevStep();
      } else {
        // Swipe verso l'alto (successivo)
        goToNextStep();
      }
    }
  };

  // Gestione evento scroll con throttle
  const handleScroll = (event) => {
    if (preventDefaultScroll) {
      event.preventDefault(); // Previeni lo scroll della pagina
    }

    // Implementazione di throttle per gli eventi di scroll
    const now = Date.now();
    if (isAnimating.value || now - lastScrollTime.value < scrollCooldown) {
      return;
    }

    lastScrollTime.value = now;

    // Ignora movimenti troppo piccoli (per Magic Mouse)
    if (Math.abs(event.deltaY) < scrollThreshold) {
      return;
    }

    if ((event.deltaY > 0 && !reverseDirection) || (event.deltaY < 0 && reverseDirection)) {
      // Scroll verso il basso (successivo con direzione normale)
      goToNextStep();
    } else {
      // Scroll verso l'alto (precedente con direzione normale)
      goToPrevStep();
    }
  };

  // Funzioni per navigare tra gli step
  const goToNextStep = () => {
    if (currentStep.value < maxSteps - 1 && !isAnimating.value) {
      isAnimating.value = true;
      currentStep.value++;
      
      // Esegui callback se fornita
      if (typeof onStepChange === 'function') {
        onStepChange(currentStep.value);
      }

      // Reset del flag di animazione dopo il completamento
      setTimeout(() => {
        isAnimating.value = false;
        if (typeof onAnimationComplete === 'function') {
          onAnimationComplete(currentStep.value);
        }
      }, animationDuration);
      
      return true;
    }
    return false;
  };

  const goToPrevStep = () => {
    if (currentStep.value > 0 && !isAnimating.value) {
      isAnimating.value = true;
      currentStep.value--;
      
      // Esegui callback se fornita
      if (typeof onStepChange === 'function') {
        onStepChange(currentStep.value);
      }

      // Reset del flag di animazione dopo il completamento
      setTimeout(() => {
        isAnimating.value = false;
        if (typeof onAnimationComplete === 'function') {
          onAnimationComplete(currentStep.value);
        }
      }, animationDuration);
      
      return true;
    }
    return false;
  };

  // Vai a uno step specifico
  const goToStep = (step) => {
    if (step >= 0 && step < maxSteps && !isAnimating.value && step !== currentStep.value) {
      isAnimating.value = true;
      currentStep.value = step;
      
      // Esegui callback se fornita
      if (typeof onStepChange === 'function') {
        onStepChange(currentStep.value);
      }

      // Reset del flag di animazione dopo il completamento
      setTimeout(() => {
        isAnimating.value = false;
        if (typeof onAnimationComplete === 'function') {
          onAnimationComplete(currentStep.value);
        }
      }, animationDuration);
      
      return true;
    }
    return false;
  };

  // Funzione per collegare gli eventi a un container
  const bindEvents = (container) => {
    if (!container) return;
    
    containerRef.value = container;
    
    // Aggiungi gli event listener
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: !preventDefaultScroll });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('wheel', handleScroll, { passive: !preventDefaultScroll });
  };

  // Funzione per rimuovere gli event listener
  const unbindEvents = () => {
    if (!containerRef.value) return;
    
    containerRef.value.removeEventListener('touchstart', handleTouchStart);
    containerRef.value.removeEventListener('touchmove', handleTouchMove);
    containerRef.value.removeEventListener('touchend', handleTouchEnd);
    containerRef.value.removeEventListener('wheel', handleScroll);
    
    containerRef.value = null;
  };

  // Rileva se il dispositivo supporta eventi touch
  const detectTouchDevice = () => {
    if (typeof window !== 'undefined') {
      isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return isTouchDevice.value;
    }
    return false;
  };

  onMounted(() => {
    isClient.value = true;
    detectTouchDevice();
  });

  onBeforeUnmount(() => {
    unbindEvents();
  });

  return {
    // Stato
    currentStep,
    isAnimating,
    isTouchDevice,
    isClient,
    
    // Metodi di navigazione
    goToNextStep,
    goToPrevStep,
    goToStep,
    
    // Gestione eventi
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleScroll,
    bindEvents,
    unbindEvents,
    detectTouchDevice
  };
};