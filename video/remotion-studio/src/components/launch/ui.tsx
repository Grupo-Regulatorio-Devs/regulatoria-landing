import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLOR,
  FONT,
  GRADIENT,
  PHASE,
  RADIUS,
  gradientText,
  type PhaseId,
} from "../../themes/regulatoria";

export type Tone = "dark" | "light";

/** Scale factor so every scene composes identically across the three formats. */
export const useScale = (): number => {
  const { width, height } = useVideoConfig();
  return Math.min(width, height) / 1080;
};

/**
 * Section ground. Dark sections use the 160° deep-field gradient; light
 * sections use Mist, never pure white. The radial wash is ambient glow only —
 * the guide reserves radial gradients for exactly that.
 */
export const Ground: React.FC<{ tone: Tone; glowX?: number; glowY?: number }> = ({
  tone,
  glowX = 0.5,
  glowY = 0.45,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cell = Math.round(Math.min(width, height) / 18);
  const drift = (frame * 0.22) % cell;
  const isDark = tone === "dark";
  const line = isDark ? "rgba(255,255,255,1)" : COLOR.pine;

  return (
    <AbsoluteFill
      style={{ background: isDark ? GRADIENT.deepField : COLOR.mist }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
          backgroundPosition: `${drift}px ${drift}px`,
          opacity: isDark ? 0.05 : 0.035,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${glowX * 100}% ${glowY * 100}%, ${
            isDark ? "rgba(123,201,80,0.18)" : "rgba(90,173,45,0.10)"
          } 0%, transparent 62%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Eyebrow: 700 · uppercase · +0.06em, in a pill. */
export const Eyebrow: React.FC<{
  children: React.ReactNode;
  tone: Tone;
  style?: React.CSSProperties;
}> = ({ children, tone, style }) => {
  const s = useScale();
  const isDark = tone === "dark";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: `${9 * s}px ${22 * s}px`,
        borderRadius: RADIUS.pill,
        background: isDark ? "rgba(255,255,255,0.10)" : "rgba(90,173,45,0.08)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.20)" : "rgba(90,173,45,0.20)"}`,
        color: isDark ? COLOR.leaf : COLOR.pine,
        fontFamily: FONT,
        fontSize: 21 * s,
        fontWeight: 700,
        letterSpacing: 0.06 * 21 * s,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const CheckIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} style={{ flexShrink: 0 }}>
    <path
      fill={COLOR.sprout}
      d="M10 2a8 8 0 100 16A8 8 0 0010 2zm3.5 6.5l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L9 10.94l3.47-3.47a.75.75 0 111.06 1.06z"
    />
  </svg>
);

/** Trust pill — glass, sprout check. Dark ground only. */
export const TrustPill: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const s = useScale();
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10 * s,
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.20)",
        color: "rgba(255,255,255,0.85)",
        padding: `${11 * s}px ${22 * s}px`,
        borderRadius: RADIUS.pill,
        fontFamily: FONT,
        fontSize: 21 * s,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      <CheckIcon size={20 * s} />
      {children}
    </span>
  );
};

export type StatusKind = "en-curso" | "aprobado" | "observado" | "critico";

const STATUS: Record<StatusKind, { label: string; bg: string; color: string }> = {
  "en-curso": { label: "En curso", bg: "rgba(59,130,246,0.10)", color: "#1D4ED8" },
  aprobado: { label: "Aprobado ✓", bg: "rgba(90,173,45,0.12)", color: COLOR.pine },
  observado: { label: "Observado", bg: "rgba(234,88,12,0.10)", color: COLOR.alert },
  critico: { label: "Crítico", bg: "rgba(220,38,38,0.10)", color: COLOR.danger },
};

export const StatusBadge: React.FC<{ kind: StatusKind; scale?: number }> = ({
  kind,
  scale = 1,
}) => {
  const s = useScale() * scale;
  const spec = STATUS[kind];
  return (
    <span
      style={{
        display: "inline-block",
        padding: `${4 * s}px ${13 * s}px`,
        borderRadius: RADIUS.kpi,
        background: spec.bg,
        color: spec.color,
        fontFamily: FONT,
        fontSize: 17 * s,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {spec.label}
    </span>
  );
};

/** Agent emoji in a circle tinted by its regulatory phase. */
export const AgentIcon: React.FC<{
  emoji: string;
  phase: PhaseId;
  size: number;
  tone: Tone;
}> = ({ emoji, phase, size, tone }) => {
  const spec = PHASE[phase];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.46,
        border: `${size * 0.038}px solid ${spec.border}`,
        background:
          tone === "dark" ? "rgba(255,255,255,0.08)" : spec.tint,
        flexShrink: 0,
      }}
    >
      {emoji}
    </div>
  );
};

/** Headline word painted with the 120° hero-emphasis gradient. */
export const Emphasis: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={gradientText(GRADIENT.emphasis)}>{children}</span>
);

/** The wordmark is always text: Inter 800, −0.03em, gradient fill. */
export const Wordmark: React.FC<{
  tone: Tone;
  fontSize: number;
  style?: React.CSSProperties;
}> = ({ tone, fontSize, style }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize,
      letterSpacing: -0.03 * fontSize,
      // The gradient is clipped to the glyphs, so the box needs slack for the
      // "g" descender or the fill cuts off mid-stroke.
      lineHeight: 1.2,
      paddingBottom: 0.08 * fontSize,
      ...gradientText(
        tone === "dark" ? GRADIENT.wordmarkOnDark : GRADIENT.wordmark,
      ),
      ...style,
    }}
  >
    Regulator.IA
  </div>
);
