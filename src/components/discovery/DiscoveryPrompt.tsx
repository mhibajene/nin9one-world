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
  onPointerEnter: (id: string) => void;
  onPointerLeave: (id: string) => void;
  onActivate: (id: string) => void;
};

const stateLabels: Record<LandmarkDiscoveryState, string> = {
  undiscovered: "Unread",
  available: "Noticed",
  discovered: "Discovered",
  revisited: "Revisited",
};

export function DiscoveryPrompt({
  landmarks,
  discoveryState,
  attendedLandmarkId,
  onFocus,
  onBlur,
  onPointerEnter,
  onPointerLeave,
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
            const isNamed = state !== "undiscovered";
            const signalNumber = String(index + 1).padStart(2, "0");
            const visibleName = isNamed ? landmark.displayName : "Unknown signal";
            const accessibleLabel = isNamed
              ? `${landmark.displayName}. ${stateLabels[state]}. Read lore fragment.`
              : `Unknown landmark signal ${index + 1}. Focus to notice it.`;

            return (
              <li key={landmark.id}>
                <button
                  type="button"
                  className="discovery-prompt__signal"
                  data-active={isAttended}
                  data-state={state}
                  data-landmark-id={landmark.id}
                  onFocus={() => onFocus(landmark.id)}
                  onBlur={() => onBlur(landmark.id)}
                  onPointerEnter={() => onPointerEnter(landmark.id)}
                  onPointerLeave={() => onPointerLeave(landmark.id)}
                  onClick={() => onActivate(landmark.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onActivate(landmark.id);
                    }
                  }}
                  aria-label={accessibleLabel}
                >
                  <span className="discovery-prompt__index" aria-hidden="true">
                    {signalNumber}
                  </span>
                  <span className="discovery-prompt__name">
                    {visibleName}
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
