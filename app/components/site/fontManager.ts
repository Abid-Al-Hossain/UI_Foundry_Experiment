export type FontCategory =
  | "Sans Serif"
  | "Serif"
  | "Display"
  | "Monospace"
  | "Handwriting";

export interface FontDefinition {
  name: string;
  category: FontCategory;
  weights: number[];
}

export const GOOGLE_FONTS: FontDefinition[] = [
  // Sans Serif
  {
    name: "Inter",
    category: "Sans Serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Roboto",
    category: "Sans Serif",
    weights: [100, 300, 400, 500, 700, 900],
  },
  {
    name: "Poppins",
    category: "Sans Serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Montserrat",
    category: "Sans Serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Open Sans",
    category: "Sans Serif",
    weights: [300, 400, 500, 600, 700, 800],
  },
  { name: "Lato", category: "Sans Serif", weights: [100, 300, 400, 700, 900] },
  {
    name: "Raleway",
    category: "Sans Serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: "Nunito",
    category: "Sans Serif",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  { name: "Ubuntu", category: "Sans Serif", weights: [300, 400, 500, 700] },
  {
    name: "Oswald",
    category: "Sans Serif",
    weights: [200, 300, 400, 500, 600, 700],
  },
  {
    name: "Quicksand",
    category: "Sans Serif",
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: "Manrope",
    category: "Sans Serif",
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: "Work Sans",
    category: "Sans Serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },

  // Serif
  {
    name: "Playfair Display",
    category: "Serif",
    weights: [400, 500, 600, 700, 800, 900],
  },
  { name: "Merriweather", category: "Serif", weights: [300, 400, 700, 900] },
  { name: "Lora", category: "Serif", weights: [400, 500, 600, 700] },
  { name: "PT Serif", category: "Serif", weights: [400, 700] },
  {
    name: "Roboto Slab",
    category: "Serif",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  { name: "Noto Serif", category: "Serif", weights: [400, 700] },
  { name: "Crimson Text", category: "Serif", weights: [400, 600, 700] },
  { name: "Libre Baskerville", category: "Serif", weights: [400, 700] },
  {
    name: "Cinzel",
    category: "Serif",
    weights: [400, 500, 600, 700, 800, 900],
  },

  // Display / Retro
  { name: "Bebas Neue", category: "Display", weights: [400] },
  { name: "Righteous", category: "Display", weights: [400] },
  { name: "Press Start 2P", category: "Display", weights: [400] },
  { name: "Creepster", category: "Display", weights: [400] },
  { name: "Lobster", category: "Display", weights: [400] },
  { name: "Abril Fatface", category: "Display", weights: [400] },
  {
    name: "Comfortaa",
    category: "Display",
    weights: [300, 400, 500, 600, 700],
  },
  { name: "Fredoka One", category: "Display", weights: [400] },
  { name: "Pacifico", category: "Display", weights: [400] },
  { name: "Bangers", category: "Display", weights: [400] },
  { name: "Ruslan Display", category: "Display", weights: [400] },
  { name: "Special Elite", category: "Display", weights: [400] },
  { name: "Monoton", category: "Display", weights: [400] },

  // Monospace
  {
    name: "Roboto Mono",
    category: "Monospace",
    weights: [100, 200, 300, 400, 500, 600, 700],
  },
  { name: "Space Mono", category: "Monospace", weights: [400, 700] },
  {
    name: "Fira Code",
    category: "Monospace",
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: "Source Code Pro",
    category: "Monospace",
    weights: [200, 300, 400, 500, 600, 700, 900],
  },
  {
    name: "IBM Plex Mono",
    category: "Monospace",
    weights: [100, 200, 300, 400, 500, 600, 700],
  },
  {
    name: "Inconsolata",
    category: "Monospace",
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  { name: "VT323", category: "Monospace", weights: [400] },

  // Handwriting
  {
    name: "Dancing Script",
    category: "Handwriting",
    weights: [400, 500, 600, 700],
  },
  { name: "Shadows Into Light", category: "Handwriting", weights: [400] },
  { name: "Indie Flower", category: "Handwriting", weights: [400] },
  { name: "Permanent Marker", category: "Handwriting", weights: [400] },
];

export function getGoogleFontUrl(
  fontName: string,
  weights: number[] = [400]
): string {
  const family = fontName.replace(/\s+/g, "+");
  const weightsStr = weights.join(";");
  return `https://fonts.googleapis.com/css2?family=${family}:wght@${weightsStr}&display=swap`;
}

export function getAllFontNames(): string[] {
  return GOOGLE_FONTS.map((f) => f.name).sort();
}
