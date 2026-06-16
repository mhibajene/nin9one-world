"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { CitadelFog } from "@/components/atmosphere/CitadelFog";
import { CitadelLighting } from "@/components/atmosphere/CitadelLighting";
import { SceneCanvas } from "@/components/scene/SceneCanvas";
import { CitadelEnvironment } from "@/components/world/CitadelEnvironment";

export function CitadelScene() {
  return (
    <SceneCanvas>
      <CitadelFog />
      <CitadelLighting />
      <Stars radius={120} depth={55} count={1100} factor={2.8} saturation={0} fade speed={0.12} />
      <CitadelEnvironment />
      <OrbitControls
        target={[0, 5.5, -8]}
        minDistance={20}
        maxDistance={62}
        maxPolarAngle={Math.PI * 0.47}
        minPolarAngle={Math.PI * 0.16}
        enablePan={false}
        dampingFactor={0.08}
        enableDamping
      />
    </SceneCanvas>
  );
}
