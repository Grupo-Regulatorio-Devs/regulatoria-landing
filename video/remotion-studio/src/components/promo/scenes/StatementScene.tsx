import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand } from "../../../themes/brands";
import { Backdrop } from "../../shared/Backdrop";
import { fadeIn, sceneOpacity, slideUp } from "../../../lib/animations";

/**
 * Kinetic typography card. Words animate in on a stagger so the line reads as
 * it lands rather than appearing all at once. `highlight` words are drawn in
 * the brand accent.
 */
export const StatementScene: React.FC<{
  brand: Brand;
  text: string;
  highlight?: string[];
  kicker?: string;
  durationInFrames: number;
  align?: "center" | "left";
}> = ({ brand, text, highlight = [], kicker, durationInFrames, align = "center" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const words = text.split(" ");
  const lower = highlight.map((h) => h.toLowerCase());

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 12) }}>
      <Backdrop brand={brand} glowY={0.4} gridOpacity={0.04} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: align === "center" ? "center" : "flex-start",
          padding: `0 ${110 * s}px`,
          fontFamily: brand.fontFamily,
        }}
      >
        {kicker ? (
          <div
            style={{
              opacity: fadeIn(frame, 2, 12),
              color: brand.accent,
              fontSize: 24 * s,
              fontWeight: 600,
              letterSpacing: 5 * s,
              textTransform: "uppercase",
              marginBottom: 28 * s,
            }}
          >
            {kicker}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: `${12 * s}px ${20 * s}px`,
            justifyContent: align === "center" ? "center" : "flex-start",
            textAlign: align,
            maxWidth: 1500 * s,
          }}
        >
          {words.map((word, i) => {
            const delay = 8 + i * 3;
            const isHot = lower.includes(
              word.toLowerCase().replace(/[.,:;—]/g, ""),
            );
            return (
              <span
                key={`${word}-${i}`}
                style={{
                  opacity: fadeIn(frame, delay, 14),
                  transform: `translateY(${slideUp(frame, delay, 20, 26 * s)}px)`,
                  color: isHot ? brand.secondary : brand.text,
                  fontSize: 78 * s,
                  fontWeight: isHot ? 900 : 800,
                  letterSpacing: -2 * s,
                  lineHeight: 1.1,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
