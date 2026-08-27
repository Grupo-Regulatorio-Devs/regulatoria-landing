import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT, GRADIENT, RADIUS, gradientText } from "../../../themes/regulatoria";
import { Eyebrow, Ground, useScale } from "../ui";
import {
  fadeIn,
  formatNumber,
  progress,
  sceneOpacity,
  slideUp,
} from "../../../lib/animations";

/** Every figure carries its context — the brand voice forbids a bare number. */
const METRICS = [
  { value: 80, suffix: "%", lead: "menos tiempo", tail: "en cada registro" },
  { value: 3.2, suffix: "x", lead: "de retorno", tail: "sobre la inversión" },
  { value: 1248, suffix: "", lead: "horas devueltas", tail: "al equipo cada mes" },
  { value: 100, suffix: "%", lead: "revisado por un experto", tail: "regulatorio real" },
];

export const MetricsScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = useScale();
  const isWide = width > height;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Ground tone="light" glowY={0.46} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: `0 ${100 * s}px`,
          fontFamily: FONT,
        }}
      >
        <Eyebrow tone="light" style={{ opacity: fadeIn(frame, 0, 12) }}>
          Lo que cambia cuando el proceso se automatiza
        </Eyebrow>

        <div
          style={{
            marginTop: 54 * s,
            display: "grid",
            gridTemplateColumns: `repeat(${isWide ? 4 : 2}, 1fr)`,
            gap: 22 * s,
            width: "100%",
            maxWidth: 1620 * s,
          }}
        >
          {METRICS.map((m, i) => {
            const delay = 8 + i * 7;
            const p = progress(frame, delay, 34);
            const shown = m.value * p;
            const isDecimal = !Number.isInteger(m.value);
            return (
              <div
                key={m.lead}
                style={{
                  background: COLOR.paper,
                  border: "1px solid rgba(43,90,20,0.12)",
                  borderRadius: RADIUS.panel,
                  padding: `${30 * s}px ${28 * s}px`,
                  opacity: fadeIn(frame, delay, 14),
                  transform: `translateY(${slideUp(frame, delay, 22, 28 * s)}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: (isWide ? 78 : 64) * s,
                    fontWeight: 900,
                    letterSpacing: -0.04 * 78 * s,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                    ...gradientText(GRADIENT.wordmark),
                  }}
                >
                  {isDecimal ? shown.toFixed(1) : formatNumber(shown)}
                  {m.suffix}
                </div>
                <div
                  style={{
                    marginTop: 16 * s,
                    color: COLOR.ink,
                    fontSize: 25 * s,
                    fontWeight: 800,
                    lineHeight: 1.25,
                  }}
                >
                  {m.lead}
                </div>
                <div
                  style={{
                    marginTop: 4 * s,
                    color: COLOR.stem,
                    fontSize: 21 * s,
                    fontWeight: 400,
                    lineHeight: 1.45,
                  }}
                >
                  {m.tail}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
