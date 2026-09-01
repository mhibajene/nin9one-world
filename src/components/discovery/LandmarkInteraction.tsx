"use client";

import { useCursor } from "@react-three/drei";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
  AdditiveBlending,
  MathUtils,
  type MeshBasicMaterial,
  type PointLight,
} from "three";
import { materialLanguage } from "@/data/materials/nin9oneMaterialLanguage";
import type {
  CitadelLandmark,
  LandmarkDiscoveryState,
  LandmarkVisualResponse,
} from "@/systems/discovery/landmarkTypes";

type LandmarkInteractionProps = {
  landmarks: readonly CitadelLandmark[];
  discoveryState: Readonly<Record<string, LandmarkDiscoveryState>>;
  attendedLandmarkId: string | null;
  responseMotionEnabled: boolean;
  onAttend: (id: string) => void;
  onLeave: (id: string) => void;
  onActivate: (id: string) => void;
};

type LandmarkTargetProps = Omit<LandmarkInteractionProps, "landmarks"> & {
  landmark: CitadelLandmark;
};

const responseProfiles: Record<
  LandmarkVisualResponse,
  {
    attendedIntensity: number;
    discoveredIntensity: number;
    distanceMultiplier: number;
  }
> = {
  "citadel-resonance": {
    attendedIntensity: 75,
    discoveredIntensity: 115,
    distanceMultiplier: 2.6,
  },
  "solar-illumination": {
    attendedIntensity: 90,
    discoveredIntensity: 135,
    distanceMultiplier: 2.8,
  },
  "rupture-revelation": {
    attendedIntensity: 65,
    discoveredIntensity: 105,
    distanceMultiplier: 2.4,
  },
};

function transitionResponse(
  current: number,
  target: number,
  delta: number,
  motionEnabled: boolean,
) {
  if (!motionEnabled) {
    return target;
  }

  const damping = target > current ? 4.6 : 2.2;
  return MathUtils.damp(current, target, damping, delta);
}

function AttentiveMaterialTrace({
  landmark,
  discoveryState,
  isAttended,
  responseMotionEnabled,
}: {
  landmark: CitadelLandmark;
  discoveryState: LandmarkDiscoveryState;
  isAttended: boolean;
  responseMotionEnabled: boolean;
}) {
  const hasResponded =
    discoveryState === "discovered" || discoveryState === "revisited";
  const haloMaterial = useRef<MeshBasicMaterial | null>(null);
  const coreMaterial = useRef<MeshBasicMaterial | null>(null);
  const isCitadel = landmark.visualResponse === "citadel-resonance";
  const targetOpacity = hasResponded ? 0.72 : isAttended ? 0.56 : 0;
  const width = isCitadel ? 0.32 : 0.46;
  const height = isCitadel ? 7.4 : 5.8;

  useFrame((_, delta) => {
    if (haloMaterial.current) {
      haloMaterial.current.opacity = transitionResponse(
        haloMaterial.current.opacity,
        targetOpacity * 0.13,
        delta,
        responseMotionEnabled,
      );
    }

    if (coreMaterial.current) {
      coreMaterial.current.opacity = transitionResponse(
        coreMaterial.current.opacity,
        targetOpacity,
        delta,
        responseMotionEnabled,
      );
    }
  });

  return (
    <group position={landmark.scene.responsePosition}>
      <mesh scale={[width * 4.5, height * 1.04, 0.035]} renderOrder={2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          ref={haloMaterial}
          color={materialLanguage.celestialGold.halo}
          transparent
          opacity={0}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>
      <mesh scale={[width, height, 0.06]} renderOrder={3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          ref={coreMaterial}
          color={materialLanguage.celestialGold.core}
          transparent
          opacity={0}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>
    </group>
  );
}

function RuptureVeins({
  landmark,
  discoveryState,
  isAttended,
  responseMotionEnabled,
}: {
  landmark: CitadelLandmark;
  discoveryState: LandmarkDiscoveryState;
  isAttended: boolean;
  responseMotionEnabled: boolean;
}) {
  const primaryMaterial = useRef<MeshBasicMaterial | null>(null);
  const secondaryMaterial = useRef<MeshBasicMaterial | null>(null);
  const hasResponded =
    discoveryState === "discovered" || discoveryState === "revisited";
  const targetPrimaryOpacity = hasResponded ? 0.66 : isAttended ? 0.42 : 0.1;
  const targetSecondaryOpacity = hasResponded ? 0.48 : isAttended ? 0.3 : 0.07;

  useFrame((_, delta) => {
    if (primaryMaterial.current) {
      primaryMaterial.current.opacity = transitionResponse(
        primaryMaterial.current.opacity,
        targetPrimaryOpacity,
        delta,
        responseMotionEnabled,
      );
    }

    if (secondaryMaterial.current) {
      secondaryMaterial.current.opacity = transitionResponse(
        secondaryMaterial.current.opacity,
        targetSecondaryOpacity,
        delta,
        responseMotionEnabled,
      );
    }
  });

  return (
    <group position={landmark.scene.responsePosition} rotation={[0.08, -0.4, -0.16]}>
      <mesh scale={[0.12, 2.5, 0.07]} renderOrder={3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          ref={primaryMaterial}
          color={materialLanguage.celestialGold.core}
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>
      <mesh position={[-0.34, 0.72, 0]} rotation={[0, 0, 0.38]} scale={[0.07, 1.1, 0.05]} renderOrder={3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          ref={secondaryMaterial}
          color={materialLanguage.celestialGold.signalMuted}
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={AdditiveBlending}
          fog={false}
        />
      </mesh>
    </group>
  );
}

function LandmarkTarget({
  landmark,
  discoveryState,
  attendedLandmarkId,
  responseMotionEnabled,
  onAttend,
  onLeave,
  onActivate,
}: LandmarkTargetProps) {
  const [hovered, setHovered] = useState(false);
  const responseLight = useRef<PointLight | null>(null);
  const currentState = discoveryState[landmark.id] ?? "undiscovered";
  const hasResponded = currentState === "discovered" || currentState === "revisited";
  const isAttended = hovered || attendedLandmarkId === landmark.id;
  const responseProfile = responseProfiles[landmark.visualResponse];
  const targetLightIntensity = hasResponded
    ? responseProfile.discoveredIntensity
    : isAttended
      ? responseProfile.attendedIntensity
      : 0;

  useFrame((_, delta) => {
    if (responseLight.current) {
      responseLight.current.intensity = transitionResponse(
        responseLight.current.intensity,
        targetLightIntensity,
        delta,
        responseMotionEnabled,
      );
    }
  });

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
        <RuptureVeins
          landmark={landmark}
          discoveryState={currentState}
          isAttended={isAttended}
          responseMotionEnabled={responseMotionEnabled}
        />
      )}

      {landmark.visualResponse !== "rupture-revelation" && (
        <AttentiveMaterialTrace
          landmark={landmark}
          discoveryState={currentState}
          isAttended={isAttended}
          responseMotionEnabled={responseMotionEnabled}
        />
      )}

      <pointLight
        ref={responseLight}
        position={landmark.scene.responsePosition}
        color={materialLanguage.celestialGold.signalWarm}
        intensity={0}
        distance={landmark.interactionRadius * responseProfile.distanceMultiplier}
        decay={2}
      />

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
  attendedLandmarkId,
  responseMotionEnabled,
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
            attendedLandmarkId={attendedLandmarkId}
            responseMotionEnabled={responseMotionEnabled}
            onAttend={onAttend}
            onLeave={onLeave}
            onActivate={onActivate}
          />
        ))}
    </group>
  );
}
