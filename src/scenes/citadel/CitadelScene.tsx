"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { CitadelFog } from "@/components/atmosphere/CitadelFog";
import { CitadelLighting } from "@/components/atmosphere/CitadelLighting";
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

export function CitadelScene() {
  const {
    discoveryState,
    activeLandmarkId,
    attendedLandmarkId,
    attendLandmark,
    leaveLandmark,
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
        <CitadelEnvironment />
        <LandmarkInteraction
          landmarks={citadelLandmarks}
          discoveryState={discoveryState}
          onAttend={attendLandmark}
          onLeave={leaveLandmark}
          onActivate={activateLandmark}
        />
        <OrbitControls
          target={[0, 21, -18]}
          minDistance={48}
          maxDistance={188}
          maxPolarAngle={Math.PI * 0.62}
          minPolarAngle={Math.PI * 0.2}
          enablePan={false}
          dampingFactor={0.08}
          enableDamping
          enabled={!activeLandmark}
        />
      </SceneCanvas>

      {!activeLandmark && (
        <DiscoveryPrompt
          landmarks={citadelLandmarks}
          discoveryState={discoveryState}
          attendedLandmarkId={attendedLandmarkId}
          onAttend={attendLandmark}
          onLeave={leaveLandmark}
          onActivate={activateLandmark}
        />
      )}

      {activeLandmark && (
        <LoreReveal
          landmark={activeLandmark}
          state={discoveryState[activeLandmark.id]}
          onDismiss={handleDismiss}
        />
      )}

      <p className="sr-only" aria-live="polite">
        {activeLandmark
          ? `${activeLandmark.displayName} ${
              discoveryState[activeLandmark.id] === "revisited"
                ? "revisited"
                : "discovered"
            }. ${activeLandmark.loreTitle}`
          : ""}
      </p>
    </div>
  );
}
