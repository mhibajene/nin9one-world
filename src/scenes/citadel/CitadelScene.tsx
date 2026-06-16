"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { CitadelFog } from "@/components/atmosphere/CitadelFog";
import { CitadelLighting } from "@/components/atmosphere/CitadelLighting";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { CitadelPlaceholder } from "@/components/world/CitadelPlaceholder";

export function CitadelScene() {
  return (
    <SceneCanvas>
      <CitadelFog />
      <CitadelLighting />
      <Stars radius={80} depth={40} count={900} factor={2.6} saturation={0} fade speed={0.18} />
      <CitadelPlaceholder />
      <OrbitControls
        target={[0, 3.4, 0]}
        minDistance={8}
        maxDistance={38}
        maxPolarAngle={Math.PI * 0.48}
        minPolarAngle={Math.PI * 0.18}
        enablePan={false}
        dampingFactor={0.08}
        enableDamping
      />
    </SceneCanvas>
  );
}
