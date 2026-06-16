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

const supportingSpires: SpireBlockout[] = [
  { position: [-14, 0, -7], radius: 1.9, height: 9.5, tiers: 3 },
  { position: [-9, 0, -13], radius: 1.2, height: 6.5, tiers: 2 },
  { position: [10.5, 0, -11], radius: 1.35, height: 7.4, tiers: 2 },
  { position: [17, 0, -6], radius: 2.2, height: 11.2, tiers: 3 },
  { position: [-5.5, 0, 3.5], radius: 0.75, height: 4.8, tiers: 2 },
  { position: [6.2, 0, 2.2], radius: 0.9, height: 5.2, tiers: 2 },
];

const rockFormations: RockBlockout[] = [
  { position: [-24, 1.1, -2], scale: [6.8, 2.4, 5.4], rotation: [0.2, 0.6, -0.18] },
  { position: [24, 1.3, -1.8], scale: [7.4, 2.8, 5.8], rotation: [-0.1, -0.48, 0.16] },
  { position: [-18, 0.55, 9], scale: [4.8, 1.4, 3.8], rotation: [0.06, -0.25, 0.12] },
  { position: [18, 0.62, 8], scale: [4.4, 1.55, 3.4], rotation: [0.15, 0.34, -0.08] },
  { position: [-9, 0.42, 14], scale: [2.8, 0.95, 2.2], rotation: [-0.05, 0.8, 0.08] },
  { position: [7.5, 0.36, 13], scale: [2.4, 0.85, 2], rotation: [0.08, -0.6, -0.04] },
  { position: [-31, 1.8, -13], scale: [7.8, 3.9, 6.4], rotation: [0.3, 0.22, -0.22] },
  { position: [31, 1.65, -12], scale: [7.2, 3.5, 6.8], rotation: [-0.25, -0.18, 0.24] },
];

function WaterPlane() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, -28]} receiveShadow>
        <planeGeometry args={[180, 220, 1, 1]} />
        <meshStandardMaterial color="#05070b" roughness={0.22} metalness={0.68} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.16, 2]}>
        <planeGeometry args={[7, 68, 1, 1]} />
        <meshBasicMaterial color="#b56d1d" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function CelestialBody() {
  return (
    <group position={[0, 13, -38]}>
      <mesh>
        <circleGeometry args={[12, 96]} />
        <meshBasicMaterial color="#d98925" transparent opacity={0.78} />
      </mesh>
      <mesh position={[0, 0, -0.04]}>
        <circleGeometry args={[15.4, 96]} />
        <meshBasicMaterial color="#ffae3b" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function CentralCitadel() {
  return (
    <group position={[0, -0.05, -7]}>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[7.6, 9.8, 1.1, 10]} />
        <meshStandardMaterial color="#100d11" roughness={0.74} metalness={0.2} />
      </mesh>

      <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[5.2, 7, 2.5, 10]} />
        <meshStandardMaterial color="#151116" roughness={0.7} metalness={0.24} />
      </mesh>

      <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.35, 5, 3.4, 9]} />
        <meshStandardMaterial color="#171216" roughness={0.66} metalness={0.28} />
      </mesh>

      <mesh position={[0, 6.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.75, 3.1, 4.1, 8]} />
        <meshStandardMaterial color="#130f13" roughness={0.62} metalness={0.32} />
      </mesh>

      <mesh position={[0, 10.55, 0]} castShadow>
        <coneGeometry args={[1.25, 6.6, 8]} />
        <meshStandardMaterial color="#09080b" roughness={0.54} metalness={0.38} />
      </mesh>

      <mesh position={[0, 14.8, 0]} castShadow>
        <coneGeometry args={[0.26, 2.8, 7]} />
        <meshStandardMaterial color="#040305" roughness={0.46} metalness={0.44} />
      </mesh>

      {[
        [-4.2, 2.3, -0.8, 0.9, 4.6],
        [4.1, 2.15, -0.7, 0.82, 4.2],
        [-2.8, 4.2, 0.95, 0.58, 5.8],
        [3, 4.55, 0.8, 0.64, 6.1],
      ].map(([x, y, z, radius, height]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]} castShadow>
          <coneGeometry args={[radius, height, 7]} />
          <meshStandardMaterial color="#08070a" roughness={0.58} metalness={0.35} />
        </mesh>
      ))}
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
