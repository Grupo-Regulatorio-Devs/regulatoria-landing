import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLOR, FONT, GRADIENT } from "../../../themes/regulatoria";
import { Ground, Wordmark, useScale } from "../ui";
import { EASE_OUT, fadeIn, sceneOpacity } from "../../../lib/animations";

/**
 * Brand card. The wordmark is revealed by a left→right wipe with a Sprout edge
 * riding the leading line, then a rule and the descriptor settle underneath.
 */
export const WordmarkScene: React.FC<{
  descriptor: string;
  durationInFrames: number;
}> = ({ descriptor, durationInFrames }) => {
  const frame = useCurrentFrame();
  const s = useScale();
  const size = 150 * s;

  const wipe = interpolate(frame, [3, 26], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 8, 14) }}>
      <Ground tone="dark" glowY={0.48} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily: FONT,
        }}
      >
        <div style={{ position: "relative" }}>
          <Wordmark
            tone="dark"
            fontSize={size}
            style={{ clipPath: `inset(-14% ${100 - wipe}% -14% 0)` }}
          />
          <div
            style={{
              position: "absolute",
              top: -10 * s,
              bottom: -2 * s,
              left: `${wipe}%`,
              width: 5 * s,
              background: COLOR.sprout,
              boxShadow: `0 0 ${30 * s}px ${COLOR.sprout}`,
              opacity: wipe > 0 && wipe < 100 ? 1 : 0,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 26 * s,
            height: 2,
            width: interpolate(frame, [24, 42], [0, 340 * s], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
            background: GRADIENT.cta,
          }}
        />

        <div
          style={{
            marginTop: 28 * s,
            color: "rgba(255,255,255,0.72)",
            fontSize: 32 * s,
            fontWeight: 400,
            letterSpacing: 1 * s,
            opacity: fadeIn(frame, 34, 14),
          }}
        >
          {descriptor}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
