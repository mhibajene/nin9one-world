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
      <Stars radius={380} depth={180} count={1700} factor={3} saturation={0} fade speed={0.06} />
      <CitadelEnvironment />
      <OrbitControls
        target={[0, 21, -18]}
        minDistance={48}
        maxDistance={188}
        maxPolarAngle={Math.PI * 0.62}
        minPolarAngle={Math.PI * 0.2}
        enablePan={false}
        dampingFactor={0.08}
        enableDamping
      />
    </SceneCanvas>
  );
}
