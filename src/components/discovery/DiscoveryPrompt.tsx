"use client";

import type {
  CitadelLandmark,
  LandmarkDiscoveryState,
} from "@/systems/discovery/landmarkTypes";

type DiscoveryPromptProps = {
  landmarks: readonly CitadelLandmark[];
  discoveryState: Readonly<Record<string, LandmarkDiscoveryState>>;
  attendedLandmarkId: string | null;
  onFocus: (id: string) => void;
  onBlur: (id: string) => void;
  onActivate: (id: string) => void;
};

export function DiscoveryPrompt({
  landmarks,
  discoveryState,
  attendedLandmarkId,
  onFocus,
  onBlur,
  onActivate,
}: DiscoveryPromptProps) {
  const enabledLandmarks = landmarks.filter((landmark) => landmark.enabled);
  const attendedLandmark = attendedLandmarkId
    ? enabledLandmarks.find((landmark) => landmark.id === attendedLandmarkId)
    : undefined;

  return (
    <>
      {attendedLandmark ? (
        <aside className="discovery-cue" aria-hidden="true">
          <span className="discovery-cue__eyebrow">Attention</span>
          <span className="discovery-cue__name">
            {attendedLandmark.displayName}
          </span>
        </aside>
      ) : null}

      <nav className="discovery-access sr-only" aria-label="Explore The Citadel">
        {enabledLandmarks.map((landmark) => {
          const state = discoveryState[landmark.id] ?? "undiscovered";
          const isKnown = state !== "undiscovered";

          return (
            <button
              key={landmark.id}
              type="button"
              data-landmark-id={landmark.id}
              onFocus={() => onFocus(landmark.id)}
              onBlur={() => onBlur(landmark.id)}
              onClick={() => onActivate(landmark.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onActivate(landmark.id);
                }

                if (event.key === " ") {
                  event.preventDefault();
                }
              }}
              onKeyUp={(event) => {
                if (event.key === " ") {
                  event.preventDefault();
                  onActivate(landmark.id);
                }
              }}
              aria-label={
                isKnown
                  ? `${landmark.displayName}. Open reflection.`
                  : "Unknown presence. Focus to attend."
              }
            >
              {isKnown ? landmark.displayName : "Unknown presence"}
            </button>
          );
        })}
      </nav>
    </>
  );
}
