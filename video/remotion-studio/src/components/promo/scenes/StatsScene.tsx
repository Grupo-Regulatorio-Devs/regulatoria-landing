import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand } from "../../../themes/brands";
import type { Stat } from "../../../types";
import { Backdrop } from "../../shared/Backdrop";
import {
  fadeIn,
  formatNumber,
  progress,
  sceneOpacity,
  slideUp,
} from "../../../lib/animations";

export const StatsScene: React.FC<{
  brand: Brand;
  stats: Stat[];
  title?: string;
  durationInFrames: number;
}> = ({ brand, stats, title, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const isWide = width > height;
  const columns = isWide ? Math.min(stats.length, 3) : 2;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Backdrop brand={brand} glowY={0.5} gridOpacity={0.05} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: `0 ${90 * s}px`,
          fontFamily: brand.fontFamily,
        }}
      >
        {title ? (
          <div
            style={{
              color: brand.accent,
              fontSize: 26 * s,
              fontWeight: 600,
              letterSpacing: 5 * s,
              textTransform: "uppercase",
              marginBottom: 56 * s,
              opacity: fadeIn(frame, 0, 12),
            }}
          >
            {title}
          </div>
        ) : null}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${54 * s}px ${64 * s}px`,
            width: "100%",
            maxWidth: 1560 * s,
          }}
        >
          {stats.map((stat, i) => {
            const delay = 8 + i * 7;
            const p = progress(frame, delay, 34);
            const shown = stat.value * p;
            // Values under 10 keep one decimal while counting (3.2x), whole
            // numbers count as integers so 1.248 h never flickers a decimal.
            const isDecimal = !Number.isInteger(stat.value);
            return (
              <div
                key={stat.label}
                style={{
                  opacity: fadeIn(frame, delay, 14),
                  transform: `translateY(${slideUp(frame, delay, 22, 30 * s)}px)`,
                  borderLeft: `${3 * s}px solid ${brand.primary}`,
                  paddingLeft: 26 * s,
                }}
              >
                <div
                  style={{
                    color: brand.secondary,
                    fontSize: (isWide ? 96 : 78) * s,
                    fontWeight: 900,
                    letterSpacing: -4 * s,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.prefix ?? ""}
                  {isDecimal ? shown.toFixed(1) : formatNumber(shown)}
                  {stat.suffix ?? ""}
                </div>
                <div
                  style={{
                    marginTop: 14 * s,
                    color: brand.textDim,
                    fontSize: 26 * s,
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
