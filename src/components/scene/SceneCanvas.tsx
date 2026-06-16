"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, type ReactNode } from "react";
import { Color, PerspectiveCamera } from "three";

type SceneCanvasProps = {
  children: ReactNode;
};

const monumentalCameraTarget = [0, 21, -18] as const;

function CameraComposition() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const isPortrait = size.height > size.width;

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) {
      return;
    }

    camera.position.set(0, isPortrait ? 1.1 : 0.85, isPortrait ? 150 : 92);
    camera.fov = isPortrait ? 66 : 54;
    camera.lookAt(...monumentalCameraTarget);
    camera.updateProjectionMatrix();
  }, [camera, isPortrait]);

  return null;
}

export function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 0.85, 92],
        fov: 54,
        near: 0.1,
        far: 320,
      }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ camera, gl, scene }) => {
        camera.lookAt(...monumentalCameraTarget);
        gl.setClearColor(new Color("#060608"));
        scene.background = new Color("#060608");
      }}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CameraComposition />
      {children}
    </Canvas>
  );
}
