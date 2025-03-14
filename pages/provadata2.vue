<template>
  <div class="h-max">
    <h2>{{ sectionTitle }}</h2>
    <div v-html="sectionContent"></div>
    <div v-if="slots.titolo" v-html="slots.titolo"></div>
    <div v-if="slots.sottotitolo" v-html="slots.sottotitolo"></div>
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

// Funzione per estrarre gli slot da un componente
const extractSlots = (content, componentTag) => {
  const slots = {};

  // Trova il componente
  const componentNode = content.find((node) => node[0] === componentTag);
  if (!componentNode) return slots;

  // Itera sui figli del componente
  const [, , ...children] = componentNode;
  for (const child of children) {
    if (Array.isArray(child) && child[0] === "template") {
      const slotName = Object.keys(child[1])[0]?.replace("v-slot:", "") || "default";
      //const slotName = child[1][0]?.["v-slot"] || "default"; // Estrai il nome dello slot
      slots[slotName] = renderNode(child[2]); // Renderizza il contenuto dello slot
      console.log("SLOTSName", slots[slotName]);
    }
  }
  return slots;
};

// Estraiamo gli slot dal componente "elemento-iniziale-tre-pallocchi"
const slots = extractSlots(body, "phases");
// Convertiamo il contenuto principale in HTML
const sectionTitle = "Fasi"; // Puoi estrarre il titolo dinamicamente se necessario
const sectionContent = body.map((node) => renderNode(node)).join("");

// Funzione per renderizzare un nodo in HTML
function renderNode(node) {
  // Se il nodo è un testo, restituiscilo direttamente
  if (typeof node === "string") {
    return node;
  }
  const [tag, props, ...children] = node;

  // Ignora i template (li gestiamo separatamente)
  if (tag === "template") {
    return "";
  }

  // Se è un componente personalizzato, renderizza i suoi figli
  if (tag.startsWith("phases")) {
    const renderedChildren = children.map((child) => renderNode(child)).join("");
    return `<${tag} id="${props?.id || ""}">${renderedChildren}</${tag}>`;
  }

  // Renderizza i figli
  const renderedChildren = children.map((child) => renderNode(child)).join("");

  // Restituisce l'elemento HTML
  return `<${tag} id="${props?.id || ""}">${renderedChildren}</${tag}>`;
}
</script>

<style scoped></style>
