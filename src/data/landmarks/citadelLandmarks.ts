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
    loreTitle: "A Place of Convergence",
    loreText:
      "The Traveler sees a destination. With attention, another meaning emerges: The Citadel is a place of convergence, revelation, and understanding. The distance crossed matters, but what the journey makes visible matters more.",
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
      "Gold appears within the dark surface, revelation held against the unknown. Whether the mark is instruction, memory, or only light finding a patient surface remains unanswered.",
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
    loreTitle: "What Fracture Reveals",
    loreText:
      "The fracture does not diminish the obsidian. It reveals what the unbroken surface concealed: gold, not as reward or wealth, but as potential and truth brought into view.",
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
