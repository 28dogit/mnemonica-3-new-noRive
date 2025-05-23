# Generazione Selettiva della Pagina Touch

Questo documento spiega come generare selettivamente solo la pagina `touch.vue` senza rigenerare l'intero sito.

## Metodo 1: Utilizzo dello script npm

È stato aggiunto uno script dedicato nel `package.json` che permette di generare solo la pagina touch utilizzando una configurazione Nuxt specifica.

```bash
npm run generate:touch
```

Questo comando utilizza il file di configurazione `nuxt.touch.config.ts` che è stato creato appositamente per generare solo la pagina touch.

## Metodo 2: Utilizzo dello script bash

In alternativa, è possibile utilizzare lo script bash `generate-touch.sh`:

```bash
bash generate-touch.sh
```

Questo script imposta una variabile d'ambiente e utilizza l'opzione `--no-crawler` per evitare la generazione di altre pagine.

## Come funziona

La generazione selettiva funziona grazie a:

1. **Configurazione personalizzata**: Il file `nuxt.touch.config.ts` estende la configurazione base di Nuxt e sovrascrive le opzioni di generazione per includere solo la pagina touch.

2. **Prerender selettivo**: Utilizziamo l'opzione `nitro.prerender.routes` per specificare solo la rotta `/touch` da generare.

3. **Disabilitazione del crawler**: Impediamo a Nuxt di seguire i link e generare altre pagine oltre a quella specificata.

## Note importanti

- I file generati si troveranno nella directory `dist`
- Questa soluzione è ideale quando si modifica solo una pagina specifica e si vuole aggiornare rapidamente solo quella parte del sito
- Per un sito completo, utilizzare sempre il comando standard `npm run generate`