import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import type { Brand } from "../../../themes/brands";
import { Backdrop } from "../../shared/Backdrop";
import { fadeIn, sceneOpacity, slideUp, EASE_OUT } from "../../../lib/animations";
import { interpolate } from "remotion";

export const HeroScene: React.FC<{
  brand: Brand;
  eyebrow?: string;
  durationInFrames: number;
}> = ({ brand, eyebrow, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = Math.min(width, height) / 1080;

  // The wordmark is masked by a wipe that travels left→right, with a thin
  // accent bar riding the leading edge.
  const wipe = interpolate(frame, [6, 34], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 8, 14) }}>
      <Backdrop brand={brand} glowY={0.5} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily: brand.fontFamily,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              opacity: fadeIn(frame, 30, 14),
              transform: `translateY(${slideUp(frame, 30, 18, 14 * s)}px)`,
              color: brand.accent,
              fontSize: 26 * s,
              fontWeight: 600,
              letterSpacing: 6 * s,
              textTransform: "uppercase",
              marginBottom: 34 * s,
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div style={{ position: "relative" }}>
          <div
            style={{
              color: brand.text,
              fontSize: 132 * s,
              fontWeight: 900,
              letterSpacing: -5 * s,
              // lineHeight 1 clips descenders at the content box, and the wipe's
              // clipPath then hard-cuts the "g". Both need vertical slack.
              lineHeight: 1.25,
              paddingBottom: 6 * s,
              clipPath: `inset(-12% ${100 - wipe}% -12% 0)`,
            }}
          >
            {brand.wordmark}
          </div>
          <div
            style={{
              position: "absolute",
              top: -8 * s,
              bottom: -8 * s,
              left: `${wipe}%`,
              width: 5 * s,
              backgroundColor: brand.secondary,
              boxShadow: `0 0 ${28 * s}px ${brand.secondary}`,
              opacity: wipe > 0 && wipe < 100 ? 1 : 0,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 30 * s,
            height: 2,
            width: interpolate(frame, [34, 56], [0, 300 * s], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
            backgroundColor: brand.primary,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
