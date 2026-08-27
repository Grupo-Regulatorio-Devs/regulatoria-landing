import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { AGENTS, COLOR, FONT, GRADIENT, MONO, RADIUS } from "../../../themes/regulatoria";
import { AgentIcon, Eyebrow, Ground, StatusBadge, Wordmark, useScale, type StatusKind } from "../../launch/ui";
import { ProgressRing } from "../ProgressRing";
import {
  countTo,
  EASE_IN_OUT_QUINT,
  focusIn,
  formatNumber,
  ramp,
  sceneFade,
  SPRING,
  springAt,
  stagger,
} from "../../../lib/motion";

type Row = {
  product: string;
  code: string;
  country: string;
  authority: string;
  status: StatusKind;
  pct: number;
  due: string;
};

const ROWS: Row[] = [
  { product: "Herbex 480 SC", code: "REG-CHL-2024-1021", country: "🇨🇱 Chile", authority: "SAG", status: "en-curso", pct: 75, due: "15/08/2024" },
  { product: "InsectoMax 20 EC", code: "REG-ARG-2024-0877", country: "🇦🇷 Argentina", authority: "SENASA", status: "en-curso", pct: 60, due: "22/07/2024" },
  { product: "FungiPro 250 EW", code: "REG-BRA-2024-0733", country: "🇧🇷 Brasil", authority: "ANVISA", status: "observado", pct: 40, due: "05/09/2024" },
  { product: "BioGuard 100 SL", code: "REG-MEX-2024-0512", country: "🇲🇽 México", authority: "COFEPRIS", status: "aprobado", pct: 100, due: "30/11/2025" },
];

const KPIS = [
  { label: "Dossiers Activos", value: 42, fill: 0.7, suffix: "" },
  { label: "Progreso General", value: 68, fill: 0.68, suffix: "%" },
  { label: "Horas Ahorradas", value: 1248, fill: 0.9, suffix: "" },
];

const COLS = "1.5fr 1.15fr 0.85fr 1.05fr 0.85fr";

/**
 * The product beat. A slow push-in runs under the whole scene so the frame is
 * never static, and the KPI row uses gauges instead of plain figures.
 * Illustrative demo data, matching the mockup on the marketing site.
 */
export const ProductScene: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = useScale();

  // Continuous camera push — 3% over the whole scene, below conscious notice.
  const push = 1 + 0.03 * ramp(frame, 0, durationInFrames, EASE_IN_OUT_QUINT);
  const lift = springAt(frame, fps, 2, SPRING.glide);

  const panelW = Math.min(width * 0.84, 1600 * s);
  const panelH = 840 * s;

  const cell: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 19 * s,
    color: COLOR.ink,
    fontWeight: 600,
  };

  return (
    <AbsoluteFill style={{ opacity: sceneFade(frame, durationInFrames, 10, 14) }}>
      <Ground tone="light" glowY={0.32} />

      <div
        style={{
          position: "absolute",
          top: 48 * s,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: ramp(frame, 0, 12),
        }}
      >
        <Eyebrow tone="light">Todo tu proceso en un dashboard</Eyebrow>
      </div>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: height * 0.125,
        }}
      >
        <div
          style={{
            width: panelW,
            height: panelH,
            transform: `scale(${push * (0.97 + 0.03 * lift)})`,
            transformOrigin: "center top",
            opacity: ramp(frame, 0, 14),
            filter: focusIn(frame, 0, 22, 8),
            background: COLOR.paper,
            border: "1px solid rgba(43,90,20,0.12)",
            borderRadius: RADIUS.panel,
            boxShadow: `0 ${32 * s}px ${86 * s}px rgba(15,26,10,0.14)`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              height: 46 * s,
              flexShrink: 0,
              background: COLOR.mist,
              borderBottom: "1px solid rgba(43,90,20,0.10)",
              display: "flex",
              alignItems: "center",
              gap: 8 * s,
              padding: `0 ${18 * s}px`,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 10 * s,
                  height: 10 * s,
                  borderRadius: "50%",
                  background: "#E4E7E2",
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
                width: 262 * s,
                flexShrink: 0,
                borderRight: "1px solid rgba(43,90,20,0.10)",
                padding: `${20 * s}px ${15 * s}px`,
                display: "flex",
                flexDirection: "column",
                gap: 5 * s,
                background: COLOR.mist,
              }}
            >
              <Wordmark tone="light" fontSize={25 * s} style={{ marginBottom: 12 * s }} />
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 13.5 * s,
                  fontWeight: 700,
                  letterSpacing: 1.2 * s,
                  textTransform: "uppercase",
                  color: COLOR.stem,
                  margin: `${5 * s}px 0 ${3 * s}px`,
                }}
              >
                Agentes IA
              </div>
              {AGENTS.slice(0, 7).map((a, i) => {
                const delay = stagger(i, 4, 24);
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
                      opacity: ramp(frame, delay, 10),
                      transform: `translateX(${-12 * s * (1 - ramp(frame, delay, 16))}px)`,
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

            {/* Main */}
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
              {/* KPI gauges */}
              <div style={{ display: "flex", gap: 18 * s }}>
                {KPIS.map((k, i) => {
                  const delay = stagger(i, 7, 14);
                  const shown = countTo(frame, k.value, delay, 32);
                  return (
                    <div
                      key={k.label}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 15 * s,
                        background: COLOR.paper,
                        border: "1px solid rgba(43,90,20,0.12)",
                        borderRadius: RADIUS.kpi,
                        padding: `${13 * s}px ${16 * s}px`,
                        opacity: ramp(frame, delay, 12),
                        transform: `translateY(${18 * s * (1 - ramp(frame, delay, 20))}px)`,
                      }}
                    >
                      <ProgressRing
                        progress={k.fill * ramp(frame, delay, 36)}
                        size={62 * s}
                        strokeWidth={7 * s}
                        color={COLOR.moss}
                        trackColor="rgba(43,90,20,0.10)"
                      />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: FONT,
                            fontSize: 12.5 * s,
                            fontWeight: 700,
                            color: COLOR.stem,
                            textTransform: "uppercase",
                            letterSpacing: 0.8 * s,
                          }}
                        >
                          {k.label}
                        </div>
                        <div
                          style={{
                            fontFamily: FONT,
                            fontSize: 33 * s,
                            fontWeight: 900,
                            color: COLOR.ink,
                            fontVariantNumeric: "tabular-nums",
                            lineHeight: 1.15,
                          }}
                        >
                          {formatNumber(shown)}
                          {k.suffix}
                        </div>
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
                  opacity: ramp(frame, 34, 14),
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
                    gridTemplateColumns: COLS,
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

                {ROWS.map((r, i) => {
                  const delay = stagger(i, 11, 44);
                  const bar = r.pct * ramp(frame, delay + 8, 32);
                  return (
                    <div
                      key={r.code}
                      style={{
                        display: "grid",
                        gridTemplateColumns: COLS,
                        gap: 10 * s,
                        alignItems: "center",
                        padding: `${12 * s}px 0`,
                        borderBottom:
                          i === ROWS.length - 1 ? "none" : "1px solid rgba(43,90,20,0.07)",
                        opacity: ramp(frame, delay, 12),
                        transform: `translateY(${18 * s * (1 - ramp(frame, delay, 20))}px)`,
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
                            transform: `scale(${springAt(frame, fps, delay + 10, SPRING.snap)})`,
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
                      <div style={{ ...cell, fontWeight: 500, fontSize: 17 * s }}>{r.due}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
