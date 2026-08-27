import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Brand } from "../../../themes/brands";
import type { Region } from "../../../types";
import { Backdrop } from "../../shared/Backdrop";
import {
  EASE_IN_OUT,
  EASE_OUT,
  fadeIn,
  sceneOpacity,
  springPop,
} from "../../../lib/animations";
import { buildPath, createProjector } from "../../../lib/latam";

/**
 * LATAM coverage map. The coastline draws itself in as a single stroke, the
 * landmass fills behind it, then each country marker pops with its regulatory
 * authority. Markers sit at real coordinates projected onto the same outline.
 */
export const CoverageScene: React.FC<{
  brand: Brand;
  regions: Region[];
  title: string;
  durationInFrames: number;
}> = ({ brand, regions, title, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = Math.min(width, height) / 1080;
  const isWide = width > height;

  // Leave the top ~18% for the title; the map fills the rest.
  const boxY = height * 0.19;
  const boxH = height * 0.76;
  const boxW = isWide ? width * 0.42 : width * 0.86;
  const boxX = (width - boxW) / 2;

  const project = createProjector(boxX, boxY, boxW, boxH);
  const path = buildPath(project);

  const draw = interpolate(frame, [8, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const fill = interpolate(frame, [50, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Backdrop brand={brand} glowY={0.55} gridOpacity={0.045} />

      <div
        style={{
          position: "absolute",
          top: 74 * s,
          width: "100%",
          textAlign: "center",
          fontFamily: brand.fontFamily,
          color: brand.text,
          fontSize: 62 * s,
          fontWeight: 900,
          letterSpacing: -2 * s,
          lineHeight: 1.25,
          opacity: fadeIn(frame, 0, 14),
        }}
      >
        {title}
      </div>

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {/* Landmass fill, revealed once the coastline is mostly drawn. */}
        <path d={path} fill={brand.primary} opacity={0.14 * fill} />
        {/* Coastline, drawn on via a normalised dash offset. */}
        <path
          d={path}
          fill="none"
          stroke={brand.primary}
          strokeWidth={2 * s}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
          opacity={0.85}
        />

        {/* Leader lines from each marker out to its label. */}
        {regions.map((r, i) => {
          const p = project(r.lon, r.lat);
          const delay = 66 + i * 8;
          const grow = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          });
          const dir = r.labelSide === "left" ? -1 : 1;
          return (
            <line
              key={r.country}
              x1={p.x}
              y1={p.y}
              x2={p.x + dir * 34 * s * grow}
              y2={p.y}
              stroke={brand.primary}
              strokeWidth={1.5 * s}
              opacity={0.6}
            />
          );
        })}
      </svg>

      {regions.map((r, i) => {
        const p = project(r.lon, r.lat);
        const delay = 66 + i * 8;
        const pop = springPop(frame, fps, delay);
        const isLeft = r.labelSide === "left";
        return (
          <div
            key={r.country}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: "translate(-50%, -50%)",
              opacity: fadeIn(frame, delay, 10),
              fontFamily: brand.fontFamily,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) scale(${pop})`,
                width: 15 * s,
                height: 15 * s,
                borderRadius: "50%",
                backgroundColor: brand.secondary,
                boxShadow: `0 0 ${22 * s}px ${brand.glow}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                [isLeft ? "right" : "left"]: 40 * s,
                transform: `translateY(-50%) scale(${pop})`,
                transformOrigin: isLeft ? "right center" : "left center",
                display: "flex",
                flexDirection: "column",
                alignItems: isLeft ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  padding: `${7 * s}px ${15 * s}px`,
                  borderRadius: 999,
                  backgroundColor: brand.surface,
                  border: `${1.5 * s}px solid ${brand.border}`,
                  color: brand.text,
                  fontSize: 24 * s,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {r.flag} {r.country}
              </div>
              <div
                style={{
                  marginTop: 5 * s,
                  paddingLeft: isLeft ? 0 : 4 * s,
                  paddingRight: isLeft ? 4 * s : 0,
                  color: brand.textDim,
                  fontSize: 18 * s,
                  fontWeight: 600,
                  letterSpacing: 1 * s,
                  whiteSpace: "nowrap",
                }}
              >
                {r.authority}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
