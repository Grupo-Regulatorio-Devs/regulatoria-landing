import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AGENTS, COLOR, FONT, PHASE, RADIUS, type PhaseId } from "../../../themes/regulatoria";
import { AgentIcon, Eyebrow, Ground, useScale } from "../ui";
import { EASE_OUT, fadeIn, sceneOpacity, slideUp } from "../../../lib/animations";

const ORDER: PhaseId[] = ["pre", "reg", "post"];

/**
 * The three-phase pipeline. A connector line runs the full width and each
 * phase column lands on it in sequence, carrying the agents that live there.
 */
export const PhasesScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = useScale();

  const track = interpolate(frame, [10, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Ground tone="light" glowY={0.4} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          padding: `${74 * s}px ${100 * s}px 0`,
          fontFamily: FONT,
        }}
      >
        <Eyebrow tone="light" style={{ opacity: fadeIn(frame, 0, 12) }}>
          Tres fases · cero fricción
        </Eyebrow>

        <div
          style={{
            marginTop: 22 * s,
            color: COLOR.ink,
            fontSize: 56 * s,
            fontWeight: 900,
            letterSpacing: -0.03 * 56 * s,
            textAlign: "center",
            opacity: fadeIn(frame, 6, 14),
            transform: `translateY(${slideUp(frame, 6, 20, 20 * s)}px)`,
          }}
        >
          Del análisis de viabilidad al expediente presentado.
        </div>

        {/* Connector */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1560 * s,
            marginTop: 62 * s,
            height: 3,
            background: "rgba(43,90,20,0.12)",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: `${track * 100}%`,
              background: `linear-gradient(90deg, ${COLOR.info}, ${COLOR.moss}, ${COLOR.alert})`,
              borderRadius: 2,
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 34 * s,
            width: "100%",
            maxWidth: 1560 * s,
            marginTop: -14 * s,
          }}
        >
          {ORDER.map((id, ci) => {
            const spec = PHASE[id];
            const agents = AGENTS.filter((a) => a.phase === id);
            const delay = 20 + ci * 14;
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: fadeIn(frame, delay, 14),
                  transform: `translateY(${slideUp(frame, delay, 22, 26 * s)}px)`,
                }}
              >
                <div
                  style={{
                    width: 24 * s,
                    height: 24 * s,
                    borderRadius: "50%",
                    background: spec.color,
                    border: `${4 * s}px solid ${COLOR.mist}`,
                    marginBottom: 20 * s,
                  }}
                />
                <div
                  style={{
                    color: spec.color,
                    fontSize: 15 * s,
                    fontWeight: 700,
                    letterSpacing: 0.06 * 15 * s,
                    textTransform: "uppercase",
                    marginBottom: 6 * s,
                  }}
                >
                  Fase {ci + 1}
                </div>
                <div
                  style={{
                    color: COLOR.ink,
                    fontSize: 34 * s,
                    fontWeight: 900,
                    letterSpacing: -0.02 * 34 * s,
                    marginBottom: 22 * s,
                  }}
                >
                  {spec.label}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10 * s,
                    width: "100%",
                  }}
                >
                  {agents.map((a, ai) => {
                    const d = delay + 8 + ai * 4;
                    return (
                      <div
                        key={a.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 13 * s,
                          background: COLOR.paper,
                          border: "1px solid rgba(43,90,20,0.12)",
                          borderRadius: RADIUS.card,
                          padding: `${11 * s}px ${15 * s}px`,
                          opacity: fadeIn(frame, d, 12),
                          transform: `translateY(${slideUp(frame, d, 18, 14 * s)}px)`,
                        }}
                      >
                        <AgentIcon
                          emoji={a.emoji}
                          phase={a.phase}
                          size={40 * s}
                          tone="light"
                        />
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              color: COLOR.ink,
                              fontSize: 20 * s,
                              fontWeight: 800,
                              letterSpacing: 0.4 * s,
                            }}
                          >
                            {a.name}
                          </div>
                          <div
                            style={{
                              color: COLOR.stem,
                              fontSize: 16 * s,
                              fontWeight: 500,
                              marginTop: 1 * s,
                            }}
                          >
                            {a.role}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
