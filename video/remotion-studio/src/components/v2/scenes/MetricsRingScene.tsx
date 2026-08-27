import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT, GRADIENT, gradientText } from "../../../themes/regulatoria";
import { Eyebrow, Ground, useScale } from "../../launch/ui";
import { LineIcon, type IconName } from "../icons";
import { ProgressRing } from "../ProgressRing";
import {
  countTo,
  ramp,
  sceneFade,
  SPRING,
  springAt,
  stagger,
  formatNumber,
} from "../../../lib/motion";

/**
 * Metrics as gauges rather than a row of numbers. Each figure keeps the context
 * the brand voice requires — a bare percentage is not allowed to stand alone.
 */
const METRICS: {
  icon: IconName;
  value: number;
  suffix: string;
  /** Fraction of the ring to fill; a ratio like 3.2x has no natural 0–100. */
  fill: number;
  lead: string;
  tail: string;
}[] = [
  { icon: "clock", value: 80, suffix: "%", fill: 0.8, lead: "menos tiempo", tail: "en cada registro" },
  { icon: "trend", value: 3.2, suffix: "x", fill: 0.72, lead: "de retorno", tail: "sobre la inversión" },
  { icon: "dossier", value: 1248, suffix: "", fill: 0.9, lead: "horas devueltas", tail: "al equipo cada mes" },
  { icon: "shield", value: 100, suffix: "%", fill: 1, lead: "revisado por un experto", tail: "regulatorio real" },
];

export const MetricsRingScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = useScale();
  const isWide = width > height;
  const ring = (isWide ? 200 : 170) * s;

  return (
    <AbsoluteFill style={{ opacity: sceneFade(frame, durationInFrames, 10, 14) }}>
      <Ground tone="light" glowY={0.46} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: `0 ${90 * s}px`,
          fontFamily: FONT,
        }}
      >
        <Eyebrow tone="light" style={{ opacity: ramp(frame, 0, 12) }}>
          Lo que cambia cuando el proceso se automatiza
        </Eyebrow>

        <div
          style={{
            marginTop: 62 * s,
            display: "grid",
            gridTemplateColumns: `repeat(${isWide ? 4 : 2}, 1fr)`,
            gap: `${44 * s}px ${30 * s}px`,
            width: "100%",
            maxWidth: 1640 * s,
          }}
        >
          {METRICS.map((m, i) => {
            const delay = stagger(i, 8, 8);
            const pop = springAt(frame, fps, delay, SPRING.snap);
            const shown = countTo(frame, m.value, delay + 4, 36);
            const isDecimal = !Number.isInteger(m.value);
            return (
              <div
                key={m.lead}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  opacity: ramp(frame, delay, 14),
                  transform: `scale(${0.92 + 0.08 * pop})`,
                }}
              >
                <ProgressRing
                  progress={m.fill * ramp(frame, delay + 4, 40)}
                  size={ring}
                  strokeWidth={13 * s}
                  color={COLOR.moss}
                  trackColor="rgba(43,90,20,0.10)"
                  label={
                    <span
                      style={{
                        fontSize: 50 * s,
                        fontWeight: 900,
                        letterSpacing: -0.04 * 50 * s,
                        ...gradientText(GRADIENT.wordmark),
                      }}
                    >
                      {isDecimal ? shown.toFixed(1) : formatNumber(shown)}
                      {m.suffix}
                    </span>
                  }
                />

                <div style={{ marginTop: 20 * s, opacity: ramp(frame, delay + 10, 14) }}>
                  <LineIcon
                    name={m.icon}
                    size={30 * s}
                    color={COLOR.moss}
                    progress={ramp(frame, delay + 10, 22)}
                  />
                </div>

                <div
                  style={{
                    marginTop: 12 * s,
                    color: COLOR.ink,
                    fontSize: 26 * s,
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
