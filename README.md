# Framwork utilizzato NUXT 4.0

Look at the [Nuxt 4 documentation](https://nuxt.com/docs/getting-started/introduction)
tutte le dipendenze sono state aggiornate al 22/07/2025

## animazioni e css:

Gsap
anime.js 4.0.2
tailwindcss 4.1.11
rive 2.30.4

### per i CSS utilizzo scss, organizzati in questo modo

in nuxt.config.ts dichiaro css:[@/assetes/css/main.scss]
creo un file \_globals.scss in cui metto tutte le variabili globali e altri fils specifici come \_typography.scss, buttons.scss, ...
in main.scss importo tutti gli altri scss con i loro namespace come (@usebuttons as btn), (@usetypography as typo),
e in ogni files (anche main.scss) importo globals as \* (@use globals as \*) per avere accesso alle variabili evitando di dover utilizzare un namespace per richiamare le variabili globali

## icone

Per le icone ho utilizzato la risorsa https://icones.js.org/ (le icone inserite sono random)

All'interno della home page i divider sono utilizzati esclusivamente per dare un riferimento visivo tra le varie sezioni.

## Problema dello scroll touch su dispositivi apple

la soluzione è implementata **nel file /pages/touch_4a_y.vue** e nel file touch_4a_index.vue avevo cominciato a implementare alcune modifiche per la gestione dello scroll nello specifico della homepage

# CMS

per quanto riguarda la gestione dei testi tramite il modulo nuxt content, allego due screenshot esemplificativi di come il content derivante dal file .md viene gestito nelle pagine.
La parte implementata attuale è quella del data content /content/data/\*.md questi files contengono i testi di alcune parti dei componenti presenti nelle sezioni (pahases e modules) e vengono utilizzati secondo la logica che trovate indicata nell'allegato **"Content data utilizzo e richiamo tramite composable.png"** in pratica i testi vengono richiamati dal componente attraverso un composable che cicla il contenuto e lo estrae, poi viene renderizzato nel punto voluto utilizzando gli slot relativi.

nell'allegato **"Content Components all'interno di Components.png"** in dico l'utilizzo dei conten componentes (/components/content/\*.md), sono componenti creati per formattare i pezzi di contenuto utilizzati all'interno delle pagine e che nel file .md vengono racchiusi nel relativo componente in questo modo
::nome-componente
contenuto
::

In questo modo anche utilizzando il metodo classico per caricare i contenuti testuali, posso controllare la formattazione dei singoli blocchi del contenuto del file .md invece di avere un singolo blocco di testo.

**NOTA: le immagini di cui sopra le ho salvate all'interno di una cartellina "/allegati" in modo da avere tutto il materiale all'interno di questa repository**

# Struttura

per quanto riguarda la struttura del progetto, pagine, components, layouts, composables...lascio a claude code l'onere di identificarlo dico solo che nuxt utilizza l'auto importazione, quindi le pagine all'interno della cartella pages, vengono automaticamente riconosciute così come i components ...

# Note

Per quanto riguarda la Ghirlanda, vi avverto che viene gestita a livello di layout perchè per gestire il mix-blend-mode per fondersi con il background di fondo deve essere ad un livello più basso rispetto al resto delle fixed sections che invece per essere animate e getite si trovano in position absolute. Quindi la ghirlanda in realtà non si trova in index.vue, ma è gestita a livello di layout in /layouts/default.vue

Ho cercato di ripulite il più possibile dai files inutili che tenevo come riferimento, ma qualcosa sarà rimasto, troverete commenti sparsi per ricordarmi le implementazioni fatte, spero di aver usato un linguaggio consono, ma a volta la frustazione potrebbe avermi fatto scrive qualche commento sopra le righe :).

Ultimo punto, tailwindcss è implementato e sicuramente utilizzato per qualche prova veloce, ma ho cercato nel tempo di toglierlo in favore della struttua di base dei file scss. controllate sempre anche lo <style></style> all'interno di ogni componente o pagina perchè potrebbe esserci del css inserito sempre per velocizzare o testare qualcosa.
