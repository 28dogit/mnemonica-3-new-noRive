# Composables Mnemonica

## useSwipeNavigation

Un composable per gestire la navigazione tramite swipe verticale e scroll, ideale per presentazioni, slider e interfacce a step.

### Caratteristiche

- Gestione degli eventi touch (swipe verticale) e scroll
- Throttling degli eventi per prestazioni ottimali
- Supporto per la navigazione tramite pulsanti
- Configurabile con numerose opzioni
- Rilevamento automatico del tipo di dispositivo (touch o desktop)
- Callback per eventi di cambio step e completamento animazione

### Installazione

Il composable è già incluso nel progetto nella cartella `composables`.

### Utilizzo base

```javascript
<script setup>
import { ref, onMounted } from 'vue';
import { useSwipeNavigation } from '~/composables/useSwipeNavigation';

// Riferimento al container
const container = ref(null);

// Inizializza il composable
const {
  currentStep,
  isAnimating,
  isTouchDevice,
  goToNextStep,
  goToPrevStep,
  goToStep,
  bindEvents
} = useSwipeNavigation({
  maxSteps: 5,               // Numero totale di step
  onStepChange: (step) => {
    // Esegui animazioni o aggiorna UI quando cambia lo step
    console.log(`Passato allo step ${step}`);
  }
});

onMounted(() => {
  // Collega gli eventi al container
  if (container.value) {
    bindEvents(container.value);
  }
});
</script>

<template>
  <div ref="container" class="swipe-container">
    <!-- Contenuto navigabile -->
    <div v-for="index in 5" :key="index" v-show="currentStep === index - 1">
      Contenuto dello step {{ index }}
    </div>
    
    <!-- Controlli di navigazione -->
    <div class="navigation-controls">
      <button @click="goToPrevStep" :disabled="currentStep === 0">Precedente</button>
      <button @click="goToNextStep" :disabled="currentStep === 4">Successivo</button>
    </div>
  </div>
</template>
```

### Opzioni

Il composable accetta un oggetto di opzioni con i seguenti parametri:

| Opzione | Tipo | Default | Descrizione |
|---------|------|---------|-------------|
| `maxSteps` | Number | 3 | Numero massimo di step disponibili |
| `initialStep` | Number | 0 | Step iniziale (0-based) |
| `touchThreshold` | Number | 25 | Soglia minima in pixel per considerare uno swipe valido |
| `scrollThreshold` | Number | 10 | Soglia per il deltaY dello scroll |
| `scrollCooldown` | Number | 500 | Tempo di attesa in ms tra eventi di scroll |
| `animationDuration` | Number | 600 | Durata dell'animazione in ms |
| `preventDefaultScroll` | Boolean | true | Se prevenire lo scroll predefinito del browser |
| `reverseDirection` | Boolean | false | Inverte la direzione (true: giù=avanti, su=indietro) |
| `onStepChange` | Function | null | Callback quando cambia lo step |
| `onAnimationComplete` | Function | null | Callback quando l'animazione è completata |

### API

Il composable restituisce un oggetto con le seguenti proprietà e metodi:

#### Proprietà

- `currentStep`: Ref con l'indice dello step corrente (0-based)
- `isAnimating`: Ref che indica se è in corso un'animazione
- `isTouchDevice`: Ref che indica se il dispositivo supporta eventi touch
- `isClient`: Ref che indica se siamo in ambiente client

#### Metodi

- `goToNextStep()`: Passa allo step successivo
- `goToPrevStep()`: Passa allo step precedente
- `goToStep(step)`: Passa a uno step specifico
- `bindEvents(container)`: Collega gli eventi a un elemento DOM
- `unbindEvents()`: Rimuove gli event listener
- `detectTouchDevice()`: Rileva se il dispositivo supporta eventi touch
- `handleTouchStart(event)`: Gestisce l'evento touchstart
- `handleTouchMove(event)`: Gestisce l'evento touchmove
- `handleTouchEnd(event)`: Gestisce l'evento touchend
- `handleScroll(event)`: Gestisce l'evento wheel

### Esempio completo

Vedi il file `pages/swipe-navigation-demo.vue` per un esempio completo di utilizzo del composable con animazioni GSAP.

### Note

- Assicurati di chiamare `bindEvents` in `onMounted` per collegare gli eventi al container
- Gli event listener vengono rimossi automaticamente in `onBeforeUnmount`
- Per prevenire lo scroll del browser, imposta `preventDefaultScroll: true` (default)
- Per dispositivi touch, considera di aggiungere `touch-action: none` al container CSS