/**
 * Regulator.IA brand system, transcribed from "Regulator.IA — Guía de Marca" v1.0.
 * These are the fixed facts of the brand: they do not adapt to context.
 */

export const COLOR = {
  pine: "#2B5A14",
  moss: "#5AAD2D",
  sprout: "#7BC950",
  leaf: "#B8E986",
  ink: "#0F1A0A",
  stem: "#5A6B52",
  paper: "#FFFFFF",
  mist: "#F8FAF6",
  // State colour is semantic and reserved — never reassigned for decoration.
  info: "#1D4ED8",
  alert: "#C2410C",
  danger: "#B91C1C",
} as const;

/**
 * The four system gradients. The angle is part of the identity: 135° for brand
 * and interaction, 120° for animated hero emphasis, 160° for deep backgrounds.
 * Radial gradients are never a brand fill — only occasional ambient glow.
 */
export const GRADIENT = {
  cta: `linear-gradient(135deg, ${COLOR.moss}, ${COLOR.pine})`,
  wordmark: `linear-gradient(135deg, ${COLOR.pine}, ${COLOR.moss})`,
  wordmarkOnDark: `linear-gradient(135deg, #DFF3CD, ${COLOR.sprout})`,
  emphasis: `linear-gradient(120deg, ${COLOR.sprout}, ${COLOR.moss}, ${COLOR.leaf})`,
  deepField: `linear-gradient(160deg, #0F2E10 0%, ${COLOR.pine} 55%, #0C2A0E 100%)`,
} as const;

export const RADIUS = {
  buttonSm: 8,
  kpi: 10,
  button: 12,
  card: 14,
  panel: 16,
  badge: 20,
  pill: 50,
} as const;

export type PhaseId = "pre" | "reg" | "post";

export const PHASE: Record<
  PhaseId,
  { label: string; color: string; border: string; tint: string }
> = {
  pre: {
    label: "Pre-Registro",
    color: COLOR.info,
    border: "rgba(59,130,246,0.4)",
    tint: "rgba(59,130,246,0.06)",
  },
  reg: {
    label: "Registro",
    color: COLOR.pine,
    border: "rgba(90,173,45,0.4)",
    tint: "rgba(90,173,45,0.06)",
  },
  post: {
    label: "Post-Registro",
    color: COLOR.alert,
    border: "rgba(234,88,12,0.4)",
    tint: "rgba(234,88,12,0.06)",
  },
};

export type Agent = {
  name: string;
  role: string;
  emoji: string;
  phase: PhaseId;
};

/** One emoji per agent, always inside a circle tinted by its phase. */
export const AGENTS: Agent[] = [
  { name: "COMPASS", role: "Estrategia regulatoria", emoji: "🧭", phase: "pre" },
  { name: "PREDICT", role: "Toxicología in-silico", emoji: "🔬", phase: "pre" },
  { name: "GENESIS", role: "Moléculas safe-by-design", emoji: "🧬", phase: "pre" },
  { name: "SCOUT", role: "Vigilancia normativa", emoji: "🔍", phase: "pre" },
  { name: "BINDER", role: "Armado del dossier", emoji: "📁", phase: "reg" },
  { name: "AUDITOR", role: "Validación GLP/OECD", emoji: "✅", phase: "reg" },
  { name: "DEFENDER", role: "Defensa técnica", emoji: "⚖", phase: "reg" },
  { name: "SCRIBE", role: "FDS y etiquetas GHS", emoji: "🏷", phase: "reg" },
  { name: "BRIDGE", role: "Armonización multi-país", emoji: "🌍", phase: "post" },
  { name: "GUARD", role: "Vigilancia de licencias", emoji: "🔔", phase: "post" },
];

/** Surfaces. On dark ground the card is glass — never solid white over Pine. */
export const SURFACE = {
  lightCard: {
    background: COLOR.paper,
    border: "1px solid rgba(43,90,20,0.12)",
  },
  glass: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
  },
} as const;

export const FONT = "'Inter', system-ui, sans-serif";
export const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

/** Text painted with a gradient, per the wordmark and hero-emphasis specs. */
export const gradientText = (image: string) => ({
  backgroundImage: image,
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
});
