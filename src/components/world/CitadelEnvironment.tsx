"use client";

import { AdditiveBlending, DoubleSide } from "three";
import { materialLanguage } from "@/data/materials/nin9oneMaterialLanguage";
import {
  BlackWaterMaterial,
  CelestialGoldMaterial,
  CelestialGoldRimMaterial,
  ObsidianMatterMaterial,
  WeatheredRemnantMaterial,
} from "@/components/world/WorldMaterials";

type Vec3 = [number, number, number];

type SpireBlockout = {
  position: Vec3;
  radius: number;
  height: number;
  tiers: number;
};

type RockBlockout = {
  position: Vec3;
  scale: Vec3;
  rotation: Vec3;
};

type DistantSilhouette = {
  position: Vec3;
  scale: Vec3;
  shape: "spire" | "tower" | "island" | "ruin" | "monument";
  opacity: number;
};

type HorizonMass = {
  position: Vec3;
  scale: Vec3;
  rotation: Vec3;
  opacity: number;
};

type RealmLightSignal = {
  position: Vec3;
  scale: Vec3;
  opacity: number;
  color: string;
};

type WaterInterruption = {
  position: Vec3;
  scale: Vec3;
  rotation: Vec3;
  form: "outcrop" | "pillar" | "fragment";
};

type CitadelMass = {
  position: Vec3;
  geometry: "cylinder" | "cone";
  args: [number, number, number, number] | [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
  receiveShadow?: boolean;
};

type VerticalAccent = {
  position: Vec3;
  radius: number;
  height: number;
};

type GoldVein = {
  position: Vec3;
  scale: Vec3;
  rotation: Vec3;
  opacity: number;
};

type SolariObelisk = {
  position: Vec3;
  scale: Vec3;
  rotation: Vec3;
};

type SolariBanner = {
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
  symbolScale: number;
  opacity: number;
};

type SolariSigilTier = "primary" | "architectural" | "decorative";

type SolarMark = {
  position: Vec3;
  rotation: Vec3;
  scale: number;
  opacity: number;
  tier: SolariSigilTier;
};

type DistanceMood = {
  color: string;
  opacity: number;
  roughness: number;
  emissiveIntensity: number;
};

const supportingSpires: SpireBlockout[] = [
  { position: [-38, 0, -16], radius: 2.5, height: 23, tiers: 4 },
  { position: [-25, 0, -36], radius: 1.8, height: 18, tiers: 3 },
  { position: [28, 0, -34], radius: 1.95, height: 19.5, tiers: 3 },
  { position: [43, 0, -14], radius: 2.8, height: 27, tiers: 4 },
  { position: [-18, 0, 13], radius: 1.25, height: 13.5, tiers: 3 },
  { position: [19, 0, 10], radius: 1.4, height: 15, tiers: 3 },
  { position: [-55, 0, -54], radius: 1.85, height: 26, tiers: 3 },
  { position: [58, 0, -50], radius: 2.05, height: 29, tiers: 3 },
  { position: [-7, 0, -61], radius: 1.1, height: 20, tiers: 2 },
  { position: [9, 0, -72], radius: 1.25, height: 22, tiers: 2 },
];

const rockFormations: RockBlockout[] = [
  { position: [-48, 2.4, 2], scale: [12.5, 5.8, 9.2], rotation: [0.2, 0.6, -0.18] },
  { position: [50, 2.7, 0], scale: [13.2, 6.1, 10.4], rotation: [-0.1, -0.48, 0.16] },
  { position: [-31, 1.25, 23], scale: [8.2, 2.8, 6.4], rotation: [0.06, -0.25, 0.12] },
  { position: [32, 1.35, 21], scale: [7.8, 2.95, 5.9], rotation: [0.15, 0.34, -0.08] },
  { position: [-14, 0.72, 31], scale: [4.8, 1.55, 3.8], rotation: [-0.05, 0.8, 0.08] },
  { position: [13, 0.66, 29], scale: [4.2, 1.45, 3.5], rotation: [0.08, -0.6, -0.04] },
  { position: [-67, 3.8, -42], scale: [14.8, 8.2, 11.5], rotation: [0.3, 0.22, -0.22] },
  { position: [69, 3.65, -40], scale: [14.2, 7.5, 12.4], rotation: [-0.25, -0.18, 0.24] },
  { position: [-39, 2.2, -68], scale: [9.5, 5.4, 8.2], rotation: [-0.18, 0.54, -0.16] },
  { position: [42, 2.05, -70], scale: [9.1, 5.1, 8.8], rotation: [0.2, -0.5, 0.14] },
];

const distantSilhouettes: DistantSilhouette[] = [
  { position: [-168, 1.6, -238], scale: [11, 32, 9], shape: "spire", opacity: 0.12 },
  { position: [-132, 1.1, -286], scale: [31, 10, 23], shape: "island", opacity: 0.1 },
  { position: [-96, 1.3, -216], scale: [8, 25, 8], shape: "tower", opacity: 0.13 },
  { position: [-58, 1.1, -258], scale: [18, 18, 13], shape: "ruin", opacity: 0.105 },
  { position: [74, 1.2, -248], scale: [9, 35, 9], shape: "spire", opacity: 0.115 },
  { position: [116, 1.1, -302], scale: [12, 27, 11], shape: "monument", opacity: 0.095 },
  { position: [158, 1, -226], scale: [32, 12, 24], shape: "island", opacity: 0.1 },
  { position: [206, 1.5, -276], scale: [7, 22, 7], shape: "tower", opacity: 0.085 },
];

const horizonMasses: HorizonMass[] = [
  { position: [-236, 0.1, -304], scale: [58, 14, 31], rotation: [0.05, 0.42, -0.04], opacity: 0.18 },
  { position: [-156, 0.2, -336], scale: [74, 18, 38], rotation: [-0.04, -0.18, 0.05], opacity: 0.14 },
  { position: [-28, 0.12, -318], scale: [48, 11, 26], rotation: [0.02, 0.28, 0.02], opacity: 0.12 },
  { position: [104, 0.15, -342], scale: [86, 21, 43], rotation: [-0.03, -0.34, -0.03], opacity: 0.15 },
  { position: [226, 0.08, -308], scale: [62, 16, 34], rotation: [0.04, 0.14, 0.04], opacity: 0.17 },
];

const realmLightSignals: RealmLightSignal[] = [
  { position: [-144, 10.5, -232], scale: [1.1, 1.1, 1], opacity: 0.24, color: materialLanguage.celestialGold.signalWarm },
  { position: [-61, 8.8, -258], scale: [0.8, 0.8, 1], opacity: 0.18, color: materialLanguage.celestialGold.signalMuted },
  { position: [88, 13.5, -250], scale: [1.05, 1.05, 1], opacity: 0.22, color: materialLanguage.celestialGold.signalWarm },
  { position: [121, 6.7, -304], scale: [0.7, 0.7, 1], opacity: 0.16, color: materialLanguage.celestialGold.reflectedDeep },
  { position: [190, 9.2, -278], scale: [0.75, 0.75, 1], opacity: 0.15, color: materialLanguage.celestialGold.signalMuted },
];

const waterInterruptions: WaterInterruption[] = [
  { position: [-82, 0.55, -104], scale: [6.8, 2.6, 4.5], rotation: [0.02, 0.38, -0.05], form: "outcrop" },
  { position: [74, 0.48, -118], scale: [5.6, 2.2, 4.2], rotation: [-0.04, -0.3, 0.06], form: "outcrop" },
  { position: [-46, 0.85, -148], scale: [2.8, 5.8, 2.5], rotation: [0.02, 0.08, -0.06], form: "pillar" },
  { position: [36, 0.58, -164], scale: [7.4, 2.1, 3.1], rotation: [0.05, -0.52, 0.02], form: "fragment" },
  { position: [108, 0.4, -174], scale: [7.2, 1.9, 4.8], rotation: [-0.04, 0.24, -0.03], form: "outcrop" },
];

const citadelMasses: CitadelMass[] = [
  {
    position: [0, 0.85, 0],
    geometry: "cylinder",
    args: [12.4, 16.5, 1.7, 12],
    color: materialLanguage.obsidianMatter.mid,
    roughness: 0.74,
    metalness: 0.2,
    receiveShadow: true,
  },
  {
    position: [0, 3.05, 0],
    geometry: "cylinder",
    args: [9.2, 12.4, 4.4, 12],
    color: materialLanguage.obsidianMatter.edge,
    roughness: 0.7,
    metalness: 0.24,
    receiveShadow: true,
  },
  {
    position: [0, 7.3, 0],
    geometry: "cylinder",
    args: [6.5, 9.1, 4.1, 10],
    color: materialLanguage.obsidianMatter.edge,
    roughness: 0.66,
    metalness: 0.28,
    receiveShadow: true,
  },
  {
    position: [0, 12.6, 0],
    geometry: "cylinder",
    args: [4.2, 6.3, 6.5, 10],
    color: materialLanguage.obsidianMatter.upper,
    roughness: 0.62,
    metalness: 0.32,
    receiveShadow: true,
  },
  {
    position: [0, 20.8, 0],
    geometry: "cylinder",
    args: [2.2, 4, 9.9, 9],
    color: materialLanguage.obsidianMatter.mid,
    roughness: 0.58,
    metalness: 0.35,
  },
  {
    position: [0, 31.2, 0],
    geometry: "cone",
    args: [1.8, 11.8, 9],
    color: materialLanguage.obsidianMatter.low,
    roughness: 0.54,
    metalness: 0.38,
  },
  {
    position: [0, 39.4, 0],
    geometry: "cone",
    args: [0.38, 4.6, 8],
    color: materialLanguage.obsidianMatter.base,
    roughness: 0.46,
    metalness: 0.44,
  },
];

const verticalAccents: VerticalAccent[] = [
  { position: [-7.2, 5.2, -1.6], radius: 1.25, height: 10.4 },
  { position: [7.1, 5.05, -1.35], radius: 1.18, height: 10 },
  { position: [-5.3, 9.7, 1.5], radius: 0.85, height: 13.8 },
  { position: [5.5, 10.2, 1.25], radius: 0.9, height: 14.4 },
  { position: [-3.2, 16.5, -1], radius: 0.62, height: 17.2 },
  { position: [3.1, 17.2, -0.8], radius: 0.66, height: 18.4 },
  { position: [-1.35, 22.5, 1.1], radius: 0.38, height: 18.8 },
  { position: [1.45, 23.4, 0.95], radius: 0.42, height: 20.4 },
];

const solariGoldVeins: GoldVein[] = [
  { position: [0, 6.3, 6.72], scale: [0.1, 3.4, 0.08], rotation: [0, 0, 0], opacity: 0.48 },
  { position: [-3.9, 7.6, 5.56], scale: [0.08, 2.2, 0.06], rotation: [0, -0.36, 0], opacity: 0.34 },
  { position: [3.9, 7.6, 5.56], scale: [0.08, 2.2, 0.06], rotation: [0, 0.36, 0], opacity: 0.34 },
  { position: [-2.6, 14.8, 4.2], scale: [0.07, 3.6, 0.055], rotation: [0, -0.28, 0], opacity: 0.28 },
  { position: [2.6, 14.8, 4.2], scale: [0.07, 3.6, 0.055], rotation: [0, 0.28, 0], opacity: 0.28 },
  { position: [0, 23.8, 2.38], scale: [0.055, 4.8, 0.05], rotation: [0, 0, 0], opacity: 0.22 },
];

const illuminatedSeams: GoldVein[] = [
  { position: [0, 1.96, 9.78], scale: [5.8, 0.055, 0.05], rotation: [0, 0, 0], opacity: 0.16 },
  { position: [0, 5.28, 7.72], scale: [4.4, 0.048, 0.05], rotation: [0, 0, 0], opacity: 0.13 },
  { position: [0, 10.12, 5.45], scale: [3.2, 0.044, 0.05], rotation: [0, 0, 0], opacity: 0.1 },
];

const solariObelisks: SolariObelisk[] = [
  { position: [-18.5, 0, -1.5], scale: [1.5, 14.5, 1.5], rotation: [0, 0.2, 0] },
  { position: [18.5, 0, -1.5], scale: [1.5, 14.5, 1.5], rotation: [0, -0.2, 0] },
  { position: [-13.2, 0, 11.5], scale: [1.05, 9.4, 1.05], rotation: [0, -0.1, 0] },
  { position: [13.2, 0, 11.5], scale: [1.05, 9.4, 1.05], rotation: [0, 0.1, 0] },
];

const solariBanners: SolariBanner[] = [
  { position: [-10.8, 11.6, 5.4], rotation: [0, 0.18, 0.035], scale: [1.7, 3.9, 1], symbolScale: 0.52, opacity: 0.72 },
  { position: [10.8, 11.6, 5.4], rotation: [0, -0.18, -0.035], scale: [1.7, 3.9, 1], symbolScale: 0.52, opacity: 0.72 },
  { position: [0, 17.4, 3.95], rotation: [0, 0, 0.02], scale: [1.35, 3.1, 1], symbolScale: 0.42, opacity: 0.58 },
  { position: [-18.5, 8.4, 8.9], rotation: [0, 0.28, -0.035], scale: [1.15, 3.25, 1], symbolScale: 0.46, opacity: 0.62 },
  { position: [18.5, 8.4, 8.9], rotation: [0, -0.28, 0.035], scale: [1.15, 3.25, 1], symbolScale: 0.46, opacity: 0.62 },
  { position: [-28, 5.4, 16.5], rotation: [0, 0.42, -0.04], scale: [0.92, 2.55, 1], symbolScale: 0.42, opacity: 0.5 },
  { position: [28, 5.4, 16.5], rotation: [0, -0.42, 0.04], scale: [0.92, 2.55, 1], symbolScale: 0.42, opacity: 0.5 },
];

const solarMarks: SolarMark[] = [
  { position: [0, 7.4, 10.2], rotation: [0, 0, 0], scale: 2.9, opacity: 0.82, tier: "primary" },
  { position: [0, 14.2, 4.92], rotation: [0, 0, 0], scale: 1.15, opacity: 0.36, tier: "architectural" },
  { position: [-5.1, 7.7, 5.92], rotation: [0, -0.08, 0], scale: 0.42, opacity: 0.2, tier: "decorative" },
  { position: [5.1, 7.7, 5.92], rotation: [0, 0.08, 0], scale: 0.42, opacity: 0.2, tier: "decorative" },
  { position: [0, 22.8, 2.58], rotation: [0, 0, 0], scale: 0.46, opacity: 0.16, tier: "architectural" },
];

function distanceMood(position: Vec3): DistanceMood {
  const atmosphericDepth = Math.min(Math.hypot(position[0] * 0.48, position[2] + 18) / 82, 1);

  if (atmosphericDepth > 0.72) {
    return {
      color: materialLanguage.weatheredRemnants.far,
      opacity: 0.34,
      roughness: materialLanguage.weatheredRemnants.roughness,
      emissiveIntensity: 0.01,
    };
  }

  if (atmosphericDepth > 0.45) {
    return {
      color: materialLanguage.weatheredRemnants.mid,
      opacity: 0.54,
      roughness: 0.86,
      emissiveIntensity: 0.016,
    };
  }

  return {
    color: materialLanguage.obsidianMatter.low,
    opacity: 0.88,
    roughness: 0.76,
    emissiveIntensity: 0.024,
  };
}

function WaterPlane() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.24, -116]} receiveShadow>
        <planeGeometry args={[620, 780, 1, 1]} />
        <BlackWaterMaterial />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.17, -70]} scale={[24, 6.6, 1]} renderOrder={-1}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.reflection}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.16, -42]} scale={[8.5, 22, 1]} renderOrder={-1}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.reflectedDeep}
          transparent
          opacity={0.075}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>

      <SolariSigil
        position={[0, -0.142, -38]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={5.2}
        opacity={0.032}
        tier="architectural"
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-18, -0.155, -24]} scale={[2.2, 16, 1]} renderOrder={-1}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.signalMuted}
          transparent
          opacity={0.055}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[18, -0.155, -24]} scale={[2.2, 16, 1]} renderOrder={-1}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.signalMuted}
          transparent
          opacity={0.055}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, -16]}>
        <planeGeometry args={[2.6, 120, 1, 1]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.trace}
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.135, -176]} scale={[140, 42, 1]} renderOrder={-2}>
        <circleGeometry args={[1, 128]} />
        <meshBasicMaterial color={materialLanguage.blackWater.farMirror} transparent opacity={0.44} depthWrite={false} fog={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-118, -0.12, -186]} scale={[58, 18, 1]} renderOrder={-2}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color={materialLanguage.blackWater.deep} transparent opacity={0.56} depthWrite={false} fog={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[132, -0.12, -194]} scale={[64, 20, 1]} renderOrder={-2}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color={materialLanguage.blackWater.deep} transparent opacity={0.52} depthWrite={false} fog={false} />
      </mesh>
    </group>
  );
}

function CelestialBody() {
  return (
    <group position={[0, 28, -92]}>
      <mesh>
        <circleGeometry args={[30, 128]} />
        <CelestialGoldMaterial color={materialLanguage.celestialGold.body} opacity={0.88} />
      </mesh>
      <mesh position={[0, 0, -0.04]}>
        <circleGeometry args={[38, 128]} />
        <meshBasicMaterial color={materialLanguage.celestialGold.halo} transparent opacity={0.18} depthWrite={false} fog={false} />
      </mesh>
      <mesh position={[0, 0, -0.08]}>
        <circleGeometry args={[55, 128]} />
        <meshBasicMaterial color={materialLanguage.celestialGold.reflection} transparent opacity={0.055} depthWrite={false} fog={false} />
      </mesh>
    </group>
  );
}

function GoldVeinInlay({ position, scale, rotation, opacity }: GoldVein) {
  return (
    <mesh position={position} scale={scale} rotation={rotation} renderOrder={2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={materialLanguage.celestialGold.core}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={AdditiveBlending}
        fog={false}
      />
    </mesh>
  );
}

type SigilStrokeProps = {
  color?: string;
  opacity: number;
};

function SigilStroke({ color = materialLanguage.celestialGold.core, opacity }: SigilStrokeProps) {
  return (
    <meshBasicMaterial
      color={color}
      transparent
      opacity={opacity}
      depthWrite={false}
      blending={AdditiveBlending}
      fog={false}
    />
  );
}

function SolariSigil({ position, rotation, scale, opacity, tier }: SolarMark) {
  const isPrimary = tier === "primary";
  const isDecorative = tier === "decorative";
  const ringOpacity = isPrimary ? opacity : opacity * 0.78;
  const rayCount = isPrimary ? 24 : 12;
  const markerCount = isDecorative ? 4 : 8;

  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]} renderOrder={3}>
      <mesh>
        <circleGeometry args={[0.16, 36]} />
        <SigilStroke color={materialLanguage.celestialGold.signalWarm} opacity={opacity * 0.92} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <torusGeometry args={[0.3, 0.018, 8, 48]} />
        <SigilStroke opacity={ringOpacity} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <torusGeometry args={[0.56, 0.014, 8, 64]} />
        <SigilStroke opacity={ringOpacity * 0.78} />
      </mesh>
      {!isDecorative && (
        <mesh position={[0, 0, 0.006]} scale={[1.45, 0.48, 1]} rotation={[0, 0, Math.PI * 0.08]}>
          <torusGeometry args={[0.54, 0.01, 8, 64]} />
          <SigilStroke color={materialLanguage.celestialGold.signalMuted} opacity={opacity * 0.52} />
        </mesh>
      )}
      {!isDecorative && (
        <mesh position={[0, 0, 0.004]} scale={[1.45, 0.48, 1]} rotation={[0, 0, -Math.PI * 0.08]}>
          <torusGeometry args={[0.54, 0.01, 8, 64]} />
          <SigilStroke color={materialLanguage.celestialGold.signalMuted} opacity={opacity * 0.42} />
        </mesh>
      )}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.04, isPrimary ? 1.82 : 1.44, 0.028]} />
        <SigilStroke opacity={opacity * 0.86} />
      </mesh>
      <mesh position={[0, 0, 0.018]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.04, isPrimary ? 1.82 : 1.44, 0.028]} />
        <SigilStroke opacity={opacity * 0.72} />
      </mesh>
      {Array.from({ length: rayCount }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / rayCount;
        const majorRay = index % 6 === 0;
        return (
          <mesh key={`ray-${index}`} position={[0, majorRay ? 0.49 : 0.43, 0.016]} rotation={[0, 0, angle]}>
            <boxGeometry args={[majorRay ? 0.026 : 0.014, majorRay ? 0.34 : 0.22, 0.024]} />
            <SigilStroke color={materialLanguage.celestialGold.signalMuted} opacity={opacity * (majorRay ? 0.58 : 0.34)} />
          </mesh>
        );
      })}
      {Array.from({ length: markerCount }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / markerCount;
        const radius = isDecorative ? 0.6 : 0.74;
        return (
          <mesh
            key={`marker-${index}`}
            position={[Math.sin(angle) * radius, Math.cos(angle) * radius, 0.024]}
            rotation={[0, 0, -angle]}
          >
            <circleGeometry args={[index % 2 === 0 ? 0.04 : 0.028, 18]} />
            <SigilStroke color={materialLanguage.celestialGold.halo} opacity={opacity * 0.62} />
          </mesh>
        );
      })}
      {isPrimary && (
        <>
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
            <mesh
              key={`cardinal-${angle}`}
              position={[Math.sin(angle) * 0.98, Math.cos(angle) * 0.98, 0.03]}
              rotation={[0, 0, -angle]}
            >
              <coneGeometry args={[0.055, 0.2, 4]} />
              <SigilStroke color={materialLanguage.celestialGold.core} opacity={opacity * 0.82} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

function SolariObelisk({ position, scale, rotation }: SolariObelisk) {
  const height = scale[1];
  const width = scale[0];

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[width * 0.7, width * 0.92, 0.36, 4]} />
        <ObsidianMatterMaterial color={materialLanguage.obsidianMatter.edge} roughness={0.68} metalness={0.3} />
      </mesh>
      <mesh position={[0, height * 0.48, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[width * 0.34, width * 0.52, height * 0.86, 4]} />
        <ObsidianMatterMaterial color={materialLanguage.obsidianMatter.low} roughness={0.56} metalness={0.38} />
      </mesh>
      <mesh position={[0, height * 0.93, 0]} castShadow>
        <coneGeometry args={[width * 0.38, height * 0.18, 4]} />
        <ObsidianMatterMaterial color={materialLanguage.obsidianMatter.base} roughness={0.5} metalness={0.44} />
      </mesh>
      <GoldVeinInlay
        position={[0, height * 0.53, width * 0.42]}
        scale={[width * 0.055, height * 0.42, 0.04]}
        rotation={[0, 0, 0]}
        opacity={0.22}
      />
      {[0.38, 0.5, 0.62].map((markHeight, index) => (
        <mesh key={`obelisk-glyph-${index}`} position={[0, height * markHeight, width * 0.45]} rotation={[0, 0, index % 2 === 0 ? 0 : Math.PI / 2]}>
          <boxGeometry args={[width * 0.11, height * 0.018, 0.03]} />
          <SigilStroke color={materialLanguage.celestialGold.trace} opacity={0.18 - index * 0.025} />
        </mesh>
      ))}
      <SolariSigil
        position={[0, height * 0.72, width * 0.45]}
        rotation={[0, 0, 0]}
        scale={width * 0.26}
        opacity={0.2}
        tier="decorative"
      />
    </group>
  );
}

function SolariBanner({ position, rotation, scale, symbolScale, opacity }: SolariBanner) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0.55, -0.012]}>
        <boxGeometry args={[1.18, 0.045, 0.035]} />
        <ObsidianMatterMaterial color={materialLanguage.obsidianMatter.base} roughness={0.62} metalness={0.28} />
      </mesh>
      <mesh position={[0, -0.12, 0]} rotation={[0.012, 0, 0]}>
        <planeGeometry args={[0.78, 1.36, 4, 6]} />
        <meshStandardMaterial
          color={materialLanguage.obsidianMatter.low}
          roughness={0.9}
          metalness={0.05}
          transparent
          opacity={opacity}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[-0.46, -0.12, 0.026]}>
        <boxGeometry args={[0.035, 1.18, 0.026]} />
        <SigilStroke color={materialLanguage.celestialGold.trace} opacity={0.2} />
      </mesh>
      <mesh position={[0.46, -0.12, 0.026]}>
        <boxGeometry args={[0.035, 1.18, 0.026]} />
        <SigilStroke color={materialLanguage.celestialGold.trace} opacity={0.2} />
      </mesh>
      <SolariSigil position={[0, -0.08, 0.028]} rotation={[0, 0, 0]} scale={symbolScale} opacity={0.7} tier="architectural" />
      <mesh position={[0, -0.82, 0.03]} scale={[0.52, 0.08, 1]}>
        <circleGeometry args={[1, 36, 0, Math.PI]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.trace}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>
    </group>
  );
}

function CentralCitadel() {
  return (
    <group position={[0, -0.05, -18]}>
      {citadelMasses.map((mass) => (
        <mesh key={`${mass.geometry}-${mass.position.join("-")}`} position={mass.position} castShadow receiveShadow={mass.receiveShadow}>
          {mass.geometry === "cylinder" ? (
            <cylinderGeometry args={mass.args as [number, number, number, number]} />
          ) : (
            <coneGeometry args={mass.args as [number, number, number]} />
          )}
          <ObsidianMatterMaterial
            color={mass.color}
            roughness={mass.roughness}
            metalness={mass.metalness}
          />
        </mesh>
      ))}

      {citadelMasses.map((mass) => (
        <mesh
          key={`rim-${mass.geometry}-${mass.position.join("-")}`}
          position={mass.position}
          scale={[1.026, 1.012, 1.026]}
          renderOrder={1}
        >
          {mass.geometry === "cylinder" ? (
            <cylinderGeometry args={mass.args as [number, number, number, number]} />
          ) : (
            <coneGeometry args={mass.args as [number, number, number]} />
          )}
          <CelestialGoldRimMaterial opacity={mass.position[1] > 20 ? 0.04 : 0.075} />
        </mesh>
      ))}

      {verticalAccents.map(({ position, radius, height }) => (
        <mesh key={position.join("-")} position={position} castShadow>
          <coneGeometry args={[radius, height, 7]} />
          <ObsidianMatterMaterial
            color={materialLanguage.obsidianMatter.low}
            roughness={0.58}
            metalness={0.35}
            transparent={position[1] > 16}
            opacity={position[1] > 16 ? 0.68 : 0.92}
          />
        </mesh>
      ))}

      {solariGoldVeins.map((vein) => (
        <GoldVeinInlay key={`vein-${vein.position.join("-")}`} {...vein} />
      ))}

      {illuminatedSeams.map((seam) => (
        <GoldVeinInlay key={`seam-${seam.position.join("-")}`} {...seam} />
      ))}

      {solarMarks.map((mark) => (
        <SolariSigil key={`mark-${mark.position.join("-")}`} {...mark} />
      ))}

      {solariObelisks.map((obelisk) => (
        <SolariObelisk key={`obelisk-${obelisk.position.join("-")}`} {...obelisk} />
      ))}

      {solariBanners.map((banner) => (
        <SolariBanner key={`banner-${banner.position.join("-")}`} {...banner} />
      ))}

      <SolariSigil
        position={[0, 0.34, 17.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={4.8}
        opacity={0.16}
        tier="primary"
      />

      <mesh position={[0, 3.2, 6.4]}>
        <boxGeometry args={[2.6, 5.4, 0.42]} />
        <CelestialGoldMaterial opacity={0.44} />
      </mesh>
    </group>
  );
}

function DistantStructure({ position, scale, shape, opacity }: DistantSilhouette) {
  return (
    <group position={position} scale={scale}>
      {shape === "island" ? (
        <mesh position={[0, 0.28, 0]} rotation={[0.08, 0.34, -0.04]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={materialLanguage.weatheredRemnants.mutedWarm} transparent opacity={opacity} depthWrite={false} fog={false} />
        </mesh>
      ) : shape === "ruin" ? (
        <>
          <mesh position={[-0.34, 0.46, 0]} rotation={[0.05, 0.08, -0.12]}>
            <boxGeometry args={[0.26, 0.92, 0.24]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.mid} transparent opacity={opacity} depthWrite={false} fog={false} />
          </mesh>
          <mesh position={[0.06, 0.58, 0]} rotation={[0, 0.02, 0.04]}>
            <boxGeometry args={[0.3, 1.16, 0.28]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.far} transparent opacity={opacity * 0.92} depthWrite={false} fog={false} />
          </mesh>
          <mesh position={[0.43, 0.34, 0]} rotation={[-0.02, -0.04, 0.16]}>
            <boxGeometry args={[0.22, 0.68, 0.22]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.near} transparent opacity={opacity * 0.78} depthWrite={false} fog={false} />
          </mesh>
        </>
      ) : shape === "monument" ? (
        <>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.34, 0.48, 0.7, 5]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.mutedWarm} transparent opacity={opacity} depthWrite={false} fog={false} />
          </mesh>
          <mesh position={[0, 0.86, 0]}>
            <boxGeometry args={[0.58, 0.72, 0.38]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.far} transparent opacity={opacity * 0.82} depthWrite={false} fog={false} />
          </mesh>
          <mesh position={[0, 1.33, 0]}>
            <coneGeometry args={[0.34, 0.66, 5]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.near} transparent opacity={opacity * 0.68} depthWrite={false} fog={false} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.34, shape === "spire" ? 0.55 : 0.48, 0.7, 5]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.far} transparent opacity={opacity} depthWrite={false} fog={false} />
          </mesh>
          <mesh position={[0, 0.96, 0]}>
            <coneGeometry args={[shape === "spire" ? 0.46 : 0.34, shape === "spire" ? 1.18 : 0.78, 5]} />
            <meshBasicMaterial color={materialLanguage.weatheredRemnants.mid} transparent opacity={opacity * 0.9} depthWrite={false} fog={false} />
          </mesh>
        </>
      )}
    </group>
  );
}

function HorizonInterestLayer() {
  return (
    <group>
      {horizonMasses.map((mass) => (
        <mesh
          key={mass.position.join("-")}
          position={mass.position}
          scale={mass.scale}
          rotation={mass.rotation}
          renderOrder={-6}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={materialLanguage.weatheredRemnants.horizon} transparent opacity={mass.opacity} depthWrite={false} fog={false} />
        </mesh>
      ))}
    </group>
  );
}

function OuterRealmStructureLayer() {
  return (
    <group>
      {distantSilhouettes.map((silhouette) => (
        <DistantStructure key={silhouette.position.join("-")} {...silhouette} />
      ))}
    </group>
  );
}

function RealmLightSignals() {
  return (
    <group>
      {realmLightSignals.map((signal) => (
        <sprite key={signal.position.join("-")} position={signal.position} scale={signal.scale} renderOrder={-3}>
          <spriteMaterial
            color={signal.color}
            transparent
            opacity={signal.opacity}
            depthWrite={false}
            blending={AdditiveBlending}
            fog={false}
          />
        </sprite>
      ))}
    </group>
  );
}

function WaterInterruption({ position, scale, rotation, form }: WaterInterruption) {
  const opacity = position[2] < -140 ? 0.2 : 0.32;

  if (form === "pillar") {
    return (
      <group position={position} scale={scale} rotation={rotation}>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.72, 5]} />
          <meshBasicMaterial color={materialLanguage.weatheredRemnants.near} transparent opacity={opacity} depthWrite={false} />
        </mesh>
        <mesh position={[0.2, 0.94, 0.06]} rotation={[0.04, 0, 0.12]}>
          <boxGeometry args={[0.18, 0.42, 0.16]} />
          <meshBasicMaterial color={materialLanguage.weatheredRemnants.mutedWarm} transparent opacity={opacity * 0.78} depthWrite={false} />
        </mesh>
      </group>
    );
  }

  if (form === "fragment") {
    return (
      <group position={position} scale={scale} rotation={rotation}>
        <mesh position={[0, 0.16, 0]} rotation={[0.06, 0.12, -0.03]}>
          <boxGeometry args={[0.92, 0.24, 0.42]} />
          <meshBasicMaterial color={materialLanguage.weatheredRemnants.mid} transparent opacity={opacity * 0.78} depthWrite={false} />
        </mesh>
        <mesh position={[-0.34, 0.44, 0.04]} rotation={[0.04, -0.08, -0.12]}>
          <boxGeometry args={[0.22, 0.62, 0.2]} />
          <meshBasicMaterial color={materialLanguage.weatheredRemnants.near} transparent opacity={opacity * 0.68} depthWrite={false} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <WeatheredRemnantMaterial
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function RealmWaterInterruptions() {
  return (
    <group>
      {waterInterruptions.map((interruption) => (
        <WaterInterruption key={interruption.position.join("-")} {...interruption} />
      ))}
    </group>
  );
}

function ForegroundScaleReference() {
  return (
    <group position={[-28, 0.18, 41]} rotation={[0, -0.38, 0]} scale={[1.8, 1.8, 1.8]}>
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[7.4, 0.18, 3.1]} />
        <WeatheredRemnantMaterial color={materialLanguage.weatheredRemnants.near} roughness={0.9} metalness={0.12} />
      </mesh>
      {Array.from({ length: 4 }).map((_, index) => (
        <mesh key={index} position={[2.3 - index * 1.05, 0.18 + index * 0.12, -1.92 - index * 0.18]} receiveShadow>
          <boxGeometry args={[1.05, 0.2, 1.8]} />
          <WeatheredRemnantMaterial color={materialLanguage.weatheredRemnants.mid} roughness={0.88} metalness={0.12} />
        </mesh>
      ))}
      <mesh position={[-2.9, 0.62, 0.94]} rotation={[0.12, 0.04, -0.18]} castShadow>
        <cylinderGeometry args={[0.24, 0.34, 1.15, 6]} />
        <ObsidianMatterMaterial color={materialLanguage.obsidianMatter.low} roughness={0.84} metalness={0.18} />
      </mesh>
    </group>
  );
}

function SupportingSpire({ position, radius, height, tiers }: SpireBlockout) {
  const mood = distanceMood(position);

  return (
    <group position={position}>
      {Array.from({ length: tiers }).map((_, index) => {
        const tierHeight = height * (0.34 - index * 0.045);
        const tierRadius = radius * (1 - index * 0.24);
        const y = 0.25 + index * height * 0.24 + tierHeight / 2;

        return (
          <mesh key={index} position={[0, y, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[tierRadius * 0.72, tierRadius, tierHeight, 7]} />
            <ObsidianMatterMaterial
              color={mood.color}
              roughness={mood.roughness}
              metalness={0.22}
              transparent={mood.opacity < 1}
              opacity={mood.opacity}
            />
          </mesh>
        );
      })}

      <mesh position={[0, height * 0.78, 0]} castShadow>
        <coneGeometry args={[radius * 0.62, height * 0.56, 7]} />
        <ObsidianMatterMaterial
          color={mood.color}
          roughness={Math.max(0.6, mood.roughness - 0.08)}
          metalness={0.3}
          transparent={mood.opacity < 1}
          opacity={mood.opacity}
        />
      </mesh>
    </group>
  );
}

function RockFormation({ position, scale, rotation }: RockBlockout) {
  const mood = distanceMood(position);

  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <WeatheredRemnantMaterial
        color={mood.color}
        roughness={Math.max(0.86, mood.roughness)}
        metalness={0.08}
        transparent={mood.opacity < 1}
        opacity={mood.opacity}
      />
    </mesh>
  );
}

export function CitadelEnvironment() {
  return (
    <group>
      <CelestialBody />
      <WaterPlane />
      <HorizonInterestLayer />
      <OuterRealmStructureLayer />
      <RealmLightSignals />
      <RealmWaterInterruptions />
      <CentralCitadel />

      {supportingSpires.map((spire) => (
        <SupportingSpire key={spire.position.join("-")} {...spire} />
      ))}

      {rockFormations.map((rock) => (
        <RockFormation key={rock.position.join("-")} {...rock} />
      ))}

      <ForegroundScaleReference />
    </group>
  );
}
