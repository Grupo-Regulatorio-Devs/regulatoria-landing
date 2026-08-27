import { z } from "zod";

export const brandSchema = z.enum([
  "uranoia",
  "regulatoria",
  "sciensolutions",
  "skinai",
]);

export const formatSchema = z.enum(["vertical", "square", "horizontal"]);

export const featureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const statSchema = z.object({
  /** Numeric target the counter animates to. */
  value: z.number(),
  /** Rendered before the number, e.g. "+". */
  prefix: z.string().optional(),
  /** Rendered after the number, e.g. "%" or "x". */
  suffix: z.string().optional(),
  label: z.string(),
});

export const agentSchema = z.object({
  name: z.string(),
  role: z.string(),
});

export const regionSchema = z.object({
  flag: z.string(),
  country: z.string(),
  authority: z.string(),
  /** Real coordinates — the marker is projected onto the LATAM outline. */
  lon: z.number(),
  lat: z.number(),
  /** Which way the label extends, so neighbours like Chile/Argentina don't collide. */
  labelSide: z.enum(["left", "right"]).default("right"),
});

export const promoSchema = z.object({
  brand: brandSchema,
  mode: z.enum(["dark", "light"]).default("dark"),
  format: formatSchema.default("horizontal"),
  /** Framing line shown before the tagline — the problem being solved. */
  eyebrow: z.string().optional(),
  problem: z.string().optional(),
  tagline: z.string(),
  /** Orbit scene: agents circling a central orchestrator. Omit to skip the scene. */
  orchestratorLabel: z.string().optional(),
  agents: z.array(agentSchema).default([]),
  features: z.array(featureSchema),
  /** Animated counters. Omit to skip the scene. */
  stats: z.array(statSchema).default([]),
  /** Stylised coverage constellation. Omit to skip the scene. */
  coverageTitle: z.string().optional(),
  regions: z.array(regionSchema).default([]),
  ctaText: z.string().default("Agenda una demo"),
  ctaUrl: z.string().optional(),
  ctaFootnote: z.string().optional(),
});

export type PromoProps = z.infer<typeof promoSchema>;
export type Feature = z.infer<typeof featureSchema>;
export type Stat = z.infer<typeof statSchema>;
export type AgentNode = z.infer<typeof agentSchema>;
export type Region = z.infer<typeof regionSchema>;
