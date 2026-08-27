import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Brand } from "../../../themes/brands";
import { Backdrop } from "../../shared/Backdrop";
import {
  EASE_OUT,
  fadeIn,
  sceneOpacity,
  slideUp,
  springPop,
} from "../../../lib/animations";

export const CtaScene: React.FC<{
  brand: Brand;
  ctaText: string;
  ctaUrl?: string;
  footnote?: string;
  durationInFrames: number;
}> = ({ brand, ctaText, ctaUrl, footnote, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const pop = springPop(frame, fps, 18);

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 18) }}>
      <Backdrop brand={brand} glowY={0.5} gridOpacity={0.05} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily: brand.fontFamily,
          textAlign: "center",
          padding: `0 ${80 * s}px`,
        }}
      >
        <div
          style={{
            color: brand.text,
            fontSize: 100 * s,
            fontWeight: 900,
            letterSpacing: -4 * s,
            lineHeight: 1.25,
            paddingBottom: 6 * s,
            opacity: fadeIn(frame, 0, 14),
            transform: `translateY(${slideUp(frame, 0, 22, 30 * s)}px)`,
          }}
        >
          {brand.wordmark}
        </div>

        <div
          style={{
            marginTop: 18 * s,
            height: 2,
            width: interpolate(frame, [10, 30], [0, 220 * s], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
            backgroundColor: brand.primary,
          }}
        />

        <div
          style={{
            marginTop: 46 * s,
            transform: `scale(${pop})`,
            padding: `${22 * s}px ${52 * s}px`,
            borderRadius: 999,
            backgroundColor: brand.primary,
            color: brand.background,
            fontSize: 38 * s,
            fontWeight: 800,
            letterSpacing: -0.5 * s,
            boxShadow: `0 0 ${60 * s}px ${brand.glow}`,
          }}
        >
          {ctaText}
        </div>

        {ctaUrl ? (
          <div
            style={{
              marginTop: 30 * s,
              color: brand.secondary,
              fontSize: 34 * s,
              fontWeight: 600,
              letterSpacing: 1 * s,
              opacity: fadeIn(frame, 30, 16),
            }}
          >
            {ctaUrl}
          </div>
        ) : null}

        {footnote ? (
          <div
            style={{
              marginTop: 22 * s,
              color: brand.textDim,
              fontSize: 24 * s,
              fontWeight: 500,
              opacity: fadeIn(frame, 40, 16),
            }}
          >
            {footnote}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
