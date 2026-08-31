"use client";

import { useEffect, useRef } from "react";
import type { CitadelLandmark } from "@/systems/discovery/landmarkTypes";

type LoreRevealProps = {
  landmark: CitadelLandmark;
  onDismiss: () => void;
};

export function LoreReveal({ landmark, onDismiss }: LoreRevealProps) {
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
