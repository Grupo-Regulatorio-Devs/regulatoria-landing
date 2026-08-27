import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import type { PromoProps } from "../../types";
import { getBrand } from "../../themes/brands";
import { HeroScene } from "./scenes/HeroScene";
import { StatementScene } from "./scenes/StatementScene";
import { OrbitScene } from "./scenes/OrbitScene";
import { FeatureScene } from "./scenes/FeatureScene";
import { StatsScene } from "./scenes/StatsScene";
import { CoverageScene } from "./scenes/CoverageScene";
import { CtaScene } from "./scenes/CtaScene";

loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

/** Scene lengths in frames at 30fps. Exported so duration can be computed. */
export const PROMO_TIMING = {
  hero: 90,
  problem: 90,
  tagline: 90,
  orbit: 165,
  feature: 75,
  stats: 105,
  // The coastline draws for ~2s before the five markers land on a stagger.
  coverage: 180,
  cta: 105,
};

export const getPromoDuration = (props: PromoProps): number => {
  const t = PROMO_TIMING;
  return (
    t.hero +
    (props.problem ? t.problem : 0) +
    t.tagline +
    (props.agents.length > 0 ? t.orbit : 0) +
    props.features.length * t.feature +
    (props.stats.length > 0 ? t.stats : 0) +
    (props.regions.length > 0 ? t.coverage : 0) +
    t.cta
  );
};

export const PromoVideo: React.FC<PromoProps> = (props) => {
  const brand = getBrand(props.brand, props.mode);
  const t = PROMO_TIMING;

  return (
    <AbsoluteFill style={{ backgroundColor: brand.background }}>
      <Series>
        <Series.Sequence durationInFrames={t.hero}>
          <HeroScene
            brand={brand}
            eyebrow={props.eyebrow}
            durationInFrames={t.hero}
          />
        </Series.Sequence>

        {props.problem ? (
          <Series.Sequence durationInFrames={t.problem}>
            <StatementScene
              brand={brand}
              text={props.problem}
              kicker="El problema"
              highlight={["años", "años."]}
              durationInFrames={t.problem}
              align="left"
            />
          </Series.Sequence>
        ) : null}

        <Series.Sequence durationInFrames={t.tagline}>
          <StatementScene
            brand={brand}
            text={props.tagline}
            highlight={["automatiza", "meses.", "meses"]}
            durationInFrames={t.tagline}
          />
        </Series.Sequence>

        {props.agents.length > 0 ? (
          <Series.Sequence durationInFrames={t.orbit}>
            <OrbitScene
              brand={brand}
              agents={props.agents}
              orchestratorLabel={props.orchestratorLabel ?? "ORQUESTADOR"}
              title={`${props.agents.length} agentes especializados`}
              durationInFrames={t.orbit}
            />
          </Series.Sequence>
        ) : null}

        {props.features.map((feature, i) => (
          <Series.Sequence key={feature.title} durationInFrames={t.feature}>
            <FeatureScene
              brand={brand}
              feature={feature}
              index={i}
              total={props.features.length}
              durationInFrames={t.feature}
            />
          </Series.Sequence>
        ))}

        {props.stats.length > 0 ? (
          <Series.Sequence durationInFrames={t.stats}>
            <StatsScene
              brand={brand}
              stats={props.stats}
              title="Resultados"
              durationInFrames={t.stats}
            />
          </Series.Sequence>
        ) : null}

        {props.regions.length > 0 ? (
          <Series.Sequence durationInFrames={t.coverage}>
            <CoverageScene
              brand={brand}
              regions={props.regions}
              title={props.coverageTitle ?? "Cobertura LATAM"}
              durationInFrames={t.coverage}
            />
          </Series.Sequence>
        ) : null}

        <Series.Sequence durationInFrames={t.cta}>
          <CtaScene
            brand={brand}
            ctaText={props.ctaText}
            ctaUrl={props.ctaUrl}
            footnote={props.ctaFootnote}
            durationInFrames={t.cta}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
