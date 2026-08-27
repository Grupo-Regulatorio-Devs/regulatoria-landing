import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR, FONT, RADIUS } from "../../../themes/regulatoria";
import { Ground, useScale } from "../../launch/ui";
import {
  EASE_OUT_EXPO,
  focusIn,
  ramp,
  sceneFade,
  SPRING,
  springAt,
} from "../../../lib/motion";

type Card = {
  flag: string;
  country: string;
  authority: string;
  note: string;
  /** Resting offsets, in scale units, so the stack looks scattered not stacked. */
  x: number;
  y: number;
  rot: number;
};

const CARDS: Card[] = [
  { flag: "🇨🇱", country: "Chile", authority: "SAG", note: "Resolución 1.557", x: -420, y: -150, rot: -7 },
  { flag: "🇦🇷", country: "Argentina", authority: "SENASA", note: "Res. 350/99", x: 20, y: -215, rot: 4 },
  { flag: "🇧🇷", country: "Brasil", authority: "ANVISA / MAPA", note: "RDC 294", x: 430, y: -120, rot: 8 },
  { flag: "🇲🇽", country: "México", authority: "COFEPRIS", note: "NOM-232", x: -270, y: 130, rot: 6 },
  { flag: "🇨🇴", country: "Colombia", authority: "ICA", note: "Decreto 1.843", x: 250, y: 165, rot: -5 },
];

/**
 * The escalation beat: five jurisdictions land on top of each other, each with
 * its own rulebook. Cards fly in from off-centre with a blur that resolves on
 * arrival, so the frame gets busier and busier — that congestion IS the point,
 * and the closing line names it.
 */
export const StackScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useScale();

  return (
    <AbsoluteFill style={{ opacity: sceneFade(frame, durationInFrames, 8, 14) }}>
      <Ground tone="dark" glowY={0.5} />

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT }}
      >
        {CARDS.map((c, i) => {
          const delay = 4 + i * 9;
          const enter = springAt(frame, fps, delay, SPRING.glide);
          const opacity = ramp(frame, delay, 12);
          // Each card flies in from further out along its own resting vector.
          const travel = 1 - enter;
          return (
            <div
              key={c.country}
              style={{
                position: "absolute",
                opacity,
                transform: [
                  `translate(${(c.x + c.x * travel * 0.55) * s}px, ${(c.y + c.y * travel * 0.55) * s}px)`,
                  `rotate(${c.rot * enter}deg)`,
                  `scale(${0.9 + 0.1 * enter})`,
                ].join(" "),
                filter: focusIn(frame, delay, 16, 12),
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: RADIUS.card,
                padding: `${20 * s}px ${26 * s}px`,
                minWidth: 330 * s,
                boxShadow: `0 ${16 * s}px ${44 * s}px rgba(0,0,0,0.28)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11 * s,
                  color: "#FFFFFF",
                  fontSize: 31 * s,
                  fontWeight: 800,
                }}
              >
                <span>{c.flag}</span>
                {c.country}
              </div>
              <div
                style={{
                  marginTop: 7 * s,
                  color: COLOR.leaf,
                  fontSize: 20 * s,
                  fontWeight: 700,
                  letterSpacing: 1 * s,
                }}
              >
                {c.authority}
              </div>
              <div
                style={{
                  marginTop: 3 * s,
                  color: "rgba(255,255,255,0.58)",
                  fontSize: 18 * s,
                  fontWeight: 500,
                }}
              >
                {c.note}
              </div>
            </div>
          );
        })}

        {/* The congestion resolves into the thesis. */}
        <div
          style={{
            position: "absolute",
            opacity: ramp(frame, 60, 18),
            transform: `scale(${0.95 + 0.05 * ramp(frame, 60, 22, EASE_OUT_EXPO)})`,
            background: "rgba(5,10,4,0.82)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: RADIUS.panel,
            padding: `${30 * s}px ${52 * s}px`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 60 * s,
              fontWeight: 900,
              letterSpacing: -0.03 * 60 * s,
            }}
          >
            Cinco países. Cinco reglamentos.
          </div>
          <div
            style={{
              marginTop: 12 * s,
              color: "rgba(255,255,255,0.68)",
              fontSize: 28 * s,
              fontWeight: 400,
            }}
          >
            Ninguno acepta el dossier del otro.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
