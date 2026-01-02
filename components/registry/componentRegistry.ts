export type ComponentItem = {
    name: string;
    slug: string;
    description: string;
  };
  
  export const COMPONENTS: ComponentItem[] = [
    { name: "Buttons", slug: "buttons", description: "Buttons (customization coming soon)." },
    { name: "Cards", slug: "cards", description: "Cards (customization coming soon)." },
    { name: "Footers", slug: "footers", description: "Footers (customization coming soon)." },
    { name: "Headers", slug: "headers", description: "Headers / navbars (customization coming soon)." },
    { name: "Inputs", slug: "inputs", description: "Inputs, selects, toggles (customization coming soon)." },
    { name: "Loading Animations", slug: "loading-animations", description: "Circular & linear loaders (customization coming soon)." },
    { name: "Modals", slug: "modals", description: "Modals & dialogs (customization coming soon)." },
    { name: "Tables", slug: "tables", description: "Tables & data UI (customization coming soon)." },
  ].sort((a, b) => a.name.localeCompare(b.name));
  
  export const getComponentBySlug = (slug: string) =>
    COMPONENTS.find((c) => c.slug === slug);
  