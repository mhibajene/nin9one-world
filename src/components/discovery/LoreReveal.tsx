"use client";

import { useEffect, useRef } from "react";
import type {
  CitadelLandmark,
  LandmarkCanonStatus,
  LandmarkDiscoveryState,
} from "@/systems/discovery/landmarkTypes";

type LoreRevealProps = {
  landmark: CitadelLandmark;
  state: LandmarkDiscoveryState;
  onDismiss: () => void;
};

const canonLabels: Record<LandmarkCanonStatus, string> = {
  canonical: "Canon fragment",
  atmospheric: "Atmospheric reading",
  exploratory: "Unresolved signal",
};

export function LoreReveal({ landmark, state, onDismiss }: LoreRevealProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  return (
    <aside
      className="lore-reveal"
      role="dialog"
      aria-modal="false"
      aria-labelledby="lore-reveal-title"
      aria-describedby="lore-reveal-text"
    >
      <div className="lore-reveal__line" aria-hidden="true" />
      <div className="lore-reveal__meta">
        <span>{canonLabels[landmark.canonStatus]}</span>
        <span>{state === "revisited" ? "Revisited" : "Discovered"}</span>
      </div>
      <p className="lore-reveal__landmark">{landmark.displayName}</p>
      <h2 id="lore-reveal-title">{landmark.loreTitle}</h2>
      <p id="lore-reveal-text" className="lore-reveal__text">
        {landmark.loreText}
      </p>
      <button
        ref={closeButtonRef}
        type="button"
        className="lore-reveal__dismiss"
        onClick={onDismiss}
      >
        Return to the world
        <span aria-hidden="true">Esc</span>
      </button>
    </aside>
  );
}
