"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  CitadelLandmark,
  LandmarkDiscoveryState,
} from "@/systems/discovery/landmarkTypes";

const sessionStorageKey = "nin9one:citadel:landmark-discovery";

type DiscoveryStateById = Record<string, LandmarkDiscoveryState>;

const validDiscoveryStates = new Set<LandmarkDiscoveryState>([
  "undiscovered",
  "available",
  "discovered",
  "revisited",
]);

function createInitialState(landmarks: readonly CitadelLandmark[]) {
  return Object.fromEntries(
    landmarks.map((landmark) => [landmark.id, "undiscovered"]),
  ) as DiscoveryStateById;
}

function restoreSessionState(
  landmarks: readonly CitadelLandmark[],
  initialState: DiscoveryStateById,
) {
  try {
    const storedValue = window.sessionStorage.getItem(sessionStorageKey);

    if (!storedValue) {
      return initialState;
    }

    const parsedValue = JSON.parse(storedValue) as Record<string, unknown>;

    return Object.fromEntries(
      landmarks.map((landmark) => {
        const storedState = parsedValue[landmark.id];
        return [
          landmark.id,
          typeof storedState === "string" &&
          validDiscoveryStates.has(storedState as LandmarkDiscoveryState)
            ? storedState
            : "undiscovered",
        ];
      }),
    ) as DiscoveryStateById;
  } catch {
    return initialState;
  }
}

export function useLandmarkDiscovery(landmarks: readonly CitadelLandmark[]) {
  const initialState = useMemo(() => createInitialState(landmarks), [landmarks]);
  const [discoveryState, setDiscoveryState] =
    useState<DiscoveryStateById>(initialState);
  const [activeLandmarkId, setActiveLandmarkId] = useState<string | null>(null);
  const [focusedLandmarkId, setFocusedLandmarkId] = useState<string | null>(null);
  const [hoveredLandmarkId, setHoveredLandmarkId] = useState<string | null>(null);
  const [sessionRestored, setSessionRestored] = useState(false);
  const attendedLandmarkId = hoveredLandmarkId ?? focusedLandmarkId;

  useEffect(() => {
    setDiscoveryState(restoreSessionState(landmarks, initialState));
    setSessionRestored(true);
  }, [initialState, landmarks]);

  useEffect(() => {
    if (!sessionRestored) {
      return;
    }

    window.sessionStorage.setItem(
      sessionStorageKey,
      JSON.stringify(discoveryState),
    );
  }, [discoveryState, sessionRestored]);

  const markLandmarkAvailable = useCallback((id: string) => {
    setDiscoveryState((currentState) => {
      if (currentState[id] !== "undiscovered") {
        return currentState;
      }

      return { ...currentState, [id]: "available" };
    });
  }, []);

  const focusLandmark = useCallback(
    (id: string) => {
      setFocusedLandmarkId(id);
      markLandmarkAvailable(id);
    },
    [markLandmarkAvailable],
  );

  const blurLandmark = useCallback((id: string) => {
    setFocusedLandmarkId((currentId) =>
      currentId === id ? null : currentId,
    );
  }, []);

  const hoverLandmark = useCallback(
    (id: string) => {
      setHoveredLandmarkId(id);
      markLandmarkAvailable(id);
    },
    [markLandmarkAvailable],
  );

  const unhoverLandmark = useCallback((id: string) => {
    setHoveredLandmarkId((currentId) =>
      currentId === id ? null : currentId,
    );
  }, []);

  const activateLandmark = useCallback((id: string) => {
    setDiscoveryState((currentState) => {
      const currentLandmarkState = currentState[id] ?? "undiscovered";
      const nextLandmarkState =
        currentLandmarkState === "discovered" ||
        currentLandmarkState === "revisited"
          ? "revisited"
          : "discovered";

      return { ...currentState, [id]: nextLandmarkState };
    });
    setActiveLandmarkId(id);
  }, []);

  const dismissLandmark = useCallback(() => {
    setActiveLandmarkId(null);
  }, []);

  return {
    discoveryState,
    activeLandmarkId,
    attendedLandmarkId,
    focusLandmark,
    blurLandmark,
    hoverLandmark,
    unhoverLandmark,
    activateLandmark,
    dismissLandmark,
  };
}
