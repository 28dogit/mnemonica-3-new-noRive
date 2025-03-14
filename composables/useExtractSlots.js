// composables/useExtractSlots.js
import { useAsyncData } from '#imports'; // Importa useAsyncData da Nuxt 3

export const useExtractSlots = (sectionName, asyncDataKey = "sections-index") => {
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
    const slots = {};

    // Trova il componente
    const componentNode = content.find((node) => node[0] === componentTag);
    if (!componentNode) return slots;

    // Itera sui figli del componente
    const [, , ...children] = componentNode;
    for (const child of children) {
      if (Array.isArray(child) && child[0] === "template") {
        const slotName = Object.keys(child[1])[0]?.replace("v-slot:", "") || "default";
        slots[slotName] = renderNode(child[2]); // Renderizza il contenuto dello slot
      }
    }

    return slots;
  };

  // Funzione principale del composable
  const fetchSection = async () => {
    const { data } = await useAsyncData(asyncDataKey, () => {
      return queryCollection("contentData").first();
    });

    // Verifica che i dati siano presenti
    if (!data.value || !data.value.body) {
      console.error("Dati non trovati:", data.value);
      return { slots: {}, defaultContent: "" };
    }

    // Accedi al corpo del Markdown
    const body = data.value?.body?.value;

    // Estrai gli slot
    const slots = extractSlots(body, sectionName);

    // Estrai il contenuto di default
    const componentDefaultNode = body.find((node) => node[0] === sectionName);
    const defaultNodes = componentDefaultNode
      .slice(2)
      .filter((child) => child[0] !== "template");
    const defaultContent = defaultNodes.map((node) => renderNode(node)).join("");

    return { slots, defaultContent };
  };

  return { fetchSection };
};