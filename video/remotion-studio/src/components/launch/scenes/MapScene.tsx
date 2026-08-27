import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLOR, FONT, RADIUS } from "../../../themes/regulatoria";
import { Ground, useScale } from "../ui";
import {
  EASE_IN_OUT,
  EASE_OUT,
  fadeIn,
  sceneOpacity,
  springPop,
} from "../../../lib/animations";
import { buildPath, createProjector } from "../../../lib/latam";

type Region = {
  flag: string;
  country: string;
  authority: string;
  lon: number;
  lat: number;
  side: "left" | "right";
};

const REGIONS: Region[] = [
  { flag: "🇲🇽", country: "México", authority: "COFEPRIS", lon: -99.1, lat: 19.4, side: "left" },
  { flag: "🇨🇴", country: "Colombia", authority: "ICA", lon: -74.1, lat: 4.7, side: "left" },
  { flag: "🇧🇷", country: "Brasil", authority: "ANVISA / MAPA", lon: -47.9, lat: -15.8, side: "right" },
  { flag: "🇨🇱", country: "Chile", authority: "SAG", lon: -70.7, lat: -33.5, side: "left" },
  { flag: "🇦🇷", country: "Argentina", authority: "SENASA", lon: -58.4, lat: -34.6, side: "right" },
];

/**
 * Coverage. The coastline draws itself in, the landmass fills behind it, then
 * each authority lands at its real coordinates on the same projection.
 */
export const MapScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = useScale();
  const isWide = width > height;

  const boxY = height * 0.19;
  const boxH = height * 0.75;
  const boxW = isWide ? width * 0.4 : width * 0.84;
  const boxX = (width - boxW) / 2;

  const project = createProjector(boxX, boxY, boxW, boxH);
  const path = buildPath(project);

  const draw = interpolate(frame, [8, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_IN_OUT,
  });
  const fill = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Ground tone="dark" glowY={0.55} />

      <div
        style={{
          position: "absolute",
          top: 70 * s,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT,
          color: "#FFFFFF",
          fontSize: 58 * s,
          fontWeight: 900,
          letterSpacing: -0.03 * 58 * s,
          opacity: fadeIn(frame, 0, 14),
        }}
      >
        Una plataforma. Cinco países.
      </div>

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <path d={path} fill={COLOR.sprout} opacity={0.13 * fill} />
        <path
          d={path}
          fill="none"
          stroke={COLOR.sprout}
          strokeWidth={2 * s}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
          opacity={0.9}
        />
        {REGIONS.map((r, i) => {
          const p = project(r.lon, r.lat);
          const delay = 66 + i * 8;
          const grow = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE_OUT,
          });
          const dir = r.side === "left" ? -1 : 1;
          return (
            <line
              key={r.country}
              x1={p.x}
              y1={p.y}
              x2={p.x + dir * 34 * s * grow}
              y2={p.y}
              stroke={COLOR.sprout}
              strokeWidth={1.5 * s}
              opacity={0.65}
            />
          );
        })}
      </svg>

      {REGIONS.map((r, i) => {
        const p = project(r.lon, r.lat);
        const delay = 66 + i * 8;
        const pop = springPop(frame, fps, delay);
        const isLeft = r.side === "left";
        return (
          <div
            key={r.country}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              transform: "translate(-50%, -50%)",
              opacity: fadeIn(frame, delay, 10),
              fontFamily: FONT,
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
                background: COLOR.sprout,
                boxShadow: `0 0 ${24 * s}px ${COLOR.sprout}`,
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
                  display: "flex",
                  alignItems: "center",
                  gap: 8 * s,
                  padding: `${8 * s}px ${16 * s}px`,
                  borderRadius: RADIUS.pill,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
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
                  color: "rgba(255,255,255,0.62)",
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
