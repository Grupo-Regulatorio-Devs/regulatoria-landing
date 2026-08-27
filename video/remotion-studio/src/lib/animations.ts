import { interpolate, spring, Easing } from "remotion";

/** Standard easing for entrances — fast out, slow settle. Never bouncy. */
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const fadeIn = (frame: number, delay = 0, duration = 15): number =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });

export const fadeOut = (frame: number, start: number, duration = 15): number =>
  interpolate(frame, [start, start + duration], [1, 0], {
    ...clamp,
    easing: EASE_IN_OUT,
  });

export const slideUp = (
  frame: number,
  delay = 0,
  duration = 20,
  offset = 40,
): number =>
  interpolate(frame, [delay, delay + duration], [offset, 0], {
    ...clamp,
    easing: EASE_OUT,
  });

export const scaleIn = (frame: number, delay = 0, duration = 20): number =>
  interpolate(frame, [delay, delay + duration], [0.8, 1], {
    ...clamp,
    easing: EASE_OUT,
  });

export const typewriter = (
  text: string,
  frame: number,
  delay = 0,
  charsPerFrame = 1.5,
): string => {
  const chars = Math.floor(Math.max(0, frame - delay) * charsPerFrame);
  return text.slice(0, chars);
};

export const springPop = (frame: number, fps: number, delay = 0): number =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6, stiffness: 120 },
  });

/** Eased 0→1 progress, for counters and progress bars. */
export const progress = (frame: number, delay = 0, duration = 30): number =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });

/**
 * Fades a scene in at the start and out at the end so scenes butt-join cleanly
 * inside a <Series> without needing a transition layer.
 */
export const sceneOpacity = (
  frame: number,
  durationInFrames: number,
  inFrames = 12,
  outFrames = 12,
): number =>
  interpolate(
    frame,
    [0, inFrames, durationInFrames - outFrames, durationInFrames],
    [0, 1, 1, 0],
    { ...clamp, easing: EASE_IN_OUT },
  );

/** Formats 1248 → "1.248" (es-CL thousands separator). */
export const formatNumber = (n: number): string =>
  Math.round(n).toLocaleString("es-CL");
