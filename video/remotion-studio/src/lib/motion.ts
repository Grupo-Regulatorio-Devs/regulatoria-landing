import { interpolate, Easing, spring } from "remotion";

/**
 * Motion vocabulary for the v2 videos.
 *
 * The v1 film moved everything with the same fade+slide. These curves give each
 * kind of element its own physical character: type settles, panels glide,
 * numbers snap, and accents overshoot slightly. That variation is most of what
 * separates a template from a piece that feels authored.
 */

/** Type and UI entrances — fast start, long tail. The workhorse. */
export const EASE_OUT_EXPO = Easing.bezier(0.16, 1, 0.3, 1);
/** Camera-like moves: pans, scales, anything reading as a viewport shift. */
export const EASE_IN_OUT_QUINT = Easing.bezier(0.83, 0, 0.17, 1);
/** Accents that should feel mechanical, not soft — bars, wipes, rules. */
export const EASE_OUT_QUART = Easing.bezier(0.25, 1, 0.5, 1);

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ramp = (
  frame: number,
  delay: number,
  duration: number,
  easing = EASE_OUT_EXPO,
): number =>
  interpolate(frame, [delay, delay + duration], [0, 1], { ...CLAMP, easing });

/**
 * Blur that resolves as an element arrives. Pairs with translate for a
 * "focus pull" entrance — cheap in render cost, disproportionately premium.
 */
export const focusIn = (
  frame: number,
  delay: number,
  duration = 20,
  maxBlur = 10,
): string => `blur(${(1 - ramp(frame, delay, duration)) * maxBlur}px)`;

/** Springs tuned per role, so bounce is a deliberate choice rather than a default. */
export const SPRING = {
  /** No overshoot. Panels, cards, anything large. */
  glide: { damping: 200, mass: 0.7, stiffness: 100 },
  /** Barely-there overshoot. Badges, pills, small UI. */
  snap: { damping: 26, mass: 0.55, stiffness: 190 },
  /** Visible overshoot. Reserved for a single accent per scene. */
  pop: { damping: 14, mass: 0.7, stiffness: 210 },
} as const;

export const springAt = (
  frame: number,
  fps: number,
  delay: number,
  config: (typeof SPRING)[keyof typeof SPRING] = SPRING.glide,
): number => spring({ frame: frame - delay, fps, config });

/**
 * Stagger helper. Returns the delay for index `i`, with an optional cap so a
 * ten-item list doesn't take four seconds to finish arriving.
 */
export const stagger = (
  i: number,
  step: number,
  base = 0,
  maxTotal = Infinity,
): number => base + Math.min(i * step, maxTotal);

/**
 * Scene-level opacity with asymmetric edges: scenes come up quickly and leave
 * slowly, which keeps cuts from feeling like flicker.
 */
export const sceneFade = (
  frame: number,
  durationInFrames: number,
  inFrames = 10,
  outFrames = 14,
): number =>
  interpolate(
    frame,
    [0, inFrames, durationInFrames - outFrames, durationInFrames],
    [0, 1, 1, 0],
    { ...CLAMP, easing: EASE_IN_OUT_QUINT },
  );

/**
 * A slow continuous drift, for backgrounds and held shots. Keeps a static
 * frame from reading as a freeze without pulling focus.
 */
export const drift = (frame: number, amplitude: number, period: number): number =>
  Math.sin((frame / period) * Math.PI * 2) * amplitude;

/** Counts up, then holds. Used for every figure on screen. */
export const countTo = (
  frame: number,
  target: number,
  delay: number,
  duration = 34,
): number => target * ramp(frame, delay, duration, EASE_OUT_EXPO);

export const formatNumber = (n: number): string =>
  Math.round(n).toLocaleString("es-CL");
