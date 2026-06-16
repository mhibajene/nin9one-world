"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, CanvasTexture, FogExp2, type Points } from "three";

type HazePlane = {
  name: string;
  position: [number, number, number];
  size: [number, number];
  color: string;
  opacity: number;
};

const hazePlanes: HazePlane[] = [
  {
    name: "foreground-low-atmosphere",
    position: [0, 9, 5],
    size: [190, 36],
    color: "#14100d",
    opacity: 0.18,
  },
  {
    name: "mid-distance-atmosphere",
    position: [0, 25, -54],
    size: [275, 80],
    color: "#20160e",
    opacity: 0.3,
  },
  {
    name: "deep-distance-atmosphere",
    position: [0, 46, -122],
    size: [410, 126],
    color: "#07070a",
    opacity: 0.68,
  },
  {
    name: "horizon-uncertainty",
    position: [0, 29, -206],
    size: [560, 96],
    color: "#050507",
    opacity: 0.78,
  },
  {
    name: "vertical-crown-fade",
    position: [0, 47, -20],
    size: [118, 88],
    color: "#08070a",
    opacity: 0.38,
  },
];

function createHazeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const radialGradient = context.createRadialGradient(128, 158, 20, 128, 158, 126);
  radialGradient.addColorStop(0, "rgba(255,255,255,0.82)");
  radialGradient.addColorStop(0.42, "rgba(255,255,255,0.42)");
  radialGradient.addColorStop(0.76, "rgba(255,255,255,0.13)");
  radialGradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = radialGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const verticalFade = context.createLinearGradient(0, 0, 0, 256);
  verticalFade.addColorStop(0, "rgba(0,0,0,0)");
  verticalFade.addColorStop(0.22, "rgba(0,0,0,0.22)");
  verticalFade.addColorStop(0.68, "rgba(0,0,0,1)");
  verticalFade.addColorStop(1, "rgba(0,0,0,0.18)");

  context.globalCompositeOperation = "destination-in";
  context.fillStyle = verticalFade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return new CanvasTexture(canvas);
}

function HazeCurtains() {
  const hazeTexture = useMemo(() => {
    if (typeof document === "undefined") {
      return null;
    }

    return createHazeTexture();
  }, []);

  useEffect(() => {
    return () => {
      hazeTexture?.dispose();
    };
  }, [hazeTexture]);

  if (!hazeTexture) {
    return null;
  }

  return (
    <group>
      {hazePlanes.map((plane) => (
        <sprite key={plane.name} position={plane.position} scale={[plane.size[0], plane.size[1], 1]} renderOrder={-8}>
          <spriteMaterial
            map={hazeTexture}
            color={plane.color}
            transparent
            opacity={plane.opacity}
            depthWrite={false}
            fog={false}
          />
        </sprite>
      ))}
    </group>
  );
}

function LowMistBanks() {
  return (
    <group>
      {[
        { position: [-42, 2.2, -10] as const, scale: [38, 5.2, 1] as const, opacity: 0.12 },
        { position: [38, 2.6, -26] as const, scale: [45, 6.4, 1] as const, opacity: 0.1 },
        { position: [0, 2.9, -56] as const, scale: [82, 9.4, 1] as const, opacity: 0.16 },
        { position: [-82, 3.3, -104] as const, scale: [88, 12, 1] as const, opacity: 0.13 },
        { position: [84, 3.1, -116] as const, scale: [96, 12.8, 1] as const, opacity: 0.14 },
        { position: [0, 3.9, -162] as const, scale: [168, 18, 1] as const, opacity: 0.18 },
      ].map((bank) => (
        <mesh
          key={bank.position.join("-")}
          position={bank.position}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={bank.scale}
          renderOrder={-4}
        >
          <circleGeometry args={[1, 96]} />
          <meshBasicMaterial
            color="#332416"
            transparent
            opacity={bank.opacity}
            depthWrite={false}
            fog={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function createParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const seed = index * 16807;
    const distanceBand = index % 3;
    const depthCenter = distanceBand === 0 ? -52 : distanceBand === 1 ? -112 : -176;
    const depthRange = distanceBand === 0 ? 72 : distanceBand === 1 ? 92 : 118;
    const xRange = distanceBand === 0 ? 76 : distanceBand === 1 ? 118 : 170;

    const x = Math.sin(seed * 0.013) * xRange + Math.sin(seed * 0.037) * 18;
    const y = 2.5 + Math.abs(Math.sin(seed * 0.017)) * (distanceBand === 2 ? 52 : 38);
    const z = depthCenter + Math.sin(seed * 0.019) * depthRange;

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
  }

  return positions;
}

function AmbientParticles() {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => createParticlePositions(420), []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.position.x = Math.sin(elapsed * 0.08) * 1.15;
    pointsRef.current.position.y = Math.sin(elapsed * 0.05) * 0.35;
    pointsRef.current.rotation.y = Math.sin(elapsed * 0.035) * 0.045;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d6a45f"
        size={0.34}
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export function CitadelFog() {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const previousFog = scene.fog;
    scene.fog = new FogExp2("#08070a", 0.0088);

    return () => {
      scene.fog = previousFog;
    };
  }, [scene]);

  return (
    <>
      <HazeCurtains />
      <LowMistBanks />
      <AmbientParticles />
    </>
  );
}
