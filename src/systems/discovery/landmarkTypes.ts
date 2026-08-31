export type LandmarkCanonStatus = "canonical" | "atmospheric" | "exploratory";

export type LandmarkDiscoveryState =
  | "undiscovered"
  | "available"
  | "discovered"
  | "revisited";

export type LandmarkDiscoveryMethod = "focus" | "interaction" | "proximity";

export type LandmarkVisualResponse =
  | "citadel-resonance"
  | "solar-illumination"
  | "rupture-revelation";

export type LandmarkSceneReference = {
  position: [number, number, number];
  interactionScale: [number, number, number];
  responsePosition: [number, number, number];
};

export type CitadelLandmark = {
  id: string;
  internalName: string;
  displayName: string;
  type: "location" | "monument" | "formation";
  canonStatus: LandmarkCanonStatus;
  discoveryMethod: LandmarkDiscoveryMethod;
  interactionRadius: number;
  loreTitle: string;
  loreText: string;
  visualResponse: LandmarkVisualResponse;
  scene: LandmarkSceneReference;
  enabled: boolean;
};
