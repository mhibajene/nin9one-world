import { CitadelScene } from "@/scenes/citadel/CitadelScene";

export default function CitadelPage() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#08080d",
      }}
    >
      <CitadelScene />
    </main>
  );
}
