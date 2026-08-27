import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand } from "../../themes/brands";

/**
 * Shared background for every scene: base fill, a slowly drifting grid, one
 * soft accent glow and a vignette. Kept subtle on purpose — the grid should
 * read as texture, never as a pattern competing with the type.
 *
 * In light mode the grid needs less opacity (dark lines on white are far more
 * assertive than light lines on black) and the vignette is dropped, since
 * darkening the edges of a white frame reads as a printing defect.
 */
export const Backdrop: React.FC<{
  brand: Brand;
  /** 0–1, position of the accent glow. */
  glowX?: number;
  glowY?: number;
  gridOpacity?: number;
}> = ({ brand, glowX = 0.5, glowY = 0.45, gridOpacity }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isLight = brand.mode === "light";
  const cell = Math.round(Math.min(width, height) / 18);
  const drift = (frame * 0.25) % cell;
  const grid = gridOpacity ?? 0.055;
  const resolvedGrid = isLight ? grid * 0.75 : grid;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.background }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${brand.primary} 1px, transparent 1px), linear-gradient(90deg, ${brand.primary} 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
          backgroundPosition: `${drift}px ${drift}px`,
          opacity: resolvedGrid,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${glowX * 100}% ${glowY * 100}%, ${brand.glow} 0%, transparent 60%)`,
        }}
      />
      {isLight ? null : (
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 50% 50%, transparent 35%, ${brand.background} 95%)`,
            opacity: 0.85,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
