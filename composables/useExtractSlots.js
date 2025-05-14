// composables/useExtractSlots.js
import { useAsyncData, ref } from '#imports'; // Importa useAsyncData e ref da Nuxt 3

export const useExtractSlots = (sectionName, asyncDataKey = "sections-index") => {
  // Crea ref reattivi per i risultati
  console.log("AsyncDataKey: ",asyncDataKey);
  const slots = ref({});
  const defaultContent = ref('');
  const isLoading = ref(true);
  const error = ref(null);

  // Funzione per renderizzare un nodo in HTML
  const renderNode = (node) => {
    if (typeof node === 'string') return node;

    const [tag, props, ...children] = node;

    // Ignora i template (li gestiamo separatamente)
    if (tag === "template") return "";

    // Se è un componente personalizzato, renderizza i suoi figli
    if (tag.startsWith(sectionName)) {
      const renderedChildren = children.map((child) => renderNode(child)).join("");
      return `<${tag} id="${props?.id || ""}">${renderedChildren}</${tag}>`;
    }

    // Gestione speciale per i link (<a>)
    if (tag === "a") {
      const href = props?.href || "#"; // Estrae l'attributo href
      const renderedChildren = children.map((child) => renderNode(child)).join("");
      return `<${tag} href="${href}">${renderedChildren}</${tag}>`;
    }

    // Gestione speciale per i paragrafi (<p>) che contengono solo un link (<a>)
    if (tag === "p") {
      // Controlla se il paragrafo contiene solo un link
      if (children.length === 1 && Array.isArray(children[0]) && children[0][0] === "a") {
        // Se sì, restituisci solo il link
        return renderNode(children[0]);
      }
    }

    // Renderizza i figli
    const renderedChildren = children.map((child) => renderNode(child)).join("");

    // Restituisce l'elemento HTML
    return `<${tag} id="${props?.id || ""}">${renderedChildren}</${tag}>`;
  };

  // Funzione per estrarre gli slot da un componente
  const extractSlots = (content, componentTag) => {
    const extractedSlots = {};

    // Trova il componente
    const componentNode = content.find((node) => node[0] === componentTag);
    if (!componentNode) return extractedSlots;

    // Itera sui figli del componente
    const [, , ...children] = componentNode;
    for (const child of children) {
      if (Array.isArray(child) && child[0] === "template") {
        const slotName = Object.keys(child[1])[0]?.replace("v-slot:", "") || "default";
        extractedSlots[slotName] = renderNode(child[2]); // Renderizza il contenuto dello slot
      }
    }

    return extractedSlots;
  };

  // Funzione principale del composable - ora non restituisce una Promise
  const fetchSection = () => {
    // Imposta lo stato di caricamento
    isLoading.value = true;
    error.value = null;

    // Esegue la query in modo non bloccante
    useAsyncData(asyncDataKey, () => {
      return queryCollection("contentData")
        .where("title", "LIKE", `${asyncDataKey}`)
        .first();
    }).then(({ data }) => {
      // Verifica che i dati siano presenti
      if (!data.value || !data.value.body) {
        console.error("Dati non trovati:", data.value);
        error.value = "Dati non trovati";
        isLoading.value = false;
        return;
      }

      // Accedi al corpo del Markdown
      const body = data.value?.body?.value;

      // Estrai gli slot
      slots.value = extractSlots(body, sectionName);

      // Estrai il contenuto di default
      const componentDefaultNode = body.find((node) => node[0] === sectionName);
      if (componentDefaultNode) {
        const defaultNodes = componentDefaultNode
          .slice(2)
          .filter((child) => child[0] !== "template");
        defaultContent.value = defaultNodes.map((node) => renderNode(node)).join("");
      }

      // Aggiorna lo stato di caricamento
      isLoading.value = false;
    }).catch((err) => {
      console.error("Errore durante il caricamento dei dati:", err);
      error.value = err.message || "Errore durante il caricamento";
      isLoading.value = false;
    });

    // Restituisce i ref reattivi invece di una Promise
    return { slots, defaultContent, isLoading, error };
  };

  return { fetchSection };
};