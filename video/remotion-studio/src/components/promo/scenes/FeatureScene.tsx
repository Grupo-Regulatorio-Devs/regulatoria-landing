import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Brand } from "../../../themes/brands";
import type { Feature } from "../../../types";
import { Backdrop } from "../../shared/Backdrop";
import {
  EASE_OUT,
  fadeIn,
  sceneOpacity,
  slideUp,
} from "../../../lib/animations";

export const FeatureScene: React.FC<{
  brand: Brand;
  feature: Feature;
  index: number;
  total: number;
  durationInFrames: number;
}> = ({ brand, feature, index, total, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const isWide = width > height;

  const rule = interpolate(frame, [6, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 12) }}>
      <Backdrop brand={brand} glowX={0.24} glowY={0.55} gridOpacity={0.04} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `0 ${(isWide ? 150 : 90) * s}px`,
          fontFamily: brand.fontFamily,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 22 * s,
            opacity: fadeIn(frame, 0, 12),
          }}
        >
          <span
            style={{
              color: brand.primary,
              fontSize: 30 * s,
              fontWeight: 900,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              color: brand.textDim,
              fontSize: 20 * s,
              fontWeight: 600,
              letterSpacing: 3 * s,
            }}
          >
            / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div
          style={{
            marginTop: 22 * s,
            marginBottom: 30 * s,
            height: 2,
            width: `${rule * 100}%`,
            maxWidth: 900 * s,
            backgroundColor: brand.primary,
            opacity: 0.55,
          }}
        />

        {feature.icon ? (
          <div
            style={{
              color: brand.primary,
              fontSize: 66 * s,
              marginBottom: 20 * s,
              opacity: fadeIn(frame, 8, 14),
              transform: `translateY(${slideUp(frame, 8, 20, 20 * s)}px)`,
            }}
          >
            {feature.icon}
          </div>
        ) : null}

        <div
          style={{
            color: brand.text,
            fontSize: (isWide ? 88 : 70) * s,
            fontWeight: 900,
            letterSpacing: -3 * s,
            lineHeight: 1.05,
            maxWidth: 1450 * s,
            opacity: fadeIn(frame, 12, 16),
            transform: `translateY(${slideUp(frame, 12, 24, 34 * s)}px)`,
          }}
        >
          {feature.title}
        </div>

        <div
          style={{
            marginTop: 26 * s,
            color: brand.textDim,
            fontSize: (isWide ? 36 : 32) * s,
            fontWeight: 400,
            lineHeight: 1.4,
            maxWidth: 1200 * s,
            opacity: fadeIn(frame, 22, 16),
            transform: `translateY(${slideUp(frame, 22, 24, 26 * s)}px)`,
          }}
        >
          {feature.description}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
