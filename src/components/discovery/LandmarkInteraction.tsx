"use client";

import { useCursor } from "@react-three/drei";
import { type ThreeEvent } from "@react-three/fiber";
import { useState } from "react";
import { AdditiveBlending } from "three";
import { materialLanguage } from "@/data/materials/nin9oneMaterialLanguage";
import type {
  CitadelLandmark,
  LandmarkDiscoveryState,
} from "@/systems/discovery/landmarkTypes";

type LandmarkInteractionProps = {
  landmarks: readonly CitadelLandmark[];
  discoveryState: Readonly<Record<string, LandmarkDiscoveryState>>;
  onAttend: (id: string) => void;
  onLeave: (id: string) => void;
  onActivate: (id: string) => void;
};

type LandmarkTargetProps = Omit<LandmarkInteractionProps, "landmarks"> & {
  landmark: CitadelLandmark;
};

function RuptureVeins({ landmark }: { landmark: CitadelLandmark }) {
  return (
    <group position={landmark.scene.responsePosition} rotation={[0.08, -0.4, -0.16]}>
      <mesh scale={[0.12, 2.5, 0.07]} renderOrder={3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.core}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>
      <mesh position={[-0.34, 0.72, 0]} rotation={[0, 0, 0.38]} scale={[0.07, 1.1, 0.05]} renderOrder={3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color={materialLanguage.celestialGold.signalMuted}
          transparent
          opacity={0.36}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>
      <pointLight
        color={materialLanguage.celestialGold.signalWarm}
        intensity={5}
        distance={12}
        decay={2}
      />
    </group>
  );
}

function LandmarkTarget({
  landmark,
  discoveryState,
  onAttend,
  onLeave,
  onActivate,
}: LandmarkTargetProps) {
  const [hovered, setHovered] = useState(false);
  const currentState = discoveryState[landmark.id] ?? "undiscovered";
  const hasResponded = currentState === "discovered" || currentState === "revisited";
  const isAttended = hovered || currentState === "available";

  useCursor(hovered, "pointer", "auto");

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    onAttend(landmark.id);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(false);
    onLeave(landmark.id);
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onActivate(landmark.id);
  };

  return (
    <group>
      {landmark.visualResponse === "rupture-revelation" && (
        <RuptureVeins landmark={landmark} />
      )}

      {(isAttended || hasResponded) && (
        <pointLight
          position={landmark.scene.responsePosition}
          color={materialLanguage.celestialGold.signalWarm}
          intensity={hasResponded ? 4.5 : 2.5}
          distance={landmark.interactionRadius * 2.4}
          decay={2}
        />
      )}

      <mesh
        position={landmark.scene.position}
        scale={landmark.scene.interactionScale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 18, 18]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          colorWrite={false}
        />
      </mesh>
    </group>
  );
}

export function LandmarkInteraction({
  landmarks,
  discoveryState,
  onAttend,
  onLeave,
  onActivate,
}: LandmarkInteractionProps) {
  return (
    <group>
      {landmarks
        .filter((landmark) => landmark.enabled)
        .map((landmark) => (
          <LandmarkTarget
            key={landmark.id}
            landmark={landmark}
            discoveryState={discoveryState}
            onAttend={onAttend}
            onLeave={onLeave}
            onActivate={onActivate}
          />
        ))}
    </group>
  );
}
