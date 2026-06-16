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
    name: "near-low-mist",
    position: [0, 9, 5],
    size: [180, 34],
    color: "#17110d",
    opacity: 0.16,
  },
  {
    name: "mid-distance-haze",
    position: [0, 30, -58],
    size: [250, 74],
    color: "#21170e",
    opacity: 0.24,
  },
  {
    name: "far-atmospheric-fade",
    position: [0, 52, -132],
    size: [360, 132],
    color: "#07070a",
    opacity: 0.72,
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
        { position: [0, 2.9, -56] as const, scale: [80, 8.8, 1] as const, opacity: 0.14 },
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
    const x = Math.sin(seed * 0.013) * 76 + Math.sin(seed * 0.037) * 18;
    const y = 3 + Math.abs(Math.sin(seed * 0.017)) * 38;
    const z = -92 + Math.sin(seed * 0.019) * 86;

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;
  }

  return positions;
}

function AmbientParticles() {
  const pointsRef = useRef<Points>(null);
  const positions = useMemo(() => createParticlePositions(260), []);

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
        size={0.3}
        transparent
        opacity={0.28}
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
    scene.fog = new FogExp2("#08070a", 0.0115);

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
