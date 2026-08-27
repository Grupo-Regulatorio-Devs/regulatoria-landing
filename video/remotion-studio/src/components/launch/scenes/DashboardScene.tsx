import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AGENTS,
  COLOR,
  FONT,
  GRADIENT,
  MONO,
  RADIUS,
} from "../../../themes/regulatoria";
import {
  AgentIcon,
  Eyebrow,
  Ground,
  StatusBadge,
  Wordmark,
  useScale,
  type StatusKind,
} from "../ui";
import {
  EASE_OUT,
  fadeIn,
  formatNumber,
  progress,
  sceneOpacity,
  slideUp,
  springPop,
} from "../../../lib/animations";

type Row = {
  product: string;
  code: string;
  country: string;
  authority: string;
  status: StatusKind;
  pct: number;
  due: string;
};

/**
 * The product beat — an animated build of the dossier dashboard. Illustrative
 * demo data, matching the mockup already published on the marketing site.
 * Light ground, because the product itself is a light surface.
 */
export const DashboardScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = useScale();

  const rows: Row[] = [
    {
      product: "Herbex 480 SC",
      code: "REG-CHL-2024-1021",
      country: "🇨🇱 Chile",
      authority: "SAG",
      status: "en-curso",
      pct: 75,
      due: "15/08/2024",
    },
    {
      product: "InsectoMax 20 EC",
      code: "REG-ARG-2024-0877",
      country: "🇦🇷 Argentina",
      authority: "SENASA",
      status: "en-curso",
      pct: 60,
      due: "22/07/2024",
    },
    {
      product: "FungiPro 250 EW",
      code: "REG-BRA-2024-0733",
      country: "🇧🇷 Brasil",
      authority: "ANVISA",
      status: "observado",
      pct: 40,
      due: "05/09/2024",
    },
    {
      product: "BioGuard 100 SL",
      code: "REG-MEX-2024-0512",
      country: "🇲🇽 México",
      authority: "COFEPRIS",
      status: "aprobado",
      pct: 100,
      due: "30/11/2025",
    },
  ];

  const kpis = [
    { label: "Dossiers Activos", value: 42, sub: "↑ +6 vs. mes anterior" },
    { label: "Progreso General", value: 68, suffix: "%", sub: "21/31 en curso" },
    { label: "Tiempo Ahorrado", value: 1248, sub: "horas este mes" },
    { label: "ROI Estimado", value: 3.2, suffix: "x", sub: "retorno sobre inversión" },
  ];

  const panelW = Math.min(width * 0.82, 1580 * s);
  const panelH = 830 * s;
  const panelX = (width - panelW) / 2;
  const panelY = height * 0.13;
  const sidebarW = 268 * s;

  const lift = springPop(frame, fps, 2);
  const barH = 46 * s;

  const cell: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 19 * s,
    color: COLOR.ink,
    fontWeight: 600,
  };

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Ground tone="light" glowY={0.3} />

      <div
        style={{
          position: "absolute",
          top: 52 * s,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: fadeIn(frame, 0, 12),
        }}
      >
        <Eyebrow tone="light">Todo tu proceso en un dashboard</Eyebrow>
      </div>

      {/* Application window */}
      <div
        style={{
          position: "absolute",
          left: panelX,
          top: panelY,
          width: panelW,
          height: panelH,
          transform: `scale(${0.965 + 0.035 * lift})`,
          transformOrigin: "center top",
          opacity: fadeIn(frame, 0, 14),
          background: COLOR.paper,
          border: "1px solid rgba(43,90,20,0.12)",
          borderRadius: RADIUS.panel,
          boxShadow: `0 ${30 * s}px ${80 * s}px rgba(15,26,10,0.13)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            height: barH,
            flexShrink: 0,
            background: COLOR.mist,
            borderBottom: "1px solid rgba(43,90,20,0.10)",
            display: "flex",
            alignItems: "center",
            gap: 8 * s,
            padding: `0 ${18 * s}px`,
          }}
        >
          {["#E4E7E2", "#E4E7E2", "#E4E7E2"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 10 * s,
                height: 10 * s,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
          <div
            style={{
              marginLeft: 14 * s,
              fontFamily: MONO,
              fontSize: 16 * s,
              color: COLOR.stem,
            }}
          >
            🔒 app.regulatoria.cl/dashboard
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          {/* Sidebar */}
          <div
            style={{
              width: sidebarW,
              flexShrink: 0,
              borderRight: "1px solid rgba(43,90,20,0.10)",
              padding: `${20 * s}px ${16 * s}px`,
              display: "flex",
              flexDirection: "column",
              gap: 6 * s,
              background: COLOR.mist,
            }}
          >
            <Wordmark tone="light" fontSize={26 * s} style={{ marginBottom: 14 * s }} />
            <div
              style={{
                fontFamily: FONT,
                fontSize: 14 * s,
                fontWeight: 700,
                letterSpacing: 1.2 * s,
                textTransform: "uppercase",
                color: COLOR.stem,
                margin: `${6 * s}px 0 ${4 * s}px`,
              }}
            >
              Agentes IA
            </div>
            {AGENTS.slice(0, 7).map((a, i) => {
              const delay = 26 + i * 4;
              return (
                <div
                  key={a.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10 * s,
                    padding: `${7 * s}px ${9 * s}px`,
                    borderRadius: RADIUS.buttonSm,
                    background: i === 0 ? "rgba(90,173,45,0.10)" : "transparent",
                    opacity: fadeIn(frame, delay, 10),
                    transform: `translateX(${-10 * s * (1 - progress(frame, delay, 14))}px)`,
                  }}
                >
                  <AgentIcon emoji={a.emoji} phase={a.phase} size={26 * s} tone="light" />
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 16 * s,
                      fontWeight: 700,
                      color: i === 0 ? COLOR.pine : COLOR.stem,
                    }}
                  >
                    {a.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Main column */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              padding: `${22 * s}px ${26 * s}px`,
              display: "flex",
              flexDirection: "column",
              gap: 18 * s,
            }}
          >
            {/* KPI row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14 * s,
              }}
            >
              {kpis.map((k, i) => {
                const delay = 16 + i * 6;
                const p = progress(frame, delay, 30);
                const shown = k.value * p;
                const isDecimal = !Number.isInteger(k.value);
                return (
                  <div
                    key={k.label}
                    style={{
                      background: COLOR.paper,
                      border: "1px solid rgba(43,90,20,0.12)",
                      borderRadius: RADIUS.kpi,
                      padding: `${13 * s}px ${15 * s}px`,
                      opacity: fadeIn(frame, delay, 12),
                      transform: `translateY(${slideUp(frame, delay, 20, 16 * s)}px)`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT,
                        fontSize: 12.5 * s,
                        fontWeight: 700,
                        color: COLOR.stem,
                        textTransform: "uppercase",
                        letterSpacing: 0.8 * s,
                        marginBottom: 6 * s,
                      }}
                    >
                      {k.label}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT,
                        fontSize: 34 * s,
                        fontWeight: 900,
                        color: COLOR.ink,
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1.1,
                      }}
                    >
                      {isDecimal ? shown.toFixed(1) : formatNumber(shown)}
                      {k.suffix ?? ""}
                    </div>
                    <div
                      style={{
                        fontFamily: FONT,
                        fontSize: 13 * s,
                        fontWeight: 600,
                        color: COLOR.moss,
                        marginTop: 4 * s,
                      }}
                    >
                      {k.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                background: COLOR.paper,
                border: "1px solid rgba(43,90,20,0.12)",
                borderRadius: RADIUS.card,
                padding: `${16 * s}px ${18 * s}px`,
                opacity: fadeIn(frame, 34, 14),
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 19 * s,
                  fontWeight: 800,
                  color: COLOR.ink,
                  marginBottom: 12 * s,
                }}
              >
                Registros Regulatorios
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1.2fr 0.9fr 1.1fr 0.9fr",
                  gap: 10 * s,
                  paddingBottom: 9 * s,
                  borderBottom: "1px solid rgba(43,90,20,0.10)",
                  fontFamily: FONT,
                  fontSize: 13 * s,
                  fontWeight: 700,
                  letterSpacing: 0.7 * s,
                  textTransform: "uppercase",
                  color: COLOR.stem,
                }}
              >
                <div>Producto</div>
                <div>País · Autoridad</div>
                <div>Estado</div>
                <div>Progreso</div>
                <div>Vencimiento</div>
              </div>

              {rows.map((r, i) => {
                const delay = 44 + i * 11;
                const bar = interpolate(
                  frame,
                  [delay + 8, delay + 38],
                  [0, r.pct],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: EASE_OUT,
                  },
                );
                return (
                  <div
                    key={r.code}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.5fr 1.2fr 0.9fr 1.1fr 0.9fr",
                      gap: 10 * s,
                      alignItems: "center",
                      padding: `${12 * s}px 0`,
                      borderBottom:
                        i === rows.length - 1
                          ? "none"
                          : "1px solid rgba(43,90,20,0.07)",
                      opacity: fadeIn(frame, delay, 12),
                      transform: `translateY(${slideUp(frame, delay, 20, 18 * s)}px)`,
                    }}
                  >
                    <div>
                      <div style={cell}>{r.product}</div>
                      <div
                        style={{
                          fontFamily: MONO,
                          fontSize: 13.5 * s,
                          color: COLOR.stem,
                          marginTop: 2 * s,
                        }}
                      >
                        {r.code}
                      </div>
                    </div>
                    <div style={{ ...cell, fontWeight: 500 }}>
                      {r.country} · {r.authority}
                    </div>
                    <div>
                      <div
                        style={{
                          transform: `scale(${springPop(frame, fps, delay + 10)})`,
                          transformOrigin: "left center",
                        }}
                      >
                        <StatusBadge kind={r.status} />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 * s }}>
                      <div
                        style={{
                          flex: 1,
                          height: 7 * s,
                          borderRadius: RADIUS.pill,
                          background: "rgba(43,90,20,0.10)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${bar}%`,
                            height: "100%",
                            background: GRADIENT.cta,
                            borderRadius: RADIUS.pill,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 14 * s,
                          color: COLOR.stem,
                          fontVariantNumeric: "tabular-nums",
                          minWidth: 38 * s,
                        }}
                      >
                        {Math.round(bar)}%
                      </span>
                    </div>
                    <div style={{ ...cell, fontWeight: 500, fontSize: 17 * s }}>
                      {r.due}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
