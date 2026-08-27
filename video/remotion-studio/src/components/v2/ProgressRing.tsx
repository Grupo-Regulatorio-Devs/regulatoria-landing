import React from "react";
import { Pie } from "@remotion/shapes";
import { COLOR, FONT } from "../../themes/regulatoria";

/**
 * Animated progress ring built on <Pie progress=… closePath={false} />, which
 * draws a real arc rather than faking one with a dash offset. Replaces the flat
 * bars from v1 — an arc reads as a gauge, which is what a completion figure is.
 */
export const ProgressRing: React.FC<{
  /** 0–1. */
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
  trackColor: string;
  /** Rendered in the middle of the ring. */
  label?: React.ReactNode;
}> = ({ progress, size, strokeWidth, color, trackColor, label }) => {
  const radius = size / 2 - strokeWidth / 2;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: strokeWidth / 2,
          top: strokeWidth / 2,
          // Pie draws from 12 o'clock clockwise once rotated, matching how a
          // completion gauge is read.
          transform: "rotate(-90deg)",
          transformOrigin: "center",
        }}
      >
        <Pie
          radius={radius}
          progress={Math.max(0.0001, Math.min(1, progress))}
          closePath={false}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </div>
      {label ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            color: COLOR.ink,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
