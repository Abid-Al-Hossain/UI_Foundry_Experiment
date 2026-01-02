export type ThemeId = "navy" | "forest" | "lavender" | "sunset";

export type ThemeDef = {
  id: ThemeId;
  name: string;
  description: string;
};

export const THEMES: ThemeDef[] = [
  { id: "navy", name: "Navy (Default)", description: "Deep navy + crisp blues" },
  { id: "forest", name: "Forest", description: "Green + earthy neutrals" },
  { id: "lavender", name: "Lavender", description: "Purple + soft contrast" },
  { id: "sunset", name: "Sunset", description: "Warm orange + pink accents" },
];
