"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { Color } from "three";

type SceneCanvasProps = {
  children: ReactNode;
};

export function SceneCanvas({ children }: SceneCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 2.4, 22],
        fov: 54,
        near: 0.1,
        far: 120,
      }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ camera, gl, scene }) => {
        camera.lookAt(0, 3.4, 0);
        gl.setClearColor(new Color("#08080d"));
        scene.background = new Color("#08080d");
      }}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
      }}
    >
      {children}
    </Canvas>
  );
}
