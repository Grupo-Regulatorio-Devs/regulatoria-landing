export type BrandId = "uranoia" | "regulatoria" | "sciensolutions" | "skinai";
export type ThemeMode = "dark" | "light";

export type Palette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  /** Slightly offset from the background, used for cards, pills and the hub. */
  surface: string;
  text: string;
  textDim: string;
  border: string;
  /** rgba() so it composites over the background. */
  glow: string;
};

export type Brand = Palette & {
  id: BrandId;
  mode: ThemeMode;
  name: string;
  /** Wordmark as rendered on screen. */
  wordmark: string;
  fontFamily: string;
};

const INTER = "'Inter', system-ui, sans-serif";

type BrandDef = {
  id: BrandId;
  name: string;
  wordmark: string;
  fontFamily: string;
  dark: Palette;
  light: Palette;
};

const DEFS: Record<BrandId, BrandDef> = {
  // Palette mirrors the live site (index.html :root tokens) — green agro, not
  // the legacy azure. --green #5AAD2D, --sprout #7BC950, --leaf-pale #b8e986,
  // --green-dark #2B5A14, --ink #0F1A0A, --mist #F8FAF6.
  regulatoria: {
    id: "regulatoria",
    name: "Regulator.IA",
    wordmark: "Regulator.IA",
    fontFamily: INTER,
    dark: {
      primary: "#5AAD2D",
      secondary: "#7BC950",
      accent: "#B8E986",
      background: "#050A04",
      surface: "#0F1A0A",
      text: "#FFFFFF",
      textDim: "rgba(255,255,255,0.68)",
      border: "rgba(255,255,255,0.15)",
      glow: "rgba(123,201,80,0.30)",
    },
    // On white, #7BC950 fails contrast even at display sizes, so the roles flip:
    // the dark green carries structure and the mid green carries emphasis.
    light: {
      primary: "#2B5A14",
      secondary: "#3F7F1E",
      accent: "#2B5A14",
      background: "#FFFFFF",
      surface: "#F8FAF6",
      text: "#0F1A0A",
      textDim: "#5A6B52",
      border: "rgba(43,90,20,0.16)",
      glow: "rgba(90,173,45,0.16)",
    },
  },
  uranoia: {
    id: "uranoia",
    name: "Urano IA",
    wordmark: "Urano IA",
    fontFamily: INTER,
    dark: {
      primary: "#7DD3C0",
      secondary: "#C4B5E3",
      accent: "#A7E8D8",
      background: "#1A1E3C",
      surface: "#232848",
      text: "#FFFFFF",
      textDim: "rgba(255,255,255,0.68)",
      border: "rgba(255,255,255,0.15)",
      glow: "rgba(125,211,192,0.35)",
    },
    light: {
      primary: "#2C7A68",
      secondary: "#5B4B8A",
      accent: "#2C7A68",
      background: "#FFFFFF",
      surface: "#F4F6FB",
      text: "#1A1E3C",
      textDim: "#5A6079",
      border: "rgba(26,30,60,0.14)",
      glow: "rgba(125,211,192,0.22)",
    },
  },
  sciensolutions: {
    id: "sciensolutions",
    name: "ScienSolutions",
    wordmark: "ScienSolutions",
    fontFamily: INTER,
    dark: {
      primary: "#0A5C36",
      secondary: "#C8A951",
      accent: "#E0C879",
      background: "#0A2E1B",
      surface: "#0F3D25",
      text: "#FFFFFF",
      textDim: "rgba(255,255,255,0.68)",
      border: "rgba(255,255,255,0.15)",
      glow: "rgba(200,169,81,0.30)",
    },
    light: {
      primary: "#0A5C36",
      secondary: "#8A6F22",
      accent: "#0A5C36",
      background: "#FFFFFF",
      surface: "#F3F8F4",
      text: "#0A2E1B",
      textDim: "#546A5B",
      border: "rgba(10,46,27,0.14)",
      glow: "rgba(200,169,81,0.20)",
    },
  },
  skinai: {
    id: "skinai",
    name: "SkinAI DermaCare",
    wordmark: "SkinAI",
    fontFamily: INTER,
    dark: {
      primary: "#D4756B",
      secondary: "#2A9D8F",
      accent: "#E8A399",
      background: "#241A16",
      surface: "#33241E",
      text: "#FFF8F0",
      textDim: "rgba(255,248,240,0.68)",
      border: "rgba(255,248,240,0.15)",
      glow: "rgba(212,117,107,0.30)",
    },
    light: {
      primary: "#B85548",
      secondary: "#1F7A6F",
      accent: "#B85548",
      background: "#FFF8F0",
      surface: "#FFFFFF",
      text: "#2B2118",
      textDim: "rgba(43,33,24,0.66)",
      border: "rgba(43,33,24,0.14)",
      glow: "rgba(212,117,107,0.22)",
    },
  },
};

export const getBrand = (id: BrandId, mode: ThemeMode = "dark"): Brand => {
  const def = DEFS[id];
  return {
    id: def.id,
    mode,
    name: def.name,
    wordmark: def.wordmark,
    fontFamily: def.fontFamily,
    ...def[mode],
  };
};

export type FormatId = "vertical" | "square" | "horizontal";

export const FORMATS: Record<FormatId, { width: number; height: number }> = {
  vertical: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
  horizontal: { width: 1920, height: 1080 },
};
