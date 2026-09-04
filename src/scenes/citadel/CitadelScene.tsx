"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useRef,
  useState,
  type ComponentRef,
} from "react";
import { MathUtils } from "three";
import { CitadelFog } from "@/components/atmosphere/CitadelFog";
import { CitadelLighting } from "@/components/atmosphere/CitadelLighting";
import { CitadelSoundscape } from "@/components/atmosphere/CitadelSoundscape";
import { DiscoveryPrompt } from "@/components/discovery/DiscoveryPrompt";
import { LandmarkInteraction } from "@/components/discovery/LandmarkInteraction";
import { LoreReveal } from "@/components/discovery/LoreReveal";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { CitadelEnvironment } from "@/components/world/CitadelEnvironment";
import {
  citadelLandmarks,
  findCitadelLandmark,
} from "@/data/landmarks/citadelLandmarks";
import { useLandmarkDiscovery } from "@/systems/discovery/useLandmarkDiscovery";

const landscapeCameraAzimuthLimit = Math.PI * 0.05;
const portraitCameraAzimuthLimit = Math.PI * 0.035;
const landscapeCameraMinPolarAngle = Math.PI * 0.49;
const landscapeCameraMaxPolarAngle = Math.PI * 0.565;
const portraitCameraMinPolarAngle = Math.PI * 0.5;
const portraitCameraMaxPolarAngle = Math.PI * 0.545;
const citadelCameraTarget = [0, 21, -18] as const;
const introDriftDurationSeconds = 10;
const introDriftAzimuthRatio = 0.6;
const landscapeCameraRest = { y: 0.85, z: 92 } as const;
const portraitCameraRest = { y: 1.1, z: 150 } as const;
const landscapeCameraApproachStartZ = 112;
const portraitCameraApproachStartZ = 158;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function CitadelCameraControls({
  enabled,
  canDrift,
  prefersReducedMotion,
}: {
  enabled: boolean;
  canDrift: boolean;
  prefersReducedMotion: boolean;
}) {
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);
  const isPortrait = size.height > size.width;
  const azimuthLimit = isPortrait
    ? portraitCameraAzimuthLimit
    : landscapeCameraAzimuthLimit;
  const cameraRest = isPortrait
    ? portraitCameraRest
    : landscapeCameraRest;
  const approachStartZ = isPortrait
    ? portraitCameraApproachStartZ
    : landscapeCameraApproachStartZ;
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const introStartedAt = useRef<number | null>(null);
  const introInitialized = useRef(false);
  const [introDriftActive, setIntroDriftActive] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroDriftActive(false);
      return;
    }

    if (introInitialized.current) {
      return;
    }

    introInitialized.current = true;

    camera.position.set(0, cameraRest.y, approachStartZ);
    camera.lookAt(...citadelCameraTarget);
    controlsRef.current?.update();
  }, [approachStartZ, camera, cameraRest, prefersReducedMotion]);

  useEffect(() => {
    if (introDriftActive && (!enabled || !canDrift)) {
      setIntroDriftActive(false);
    }
  }, [canDrift, enabled, introDriftActive]);

  useFrame(({ clock }) => {
    if (
      !enabled ||
      !canDrift ||
      !introDriftActive ||
      prefersReducedMotion
    ) {
      return;
    }

    introStartedAt.current ??= clock.elapsedTime;

    const elapsed = clock.elapsedTime - introStartedAt.current;
    const progress = MathUtils.clamp(
      elapsed / introDriftDurationSeconds,
      0,
      1,
    );
    const easedProgress = MathUtils.smoothstep(progress, 0, 1);
    const azimuth =
      azimuthLimit * introDriftAzimuthRatio * easedProgress;
    const forwardOffset =
      MathUtils.lerp(approachStartZ, cameraRest.z, easedProgress) -
      citadelCameraTarget[2];

    camera.position.set(
      Math.sin(azimuth) * forwardOffset,
      cameraRest.y,
      citadelCameraTarget[2] + Math.cos(azimuth) * forwardOffset,
    );
    camera.lookAt(...citadelCameraTarget);
    controlsRef.current?.update();

    if (progress === 1) {
      setIntroDriftActive(false);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      target={citadelCameraTarget}
      minDistance={isPortrait ? 118 : 58}
      maxDistance={isPortrait ? 178 : 132}
      minAzimuthAngle={-azimuthLimit}
      maxAzimuthAngle={azimuthLimit}
      minPolarAngle={
        isPortrait
          ? portraitCameraMinPolarAngle
          : landscapeCameraMinPolarAngle
      }
      maxPolarAngle={
        isPortrait
          ? portraitCameraMaxPolarAngle
          : landscapeCameraMaxPolarAngle
      }
      enablePan={false}
      rotateSpeed={0.48}
      zoomSpeed={0.62}
      dampingFactor={0.08}
      enableDamping
      onStart={() => setIntroDriftActive(false)}
      enabled={enabled}
    />
  );
}

export function CitadelScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    discoveryState,
    activeLandmarkId,
    attendedLandmarkId,
    focusLandmark,
    blurLandmark,
    hoverLandmark,
    unhoverLandmark,
    activateLandmark,
    dismissLandmark,
  } = useLandmarkDiscovery(citadelLandmarks);
  const activeLandmark = activeLandmarkId
    ? findCitadelLandmark(activeLandmarkId)
    : undefined;

  const handleDismiss = () => {
    const dismissedLandmarkId = activeLandmarkId;
    dismissLandmark();

    if (dismissedLandmarkId) {
      window.requestAnimationFrame(() => {
        document
          .querySelector<HTMLButtonElement>(
            `[data-landmark-id="${dismissedLandmarkId}"]`,
          )
          ?.focus();
      });
    }
  };

  return (
    <div className="citadel-experience">
      <SceneCanvas>
        <CitadelFog />
        <CitadelLighting />
        <Stars radius={380} depth={180} count={1700} factor={3} saturation={0} fade speed={0.06} />
        <CitadelEnvironment
          reflectionMotionEnabled={!prefersReducedMotion}
        />
        <LandmarkInteraction
          landmarks={citadelLandmarks}
          discoveryState={discoveryState}
          attendedLandmarkId={attendedLandmarkId}
          responseMotionEnabled={!prefersReducedMotion}
          onAttend={hoverLandmark}
          onLeave={unhoverLandmark}
          onActivate={activateLandmark}
        />
        <CitadelCameraControls
          enabled={!activeLandmark}
          canDrift={!activeLandmark && !attendedLandmarkId}
          prefersReducedMotion={prefersReducedMotion}
        />
      </SceneCanvas>

      {!activeLandmark && (
        <DiscoveryPrompt
          landmarks={citadelLandmarks}
          discoveryState={discoveryState}
          attendedLandmarkId={attendedLandmarkId}
          onFocus={focusLandmark}
          onBlur={blurLandmark}
          onActivate={activateLandmark}
        />
      )}

      {activeLandmark && (
        <LoreReveal
          landmark={activeLandmark}
          onDismiss={handleDismiss}
        />
      )}

      <CitadelSoundscape />

      <p className="sr-only" aria-live="polite">
        {activeLandmark
          ? `${activeLandmark.displayName}. ${activeLandmark.loreTitle}`
          : ""}
      </p>
    </div>
  );
}
