import type { CitadelLandmark } from "@/systems/discovery/landmarkTypes";

export const citadelLandmarks = [
  {
    id: "citadel-convergence",
    internalName: "central-citadel",
    displayName: "The Citadel",
    type: "location",
    canonStatus: "canonical",
    discoveryMethod: "focus",
    interactionRadius: 12,
    loreTitle: "At the Centre",
    loreText:
      "The Citadel stands at the centre. The distance closes; what the journey made visible remains.",
    visualResponse: "citadel-resonance",
    scene: {
      position: [0, 18, -18],
      interactionScale: [11, 24, 11],
      responsePosition: [0, 9, -9],
    },
    enabled: true,
  },
  {
    id: "western-solar-obelisk",
    internalName: "western-solari-obelisk",
    displayName: "Solar Obelisk",
    type: "monument",
    canonStatus: "atmospheric",
    discoveryMethod: "interaction",
    interactionRadius: 5,
    loreTitle: "A Mark in Gold",
    loreText:
      "Gold holds within the dark surface. Instruction, memory, or only light—no answer declares itself.",
    visualResponse: "solar-illumination",
    scene: {
      position: [-18.5, 7, -19.5],
      interactionScale: [4.2, 9, 4.2],
      responsePosition: [-18.5, 8.5, -17.8],
    },
    enabled: true,
  },
  {
    id: "ruptured-obsidian",
    internalName: "foreground-ruptured-obsidian",
    displayName: "Ruptured Obsidian",
    type: "formation",
    canonStatus: "canonical",
    discoveryMethod: "focus",
    interactionRadius: 7,
    loreTitle: "Within the Fracture",
    loreText:
      "Gold catches in the broken surface. The fracture holds what the unbroken stone kept from view.",
    visualResponse: "rupture-revelation",
    scene: {
      position: [32, 2.8, 21],
      interactionScale: [8.5, 5.5, 7],
      responsePosition: [32, 4.2, 22.6],
    },
    enabled: true,
  },
] as const satisfies readonly CitadelLandmark[];

export function findCitadelLandmark(id: string) {
  return citadelLandmarks.find((landmark) => landmark.id === id);
}
