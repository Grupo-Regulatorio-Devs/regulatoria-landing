import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AGENTS, COLOR, FONT, GRADIENT, RADIUS } from "../../../themes/regulatoria";
import { AgentIcon, Ground, useScale } from "../ui";
import {
  EASE_OUT,
  fadeIn,
  sceneOpacity,
  springPop,
} from "../../../lib/animations";

/**
 * "Un orquestador. 10 agentes. 3 fases." The ring turns slowly; each agent's
 * spoke draws outward from the hub before the node lands, so the hierarchy
 * reads as assignment rather than a flat list. Circle tint carries the phase.
 */
export const AgentsScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = useScale();

  const cx = width / 2;
  const cy = height / 2 + 42 * s;
  const radius = Math.min(width, height) * 0.335;
  const rotation = frame * 0.1;
  const hub = springPop(frame, fps, 6);

  const nodeAt = (i: number) => {
    const angle =
      ((i / AGENTS.length) * 360 + rotation - 90) * (Math.PI / 180);
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  };

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Ground tone="dark" glowY={0.52} />

      <div
        style={{
          position: "absolute",
          top: 62 * s,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT,
          color: "#FFFFFF",
          fontSize: 54 * s,
          fontWeight: 900,
          letterSpacing: -0.03 * 54 * s,
          opacity: fadeIn(frame, 0, 14),
        }}
      >
        Un orquestador. 10 agentes. 3 fases.
      </div>

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={COLOR.sprout}
          strokeWidth={1}
          strokeDasharray="6 10"
          opacity={0.22 * fadeIn(frame, 10, 20)}
        />
        {AGENTS.map((a, i) => {
          const n = nodeAt(i);
          const delay = 16 + i * 4;
          const draw = interpolate(frame, [delay, delay + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          });
          return (
            <line
              key={a.name}
              x1={cx}
              y1={cy}
              x2={cx + (n.x - cx) * draw}
              y2={cy + (n.y - cy) * draw}
              stroke={COLOR.sprout}
              strokeWidth={1.4}
              opacity={0.34}
            />
          );
        })}
      </svg>

      {/* Orchestrator hub */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: `translate(-50%, -50%) scale(${hub})`,
          width: 196 * s,
          height: 196 * s,
          borderRadius: "50%",
          background: GRADIENT.cta,
          boxShadow: `0 0 ${80 * s}px rgba(123,201,80,0.35)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily: FONT,
          padding: 18 * s,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 22 * s,
            fontWeight: 900,
            letterSpacing: 1.5 * s,
          }}
        >
          ORQUESTADOR
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: 14.5 * s,
            fontWeight: 500,
            marginTop: 8 * s,
            lineHeight: 1.35,
          }}
        >
          asigna el agente correcto
          <br />
          en cada etapa
        </div>
      </div>

      {/* Agent nodes */}
      {AGENTS.map((a, i) => {
        const n = nodeAt(i);
        const delay = 22 + i * 4;
        const pop = springPop(frame, fps, delay);
        return (
          <div
            key={a.name}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              transform: `translate(-50%, -50%) scale(${pop})`,
              opacity: fadeIn(frame, delay, 10),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 210 * s,
              fontFamily: FONT,
            }}
          >
            <AgentIcon emoji={a.emoji} phase={a.phase} size={56 * s} tone="dark" />
            <div
              style={{
                marginTop: 9 * s,
                padding: `${6 * s}px ${15 * s}px`,
                borderRadius: RADIUS.pill,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                fontSize: 20 * s,
                fontWeight: 800,
                letterSpacing: 0.8 * s,
                whiteSpace: "nowrap",
              }}
            >
              {a.name}
            </div>
            <div
              style={{
                marginTop: 6 * s,
                color: "rgba(255,255,255,0.62)",
                fontSize: 14.5 * s,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {a.role}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
