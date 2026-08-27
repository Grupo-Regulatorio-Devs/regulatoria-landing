import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { z } from "zod";
import { formatSchema } from "../../types";
import { GRADIENT } from "../../themes/regulatoria";
import { CounterScene } from "./scenes/CounterScene";
import { StackScene } from "./scenes/StackScene";
import { ProductScene } from "./scenes/ProductScene";
import { MetricsRingScene } from "./scenes/MetricsRingScene";
import { WordmarkScene } from "../launch/scenes/WordmarkScene";
import { HeadlineScene } from "../launch/scenes/HeadlineScene";
import { AgentsScene } from "../launch/scenes/AgentsScene";
import { MapScene } from "../launch/scenes/MapScene";
import { OutroScene } from "../launch/scenes/OutroScene";

loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const promoV2Schema = z.object({
  format: formatSchema.default("horizontal"),
});

export type PromoV2Props = z.infer<typeof promoV2Schema>;

/**
 * v2 of the promo. Same brand system as v1, rebuilt around a stronger cold
 * open: instead of stating the problem, it shows the page count running away
 * and the jurisdictions piling up, then cuts to the product as the answer.
 */
const T = {
  counter: 105,
  stack: 130,
  wordmark: 70,
  tagline: 80,
  product: 245,
  agents: 160,
  hitl: 105,
  metrics: 155,
  map: 150,
  outro: 140,
};

export const PROMO_V2_DURATION = Object.values(T).reduce((a, b) => a + b, 0);

export const PromoV2: React.FC<PromoV2Props> = () => {
  return (
    <AbsoluteFill style={{ background: GRADIENT.deepField }}>
      <Series>
        <Series.Sequence durationInFrames={T.counter}>
          <CounterScene durationInFrames={T.counter} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.stack}>
          <StackScene durationInFrames={T.stack} />
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

        <Series.Sequence durationInFrames={T.product}>
          <ProductScene durationInFrames={T.product} />
        </Series.Sequence>

        <Series.Sequence durationInFrames={T.agents}>
          <AgentsScene durationInFrames={T.agents} />
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
          <MetricsRingScene durationInFrames={T.metrics} />
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
