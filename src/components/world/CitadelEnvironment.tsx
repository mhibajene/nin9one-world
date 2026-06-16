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

function WaterPlane() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, -54]} receiveShadow>
        <planeGeometry args={[340, 420, 1, 1]} />
        <meshStandardMaterial color="#05070b" roughness={0.22} metalness={0.68} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, -10]}>
        <planeGeometry args={[3.4, 104, 1, 1]} />
        <meshBasicMaterial color="#d08325" transparent opacity={0.11} />
      </mesh>
    </group>
  );
}

function CelestialBody() {
  return (
    <group position={[0, 28, -92]}>
      <mesh>
        <circleGeometry args={[30, 128]} />
        <meshBasicMaterial color="#d98925" transparent opacity={0.78} fog={false} />
      </mesh>
      <mesh position={[0, 0, -0.04]}>
        <circleGeometry args={[38, 128]} />
        <meshBasicMaterial color="#ffae3b" transparent opacity={0.14} fog={false} />
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
            emissive="#1f1207"
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}

      {verticalAccents.map(({ position, radius, height }) => (
        <mesh key={position.join("-")} position={position} castShadow>
          <coneGeometry args={[radius, height, 7]} />
          <meshStandardMaterial color="#08070a" roughness={0.58} metalness={0.35} />
        </mesh>
      ))}

      <mesh position={[0, 3.2, 6.4]}>
        <boxGeometry args={[2.6, 5.4, 0.42]} />
        <meshBasicMaterial color="#f2a436" transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

function SupportingSpire({ position, radius, height, tiers }: SpireBlockout) {
  return (
    <group position={position}>
      {Array.from({ length: tiers }).map((_, index) => {
        const tierHeight = height * (0.34 - index * 0.045);
        const tierRadius = radius * (1 - index * 0.24);
        const y = 0.25 + index * height * 0.24 + tierHeight / 2;

        return (
          <mesh key={index} position={[0, y, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[tierRadius * 0.72, tierRadius, tierHeight, 7]} />
            <meshStandardMaterial color="#0d0b0f" roughness={0.68} metalness={0.26} />
          </mesh>
        );
      })}

      <mesh position={[0, height * 0.78, 0]} castShadow>
        <coneGeometry args={[radius * 0.62, height * 0.56, 7]} />
        <meshStandardMaterial color="#050407" roughness={0.55} metalness={0.34} />
      </mesh>
    </group>
  );
}

function RockFormation({ position, scale, rotation }: RockBlockout) {
  return (
    <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#07070a" roughness={0.86} metalness={0.12} />
    </mesh>
  );
}

export function CitadelEnvironment() {
  return (
    <group>
      <CelestialBody />
      <WaterPlane />
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
