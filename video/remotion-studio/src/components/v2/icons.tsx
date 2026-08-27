import React from "react";
import { evolvePath } from "@remotion/paths";

/**
 * Line icons that draw themselves on.
 *
 * lucide-react is installed and its glyphs are fine, but its components render
 * finished paths — there is no hook for animating the stroke. These are the few
 * icons the film actually needs, authored as raw path data so `evolvePath` can
 * reveal them stroke-by-stroke, which is the whole point of using an icon in
 * motion rather than in a static layout.
 *
 * Path data traced from the lucide set (ISC licensed) on a 24×24 grid.
 */

const PATHS = {
  // file-text
  dossier:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  // shield-check
  shield: "M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z M9 12l2 2 4-4",
  // clock
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2",
  // globe
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z",
  // check-circle
  check: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8.5 12.5l2.5 2.5 4.5-5",
  // trending-up
  trend: "M3 17l6-6 4 4 7-7 M15 8h6v6",
} as const;

export type IconName = keyof typeof PATHS;

/**
 * `progress` 0–1 draws the stroke on. Each subpath is evolved independently so
 * multi-stroke icons (a document plus its fold, a shield plus its tick) reveal
 * together instead of one after the other.
 */
export const LineIcon: React.FC<{
  name: IconName;
  size: number;
  color: string;
  strokeWidth?: number;
  progress?: number;
}> = ({ name, size, color, strokeWidth = 1.8, progress = 1 }) => {
  const subpaths = PATHS[name].trim().split(/\s(?=M)/);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, overflow: "visible" }}
    >
      {subpaths.map((d, i) => {
        const evolution = evolvePath(progress, d);
        return (
          <path
            key={i}
            d={d}
            strokeDasharray={evolution.strokeDasharray}
            strokeDashoffset={evolution.strokeDashoffset}
          />
        );
      })}
    </svg>
  );
};
