export type MaterialFamilyId =
  | "obsidianMatter"
  | "celestialGold"
  | "blackWater"
  | "atmosphericMatter"
  | "weatheredRemnants";

type MaterialFamily = {
  id: MaterialFamilyId;
  name: string;
  purpose: string;
  characteristics: string[];
  rule: string;
};

export const materialFamilies: Record<MaterialFamilyId, MaterialFamily> = {
  obsidianMatter: {
    id: "obsidianMatter",
    name: "Obsidian Matter",
    purpose: "Primary structural material for the Citadel and major forms.",
    characteristics: ["near black", "slightly metallic", "sharp silhouettes", "ancient"],
    rule: "Dark mass dominates; silhouette reads before surface detail.",
  },
  celestialGold: {
    id: "celestialGold",
    name: "Celestial Gold",
    purpose: "Primary accent and energy material for deliberate hierarchy.",
    characteristics: ["warm emissive gold", "high contrast", "rare", "focal"],
    rule: "Use sparingly on light, thresholds, sacred accents, and focal points.",
  },
  blackWater: {
    id: "blackWater",
    name: "Black Water",
    purpose: "Reflective connective layer for depth and atmosphere.",
    characteristics: ["dark", "reflective", "gold-responsive", "mirror-like"],
    rule: "Reflections are part of the world identity, not a background effect.",
  },
  atmosphericMatter: {
    id: "atmosphericMatter",
    name: "Atmospheric Matter",
    purpose: "Scale amplifier through mist, dust, haze, and diffusion.",
    characteristics: ["mist", "dust", "haze", "light diffusion"],
    rule: "Atmosphere behaves as a material layer that exceeds rendered geometry.",
  },
  weatheredRemnants: {
    id: "weatheredRemnants",
    name: "Weathered Remnants",
    purpose: "Aged outer-region matter for distant structures and fragments.",
    characteristics: ["rough", "eroded", "reduced contrast", "decayed"],
    rule: "Outer forms lose contrast and become rougher with distance.",
  },
};

export const materialLanguage = {
  obsidianMatter: {
    base: "#070608",
    low: "#090708",
    mid: "#0d0b0d",
    upper: "#130f13",
    edge: "#181216",
    warmEmissive: "#1a0f07",
    rimGold: "#ffb04a",
    metalness: 0.36,
    roughness: 0.58,
  },
  celestialGold: {
    core: "#f2a436",
    body: "#e8952b",
    halo: "#ffb95d",
    reflection: "#ffad46",
    reflectedDeep: "#b66c23",
    trace: "#7d461b",
    signalWarm: "#dca35c",
    signalMuted: "#c98b46",
    lightning: "#ffbe6a",
  },
  blackWater: {
    surface: "#020307",
    deep: "#030305",
    farMirror: "#050507",
    metalness: 0.88,
    roughness: 0.12,
  },
  atmosphericMatter: {
    fog: "#08070a",
    lowHaze: "#14100d",
    warmHaze: "#20160e",
    deepHaze: "#07070a",
    horizon: "#050507",
    particleGold: "#d6a45f",
    mistWarm: "#332416",
    skyWarm: "#2b201b",
    groundDark: "#020204",
    ambientWarm: "#1f1814",
    lowBounce: "#37210f",
    deepBounce: "#130d13",
  },
  weatheredRemnants: {
    near: "#0b090a",
    mid: "#100c0a",
    far: "#15100d",
    horizon: "#0a090b",
    mutedWarm: "#130f0d",
    metalness: 0.06,
    roughness: 0.94,
  },
} as const;

export const preliminaryMaterialRules = [
  "Dark materials dominate.",
  "Gold is rare and intentional.",
  "Atmosphere is a material.",
  "Reflections are part of world identity.",
  "Silhouette is more important than texture detail.",
] as const;
