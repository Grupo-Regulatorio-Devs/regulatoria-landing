import React from "react";
import { Composition } from "remotion";
import { PromoVideo, getPromoDuration } from "./components/promo/PromoVideo";
import {
  LaunchVideo,
  LAUNCH_DURATION,
  launchSchema,
} from "./components/launch/LaunchVideo";
import { promoSchema, type PromoProps } from "./types";
import { FORMATS } from "./themes/brands";

const regulatoriaLaunch: PromoProps = {
  brand: "regulatoria",
  mode: "dark",
  format: "horizontal",
  eyebrow: "Plataforma AI-Native · Chile y LATAM",
  problem:
    "Registrar un agroquímico toma años. Miles de páginas, una norma distinta por país, plazos que vencen sin aviso.",
  tagline: "El software que automatiza tu registro de agroquímicos.",
  orchestratorLabel: "ORQUESTADOR",
  agents: [
    { name: "COMPASS", role: "Estrategia regulatoria" },
    { name: "PREDICT", role: "Toxicología in-silico" },
    { name: "GENESIS", role: "Moléculas safe-by-design" },
    { name: "SCOUT", role: "Vigilancia 24/7" },
    { name: "BINDER", role: "Armado del dossier" },
    { name: "AUDITOR", role: "Validación GLP/OECD" },
    { name: "DEFENDER", role: "Defensa técnica" },
    { name: "SCRIBE", role: "FDS y etiquetas GHS" },
    { name: "BRIDGE", role: "Armonización multi-país" },
    { name: "GUARD", role: "Vigilancia de licencias" },
  ],
  features: [
    {
      title: "Tres fases. Cero fricción.",
      description:
        "Del análisis de viabilidad al expediente presentado, en un solo flujo automatizado.",
      icon: "◇",
    },
    {
      title: "La IA no firma sola.",
      description:
        "100% de los entregables validados por expertos regulatorios humanos. HITL en cada etapa crítica.",
      icon: "◆",
    },
    {
      title: "Tus datos, blindados.",
      description:
        "Seguridad enterprise y trazabilidad completa sobre información regulatoria confidencial.",
      icon: "▣",
    },
  ],
  stats: [
    { value: 80, suffix: "%", label: "Reducción de tiempos" },
    { value: 3.2, suffix: "x", label: "ROI estimado" },
    { value: 1248, label: "Horas ahorradas al mes" },
  ],
  coverageTitle: "Una plataforma. Cinco países.",
  // Capital-city coordinates; markers are projected onto the LATAM outline.
  // labelSide keeps Chile and Argentina from colliding at the Southern Cone.
  regions: [
    { flag: "🇲🇽", country: "México", authority: "COFEPRIS", lon: -99.1, lat: 19.4, labelSide: "left" },
    { flag: "🇨🇴", country: "Colombia", authority: "ICA", lon: -74.1, lat: 4.7, labelSide: "left" },
    { flag: "🇧🇷", country: "Brasil", authority: "ANVISA / MAPA", lon: -47.9, lat: -15.8, labelSide: "right" },
    { flag: "🇨🇱", country: "Chile", authority: "SAG", lon: -70.7, lat: -33.5, labelSide: "left" },
    { flag: "🇦🇷", country: "Argentina", authority: "SENASA", lon: -58.4, lat: -34.6, labelSide: "right" },
  ],
  ctaText: "Obtén tu demo gratis",
  ctaUrl: "gruporegulatorio.cl",
  ctaFootnote: "Sin contratos de largo plazo · Experto regulatorio incluido",
};

const regulatoriaLaunchLight: PromoProps = {
  ...regulatoriaLaunch,
  mode: "light",
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* The brand-system launch film — alternates dark brand ground with light
          product ground, per the Guía de Marca surface rules. */}
      <Composition
        id="LaunchVideo"
        component={LaunchVideo}
        schema={launchSchema}
        defaultProps={{ format: "horizontal" as const }}
        fps={30}
        durationInFrames={LAUNCH_DURATION}
        width={FORMATS.horizontal.width}
        height={FORMATS.horizontal.height}
        calculateMetadata={({ props }) => {
          const { width, height } = FORMATS[props.format ?? "horizontal"];
          return { durationInFrames: LAUNCH_DURATION, width, height };
        }}
      />
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        schema={promoSchema}
        defaultProps={regulatoriaLaunch}
        fps={30}
        durationInFrames={getPromoDuration(regulatoriaLaunch)}
        width={FORMATS.horizontal.width}
        height={FORMATS.horizontal.height}
        calculateMetadata={({ props }) => {
          const { width, height } = FORMATS[props.format ?? "horizontal"];
          return {
            durationInFrames: getPromoDuration(props),
            width,
            height,
          };
        }}
      />
      <Composition
        id="PromoVideoLight"
        component={PromoVideo}
        schema={promoSchema}
        defaultProps={regulatoriaLaunchLight}
        fps={30}
        durationInFrames={getPromoDuration(regulatoriaLaunchLight)}
        width={FORMATS.horizontal.width}
        height={FORMATS.horizontal.height}
        calculateMetadata={({ props }) => {
          const { width, height } = FORMATS[props.format ?? "horizontal"];
          return {
            durationInFrames: getPromoDuration(props),
            width,
            height,
          };
        }}
      />
    </>
  );
};
