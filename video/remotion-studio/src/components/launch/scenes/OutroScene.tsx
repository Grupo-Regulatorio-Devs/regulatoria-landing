import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT, GRADIENT, RADIUS } from "../../../themes/regulatoria";
import { Ground, TrustPill, Wordmark, useScale } from "../ui";
import { EASE_OUT, fadeIn, sceneOpacity, slideUp, springPop } from "../../../lib/animations";

/**
 * Close. One primary button only, in the 135° CTA gradient at button radius —
 * the guide reserves the pill shape for badges, not for actions.
 */
export const OutroScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useScale();
  const pop = springPop(frame, fps, 20);

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 20) }}>
      <Ground tone="dark" glowY={0.5} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: `0 ${90 * s}px`,
          fontFamily: FONT,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 62 * s,
            fontWeight: 900,
            letterSpacing: -0.03 * 62 * s,
            lineHeight: 1.2,
            maxWidth: 1400 * s,
            opacity: fadeIn(frame, 0, 14),
            transform: `translateY(${slideUp(frame, 0, 22, 26 * s)}px)`,
          }}
        >
          ¿Sin equipo regulatorio? Lo registramos por ti.
        </div>

        <div
          style={{
            marginTop: 40 * s,
            opacity: fadeIn(frame, 12, 14),
          }}
        >
          <Wordmark tone="dark" fontSize={86 * s} />
        </div>

        <div
          style={{
            marginTop: 10 * s,
            height: 2,
            width: interpolate(frame, [18, 38], [0, 260 * s], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            }),
            background: GRADIENT.cta,
          }}
        />

        <a
          style={{
            marginTop: 44 * s,
            transform: `scale(${pop})`,
            display: "inline-block",
            padding: `${21 * s}px ${44 * s}px`,
            borderRadius: RADIUS.button,
            background: GRADIENT.cta,
            color: "#FFFFFF",
            fontSize: 34 * s,
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: `0 ${10 * s}px ${44 * s}px rgba(90,173,45,0.34)`,
          }}
        >
          Obtén tu Demo Gratis →
        </a>

        <div
          style={{
            marginTop: 30 * s,
            color: COLOR.leaf,
            fontSize: 30 * s,
            fontWeight: 600,
            letterSpacing: 1 * s,
            opacity: fadeIn(frame, 34, 16),
          }}
        >
          gruporegulatorio.cl
        </div>

        <div
          style={{
            marginTop: 30 * s,
            display: "flex",
            gap: 14 * s,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: fadeIn(frame, 44, 16),
          }}
        >
          <TrustPill>Sin contratos de largo plazo</TrustPill>
          <TrustPill>Seguridad enterprise</TrustPill>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
