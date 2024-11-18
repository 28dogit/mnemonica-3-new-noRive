# Struttura sCss

Mon, Nov 18, 2024 10:41 AM
in nuxt.config.ts dichiaro css:[@/assetes/css/main.scss]
creo unfile \_globals.scss in cui metto tutte le variabili che mi serviranno
in main.scss importo tutti gli altri scss come buttons, typography, ...
e in ogni files (anche main.scss) importo globals as \* per avere accesso alle variabili evitando di dover utilizzare un namespace per richiamare le variabili (questo perché il progetto e di piccole dimensioni e non ci dovrebbero essere troppi files)