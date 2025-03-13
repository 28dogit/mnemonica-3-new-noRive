<template>
  <div class="h-max">
    <h2>Contenuto Slot 1</h2>
    <div v-html="slot1Content"></div>
    <div class="test28"><slot name="elemento-iniziale"></slot></div>
    <h2>Contenuto Slot 2</h2>
    <div v-html="slot2Content"></div>
    <h2>Titolo pagina dataProva</h2>
    <pre class="gino">{{ body[0] }}</pre>
  </div>
</template>

<script setup>
const { data } = await useAsyncData("testdata", () => {
  return queryCollection("contentData").first();
});
// Verifica che i dati siano presenti
if (!data.value || !data.value.body) {
  console.error("Dati non trovati:", data.value);
}
// Accedi al corpo del Markdown
const body = data.value?.body?.value;
console.log("BODY", body[1][2][2][2]);
console.log("BODYlenght", body.length);
//console.log(JSON.stringify(data.value.body.value, null, 2));
const bodyL = JSON.stringify(data.value.body.value, null, 2);
console.log("BodyL", bodyL);

// Funzione per estrarre il contenuto degli slot
const extractSlotContent = (body, slotName) => {
  if (!body || !Array.isArray(body)) return `Slot ${slotName} non trovato`;

  // Cerca ricorsivamente i nodi con il nome dello slot
  const findSlot = (node) => {
    if (Array.isArray(node) && node[0] === slotName) {
      // Estrai il contenuto dal terzo elemento del nodo
      const contentNode = node[2];
      if (Array.isArray(contentNode)) {
        // Se il contenuto è un array, estrai il testo
        return contentNode
          .map((item) => {
            if (
              Array.isArray(item) &&
              item[0] === ("p" || "h1" || "h2" || "h3" || "h4" || "h5" || "h6")
            ) {
              return item[2]?.trim() || "";
            }
            return "titoz";
          })
          .join(" ");
      }
    }
    if (Array.isArray(node)) {
      for (const child of node) {
        const result = findSlot(child);
        if (result) return result;
      }
    }
    return null;
  };

  const result = findSlot(body);
  return result || `Slot ${slotName} non trovato`;
};

// Estrai il contenuto degli slot
const slot1Content = body
  ? extractSlotContent(body, "elemento-iniziale-tre-pallocchi")
  : "Slot 1 non trovato";
const slot2Content = body
  ? extractSlotContent(body, "elemento-iniziale")
  : "Slot 2 non trovato";

// //Funzione per estrarre il contenuto degli slot
// const extractSlotContent = (body, slotName) => {
//   const bodyString = JSON.stringify(body);
//   const slotStart = bodyString.indexOf(`::${slotName}`);
//   const slotEnd = bodyString.indexOf("::", slotStart + 2);

//   if (slotStart === -1 || slotEnd === -1) {
//     return `Slot ${slotName} non trovato`;
//   }

//   return bodyString.slice(slotStart + slotName.length + 3, slotEnd).trim();
// };

// // Estrai il contenuto degli slot
// const slot1Content = extractSlotContent(data, "elemento-iniziale-tre-pallocchi");
//const slot2Content = extractSlotContent(data, "elemento-iniziale");
</script>

<style scoped></style>
