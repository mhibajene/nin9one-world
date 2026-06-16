"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, type ReactNode } from "react";
import { Color, PerspectiveCamera } from "three";

type SceneCanvasProps = {
  children: ReactNode;
};

const cameraTarget = [0, 5.5, -8] as const;

function CameraComposition() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const isPortrait = size.height > size.width;

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) {
      return;
    }

    camera.position.set(0, isPortrait ? 2.15 : 1.75, isPortrait ? 56 : 42);
    camera.fov = isPortrait ? 54 : 50;
    camera.lookAt(...cameraTarget);
    camera.updateProjectionMatrix();
  }, [camera, isPortrait]);

  return null;
}

export function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 1.75, 42],
        fov: 50,
        near: 0.1,
        far: 180,
      }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ camera, gl, scene }) => {
        camera.lookAt(...cameraTarget);
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
