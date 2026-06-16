"use client";

import { AdditiveBlending, BackSide } from "three";

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
  shape: "spire" | "tower" | "island";
  opacity: number;
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
  { position: [-118, 1.4, -178], scale: [13, 24, 11], shape: "spire", opacity: 0.16 },
  { position: [-76, 0.9, -214], scale: [20, 9, 18], shape: "island", opacity: 0.12 },
  { position: [-42, 1.2, -192], scale: [7, 30, 7], shape: "tower", opacity: 0.14 },
  { position: [63, 1.1, -202], scale: [10, 38, 10], shape: "spire", opacity: 0.13 },
  { position: [127, 1, -184], scale: [22, 12, 19], shape: "island", opacity: 0.11 },
];

const citadelMasses: CitadelMass[] = [
  {
    position: [0, 0.85, 0],
    geometry: "cylinder",
    args: [12.4, 16.5, 1.7, 12],
    color: "#100d11",
    roughness: 0.74,
    metalness: 0.2,
    receiveShadow: true,
  },
  {
    position: [0, 3.05, 0],
    geometry: "cylinder",
    args: [9.2, 12.4, 4.4, 12],
    color: "#151116",
    roughness: 0.7,
    metalness: 0.24,
    receiveShadow: true,
  },
  {
    position: [0, 7.3, 0],
    geometry: "cylinder",
    args: [6.5, 9.1, 4.1, 10],
    color: "#171216",
    roughness: 0.66,
    metalness: 0.28,
    receiveShadow: true,
  },
  {
    position: [0, 12.6, 0],
    geometry: "cylinder",
    args: [4.2, 6.3, 6.5, 10],
    color: "#130f13",
    roughness: 0.62,
    metalness: 0.32,
    receiveShadow: true,
  },
  {
    position: [0, 20.8, 0],
    geometry: "cylinder",
    args: [2.2, 4, 9.9, 9],
    color: "#0d0a0f",
    roughness: 0.58,
    metalness: 0.35,
  },
  {
    position: [0, 31.2, 0],
    geometry: "cone",
    args: [1.8, 11.8, 9],
    color: "#09080b",
    roughness: 0.54,
    metalness: 0.38,
  },
  {
    position: [0, 39.4, 0],
    geometry: "cone",
    args: [0.38, 4.6, 8],
    color: "#040305",
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

function distanceMood(position: Vec3): DistanceMood {
  const atmosphericDepth = Math.min(Math.hypot(position[0] * 0.48, position[2] + 18) / 82, 1);

  if (atmosphericDepth > 0.72) {
    return {
      color: "#17100d",
      opacity: 0.34,
      roughness: 0.92,
      emissiveIntensity: 0.01,
    };
  }

  if (atmosphericDepth > 0.45) {
    return {
      color: "#100d0d",
      opacity: 0.54,
      roughness: 0.86,
      emissiveIntensity: 0.016,
    };
  }

  return {
    color: "#08070a",
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
        <meshStandardMaterial color="#020307" roughness={0.18} metalness={0.84} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.17, -70]} scale={[24, 6.6, 1]} renderOrder={-1}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial
          color="#ffad46"
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
          color="#b66c23"
          transparent
          opacity={0.075}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, -16]}>
        <planeGeometry args={[2.6, 120, 1, 1]} />
        <meshBasicMaterial
          color="#7d461b"
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.135, -176]} scale={[140, 42, 1]} renderOrder={-2}>
        <circleGeometry args={[1, 128]} />
        <meshBasicMaterial color="#050507" transparent opacity={0.44} depthWrite={false} fog={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-118, -0.12, -186]} scale={[58, 18, 1]} renderOrder={-2}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color="#030305" transparent opacity={0.56} depthWrite={false} fog={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[132, -0.12, -194]} scale={[64, 20, 1]} renderOrder={-2}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color="#030305" transparent opacity={0.52} depthWrite={false} fog={false} />
      </mesh>
    </group>
  );
}

function CelestialBody() {
  return (
    <group position={[0, 28, -92]}>
      <mesh>
        <circleGeometry args={[30, 128]} />
        <meshBasicMaterial color="#e8952b" transparent opacity={0.88} fog={false} />
      </mesh>
      <mesh position={[0, 0, -0.04]}>
        <circleGeometry args={[38, 128]} />
        <meshBasicMaterial color="#ffb95d" transparent opacity={0.18} depthWrite={false} fog={false} />
      </mesh>
      <mesh position={[0, 0, -0.08]}>
        <circleGeometry args={[55, 128]} />
        <meshBasicMaterial color="#ff9c2e" transparent opacity={0.055} depthWrite={false} fog={false} />
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
          <meshStandardMaterial
            color={mass.color}
            roughness={mass.roughness}
            metalness={mass.metalness}
            emissive="#1a0f07"
            emissiveIntensity={0.035}
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
          <meshBasicMaterial
            color="#ffb04a"
            transparent
            opacity={mass.position[1] > 20 ? 0.045 : 0.09}
            side={BackSide}
            depthWrite={false}
            blending={AdditiveBlending}
            fog={false}
          />
        </mesh>
      ))}

      {verticalAccents.map(({ position, radius, height }) => (
        <mesh key={position.join("-")} position={position} castShadow>
          <coneGeometry args={[radius, height, 7]} />
          <meshStandardMaterial
            color="#08070a"
            roughness={0.58}
            metalness={0.35}
            transparent={position[1] > 16}
            opacity={position[1] > 16 ? 0.68 : 0.92}
          />
        </mesh>
      ))}

      <mesh position={[0, 3.2, 6.4]}>
        <boxGeometry args={[2.6, 5.4, 0.42]} />
        <meshBasicMaterial color="#f2a436" transparent opacity={0.48} />
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
          <meshBasicMaterial color="#130f0d" transparent opacity={opacity} depthWrite={false} />
        </mesh>
      ) : (
        <>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.34, shape === "spire" ? 0.55 : 0.48, 0.7, 5]} />
            <meshBasicMaterial color="#15100d" transparent opacity={opacity} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0.96, 0]}>
            <coneGeometry args={[shape === "spire" ? 0.46 : 0.34, shape === "spire" ? 1.18 : 0.78, 5]} />
            <meshBasicMaterial color="#100d0c" transparent opacity={opacity * 0.9} depthWrite={false} />
          </mesh>
        </>
      )}
    </group>
  );
}

function DistantSilhouetteLayer() {
  return (
    <group>
      {distantSilhouettes.map((silhouette) => (
        <DistantStructure key={silhouette.position.join("-")} {...silhouette} />
      ))}
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
            <meshStandardMaterial
              color={mood.color}
              roughness={mood.roughness}
              metalness={0.22}
              emissive="#211207"
              emissiveIntensity={mood.emissiveIntensity}
              transparent={mood.opacity < 1}
              opacity={mood.opacity}
            />
          </mesh>
        );
      })}

      <mesh position={[0, height * 0.78, 0]} castShadow>
        <coneGeometry args={[radius * 0.62, height * 0.56, 7]} />
        <meshStandardMaterial
          color={mood.color}
          roughness={Math.max(0.6, mood.roughness - 0.08)}
          metalness={0.3}
          emissive="#211207"
          emissiveIntensity={mood.emissiveIntensity}
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
      <meshStandardMaterial
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
      <DistantSilhouetteLayer />
      <CentralCitadel />

      {supportingSpires.map((spire) => (
        <SupportingSpire key={spire.position.join("-")} {...spire} />
      ))}

      {rockFormations.map((rock) => (
        <RockFormation key={rock.position.join("-")} {...rock} />
      ))}
    </group>
  );
}
