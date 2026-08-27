import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLOR, FONT } from "../../../themes/regulatoria";
import { Emphasis, Eyebrow, Ground, TrustPill, useScale, type Tone } from "../ui";
import { fadeIn, sceneOpacity, slideUp } from "../../../lib/animations";

export type Word = { t: string; hot?: boolean };

/**
 * The typographic beat: eyebrow, a kinetic headline that lands word by word,
 * an optional lead and trust pills. Hero H1 spec — 900, −0.04em, 1.1.
 */
export const HeadlineScene: React.FC<{
  tone: Tone;
  eyebrow?: string;
  words: Word[];
  sub?: string;
  pills?: string[];
  durationInFrames: number;
  align?: "center" | "left";
}> = ({ tone, eyebrow, words, sub, pills, durationInFrames, align = "center" }) => {
  const frame = useCurrentFrame();
  const s = useScale();
  const isDark = tone === "dark";
  const headingSize = 92 * s;
  const centered = align === "center";
  const wordStart = eyebrow ? 12 : 4;

  return (
    <AbsoluteFill style={{ opacity: sceneOpacity(frame, durationInFrames, 10, 14) }}>
      <Ground tone={tone} glowY={0.42} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: centered ? "center" : "flex-start",
          padding: `0 ${130 * s}px`,
          fontFamily: FONT,
          textAlign: centered ? "center" : "left",
        }}
      >
        {eyebrow ? (
          <Eyebrow
            tone={tone}
            style={{
              opacity: fadeIn(frame, 0, 12),
              transform: `translateY(${slideUp(frame, 0, 18, 16 * s)}px)`,
              marginBottom: 38 * s,
            }}
          >
            {eyebrow}
          </Eyebrow>
        ) : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: `${6 * s}px ${0.3 * headingSize}px`,
            justifyContent: centered ? "center" : "flex-start",
            maxWidth: 1560 * s,
          }}
        >
          {words.map((w, i) => {
            const delay = wordStart + i * 3;
            return (
              <span
                key={`${w.t}-${i}`}
                style={{
                  opacity: fadeIn(frame, delay, 14),
                  transform: `translateY(${slideUp(frame, delay, 22, 28 * s)}px)`,
                  color: isDark ? "#FFFFFF" : COLOR.ink,
                  fontSize: headingSize,
                  fontWeight: 900,
                  letterSpacing: -0.04 * headingSize,
                  lineHeight: 1.15,
                }}
              >
                {w.hot ? <Emphasis>{w.t}</Emphasis> : w.t}
              </span>
            );
          })}
        </div>

        {sub ? (
          <div
            style={{
              marginTop: 34 * s,
              maxWidth: 1120 * s,
              color: isDark ? "rgba(255,255,255,0.72)" : COLOR.stem,
              fontSize: 34 * s,
              fontWeight: 400,
              lineHeight: 1.8,
              opacity: fadeIn(frame, wordStart + words.length * 3 + 6, 16),
              transform: `translateY(${slideUp(frame, wordStart + words.length * 3 + 6, 22, 22 * s)}px)`,
            }}
          >
            {sub}
          </div>
        ) : null}

        {pills && pills.length > 0 ? (
          <div
            style={{
              marginTop: 40 * s,
              display: "flex",
              gap: 14 * s,
              flexWrap: "wrap",
              justifyContent: centered ? "center" : "flex-start",
              opacity: fadeIn(frame, wordStart + words.length * 3 + 18, 16),
            }}
          >
            {pills.map((p) => (
              <TrustPill key={p}>{p}</TrustPill>
            ))}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
