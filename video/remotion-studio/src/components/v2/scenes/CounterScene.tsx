import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Trail } from "@remotion/motion-blur";
import { COLOR, FONT, GRADIENT, gradientText } from "../../../themes/regulatoria";
import { Ground, useScale } from "../../launch/ui";
import { LineIcon } from "../icons";
import {
  countTo,
  drift,
  focusIn,
  formatNumber,
  ramp,
  sceneFade,
} from "../../../lib/motion";

/**
 * Cold open. A page counter runs away from the viewer while the dossier icon
 * draws itself — the number is the hook, so it gets the Trail blur and nothing
 * else on screen competes with it.
 */
export const CounterScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const s = useScale();

  const pages = countTo(frame, 2847, 10, 46);
  const settled = ramp(frame, 10, 46);
  // Blur trails only while the number is still climbing; once it lands the
  // trail would just smear a static figure.
  const layers = settled < 0.97 ? 4 : 1;

  return (
    <AbsoluteFill style={{ opacity: sceneFade(frame, durationInFrames, 8, 14) }}>
      <Ground tone="dark" glowY={0.46} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily: FONT,
          transform: `translateY(${drift(frame, 5 * s, 220)}px)`,
        }}
      >
        <div
          style={{
            opacity: ramp(frame, 0, 16),
            marginBottom: 26 * s,
          }}
        >
          <LineIcon
            name="dossier"
            size={74 * s}
            color={COLOR.sprout}
            strokeWidth={1.5}
            progress={ramp(frame, 2, 30)}
          />
        </div>

        <Trail layers={layers} lagInFrames={1.1} trailOpacity={0.34}>
          <div
            style={{
              fontSize: 210 * s,
              fontWeight: 900,
              letterSpacing: -0.05 * 210 * s,
              lineHeight: 1.1,
              fontVariantNumeric: "tabular-nums",
              filter: focusIn(frame, 8, 26, 14),
              ...gradientText(GRADIENT.emphasis),
            }}
          >
            {formatNumber(pages)}
          </div>
        </Trail>

        <div
          style={{
            marginTop: 10 * s,
            color: "#FFFFFF",
            fontSize: 54 * s,
            fontWeight: 800,
            letterSpacing: -0.03 * 54 * s,
            opacity: ramp(frame, 44, 18),
            transform: `translateY(${(1 - ramp(frame, 44, 22)) * 22 * s}px)`,
          }}
        >
          páginas por un solo registro.
        </div>

        <div
          style={{
            marginTop: 20 * s,
            color: "rgba(255,255,255,0.66)",
            fontSize: 30 * s,
            fontWeight: 400,
            opacity: ramp(frame, 56, 18),
          }}
        >
          Y eso es en un solo país.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
