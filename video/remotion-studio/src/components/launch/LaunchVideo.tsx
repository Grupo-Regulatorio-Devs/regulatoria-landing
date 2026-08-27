import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { formatSchema } from "../../types";
import { GRADIENT } from "../../themes/regulatoria";
import { HeadlineScene } from "./scenes/HeadlineScene";
import { WordmarkScene } from "./scenes/WordmarkScene";
import { DashboardScene } from "./scenes/DashboardScene";
import { AgentsScene } from "./scenes/AgentsScene";
import { PhasesScene } from "./scenes/PhasesScene";
import { MetricsScene } from "./scenes/MetricsScene";
import { MapScene } from "./scenes/MapScene";
import { OutroScene } from "./scenes/OutroScene";

// Load only the weights the brand system actually uses. Calling loadFont() bare
// fetches every weight and subset — 126 requests that stall each render.
loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const launchSchema = z.object({
  format: formatSchema.default("horizontal"),
});

export type LaunchProps = z.infer<typeof launchSchema>;

/**
 * Scene lengths in frames at 30fps. Dark and light sections alternate on
 * purpose: the brand assigns light ground to product surfaces and dark ground
 * to brand, coverage and closing moments, and the contrast paces the film.
 */
// YC-style pacing: hook lands inside 3s, no beat overstays, and the product
// (dashboard) holds the largest share of screen time.
const T = {
  hook: 85,
  wordmark: 70,
  tagline: 80,
  dashboard: 235,
  agents: 160,
  phases: 150,
  hitl: 105,
  metrics: 125,
  map: 150,
  outro: 140,
};

export const LAUNCH_DURATION = Object.values(T).reduce((a, b) => a + b, 0);

export const LaunchVideo: React.FC<LaunchProps> = () => {
  return (
    <AbsoluteFill style={{ background: GRADIENT.deepField }}>
      <Series>
        <Series.Sequence durationInFrames={T.hook}>
          <HeadlineScene
            tone="dark"
            eyebrow="Plataforma AI-Native · Chile y LATAM"
            words={[
              { t: "Registrar" },
              { t: "un" },
              { t: "agroquímico" },
              { t: "toma" },
              { t: "años.", hot: true },
            ]}
            sub="Miles de páginas por dossier. Una norma distinta en cada país. Plazos que vencen sin aviso."
            durationInFrames={T.hook}
          />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.wordmark}>
          <WordmarkScene
            descriptor="Registro de agroquímicos · AI-native"
            durationInFrames={T.wordmark}
          />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.tagline}>
          <HeadlineScene
            tone="dark"
            words={[
              { t: "El" },
              { t: "software" },
              { t: "que" },
              { t: "automatiza", hot: true },
              { t: "tu", hot: true },
              { t: "registro", hot: true },
              { t: "de" },
              { t: "agroquímicos." },
            ]}
            durationInFrames={T.tagline}
          />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.dashboard}>
          <DashboardScene durationInFrames={T.dashboard} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.agents}>
          <AgentsScene durationInFrames={T.agents} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.phases}>
          <PhasesScene durationInFrames={T.phases} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.hitl}>
          <HeadlineScene
            tone="dark"
            eyebrow="Validación humana · HITL"
            words={[
              { t: "Tú", hot: true },
              { t: "supervisas,", hot: true },
              { t: "la" },
              { t: "IA" },
              { t: "trabaja." },
            ]}
            sub="Cada dossier pasa por un experto regulatorio real antes de llegar a la autoridad. HITL no es un checkbox."
            durationInFrames={T.hitl}
          />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.metrics}>
          <MetricsScene durationInFrames={T.metrics} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.map}>
          <MapScene durationInFrames={T.map} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.outro}>
          <OutroScene durationInFrames={T.outro} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
