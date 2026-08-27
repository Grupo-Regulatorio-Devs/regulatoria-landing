import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Brand } from "../../../themes/brands";
import type { AgentNode } from "../../../types";
import { Backdrop } from "../../shared/Backdrop";
import {
  EASE_OUT,
  fadeIn,
  sceneOpacity,
  springPop,
} from "../../../lib/animations";

/**
 * The 10 agents orbiting the orchestrator. The ring rotates slowly and each
 * node pops in on a stagger, with its connection line drawing outward from the
 * hub first so the hierarchy reads: orchestrator assigns, agents execute.
 */
export const OrbitScene: React.FC<{
  brand: Brand;
  agents: AgentNode[];
  orchestratorLabel: string;
  title?: string;
  durationInFrames: number;
}> = ({ brand, agents, orchestratorLabel, title, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = Math.min(width, height) / 1080;

  const cx = width / 2;
  const cy = height / 2 + 30 * s;
  const radius = Math.min(width, height) * 0.33;
  const rotation = frame * 0.12;

  const hubPop = springPop(frame, fps, 4);

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Backdrop brand={brand} glowY={0.5} gridOpacity={0.045} />

      {title ? (
        <div
          style={{
            position: "absolute",
            top: 70 * s,
            width: "100%",
            textAlign: "center",
            fontFamily: brand.fontFamily,
            color: brand.accent,
            fontSize: 26 * s,
            fontWeight: 600,
            letterSpacing: 5 * s,
            textTransform: "uppercase",
            opacity: fadeIn(frame, 0, 14),
          }}
        >
          {title}
        </div>
      ) : null}

      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={brand.primary}
          strokeWidth={1}
          strokeDasharray="6 10"
          opacity={0.28 * fadeIn(frame, 8, 20)}
        />
        {agents.map((agent, i) => {
          const angle =
            ((i / agents.length) * 360 + rotation - 90) * (Math.PI / 180);
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          const delay = 14 + i * 4;
          const draw = interpolate(frame, [delay, delay + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          });
          return (
            <line
              key={agent.name}
              x1={cx}
              y1={cy}
              x2={cx + (x - cx) * draw}
              y2={cy + (y - cy) * draw}
              stroke={brand.primary}
              strokeWidth={1.5}
              opacity={0.4}
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
          transform: `translate(-50%, -50%) scale(${hubPop})`,
          width: 190 * s,
          height: 190 * s,
          borderRadius: "50%",
          backgroundColor: brand.surface,
          border: `${2.5 * s}px solid ${brand.primary}`,
          boxShadow: `0 0 ${70 * s}px ${brand.glow}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: brand.fontFamily,
          textAlign: "center",
          padding: 16 * s,
        }}
      >
        <div
          style={{
            color: brand.secondary,
            fontSize: 21 * s,
            fontWeight: 900,
            letterSpacing: 2 * s,
          }}
        >
          {orchestratorLabel}
        </div>
        <div
          style={{
            color: brand.textDim,
            fontSize: 14 * s,
            fontWeight: 500,
            marginTop: 8 * s,
            lineHeight: 1.3,
          }}
        >
          asigna el agente
          <br />
          correcto en cada etapa
        </div>
      </div>

      {/* Agent nodes */}
      {agents.map((agent, i) => {
        const angle =
          ((i / agents.length) * 360 + rotation - 90) * (Math.PI / 180);
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const delay = 20 + i * 4;
        const pop = springPop(frame, fps, delay);
        return (
          <div
            key={agent.name}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${pop})`,
              opacity: fadeIn(frame, delay, 10),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: brand.fontFamily,
              width: 190 * s,
            }}
          >
            <div
              style={{
                padding: `${9 * s}px ${17 * s}px`,
                borderRadius: 999,
                backgroundColor: brand.surface,
                border: `${1.5 * s}px solid ${brand.primary}`,
                color: brand.text,
                fontSize: 21 * s,
                fontWeight: 800,
                letterSpacing: 1 * s,
                whiteSpace: "nowrap",
              }}
            >
              {agent.name}
            </div>
            <div
              style={{
                marginTop: 7 * s,
                color: brand.textDim,
                fontSize: 15 * s,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 1.25,
              }}
            >
              {agent.role}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
