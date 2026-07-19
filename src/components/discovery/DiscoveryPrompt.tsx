"use client";

import type {
  CitadelLandmark,
  LandmarkDiscoveryState,
} from "@/systems/discovery/landmarkTypes";

type DiscoveryPromptProps = {
  landmarks: readonly CitadelLandmark[];
  discoveryState: Readonly<Record<string, LandmarkDiscoveryState>>;
  attendedLandmarkId: string | null;
  onAttend: (id: string) => void;
  onLeave: (id: string) => void;
  onActivate: (id: string) => void;
};

const stateLabels: Record<LandmarkDiscoveryState, string> = {
  undiscovered: "Unread",
  available: "Within attention",
  discovered: "Discovered",
  revisited: "Revisited",
};

export function DiscoveryPrompt({
  landmarks,
  discoveryState,
  attendedLandmarkId,
  onAttend,
  onLeave,
  onActivate,
}: DiscoveryPromptProps) {
  return (
    <nav className="discovery-prompt" aria-labelledby="discovery-prompt-title">
      <div className="discovery-prompt__heading">
        <span className="discovery-prompt__eyebrow">Attention</span>
        <h1 id="discovery-prompt-title">Landmark signals</h1>
      </div>

      <p className="discovery-prompt__guidance">
        Select a form in the world, or focus a signal below and press Enter.
      </p>

      <ol className="discovery-prompt__list">
        {landmarks
          .filter((landmark) => landmark.enabled)
          .map((landmark, index) => {
            const state = discoveryState[landmark.id] ?? "undiscovered";
            const isAttended = attendedLandmarkId === landmark.id;

            return (
              <li key={landmark.id}>
                <button
                  type="button"
                  className="discovery-prompt__signal"
                  data-active={isAttended}
                  data-state={state}
                  data-landmark-id={landmark.id}
                  onFocus={() => onAttend(landmark.id)}
                  onBlur={() => onLeave(landmark.id)}
                  onPointerEnter={() => onAttend(landmark.id)}
                  onPointerLeave={() => onLeave(landmark.id)}
                  onClick={() => onActivate(landmark.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onActivate(landmark.id);
                    }
                  }}
                  aria-label={`${landmark.displayName}. ${stateLabels[state]}. Read lore fragment.`}
                >
                  <span className="discovery-prompt__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="discovery-prompt__name">
                    {landmark.displayName}
                  </span>
                  <span className="discovery-prompt__state">
                    {stateLabels[state]}
                  </span>
                </button>
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
