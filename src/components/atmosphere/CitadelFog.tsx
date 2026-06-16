"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Fog } from "three";

export function CitadelFog() {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const previousFog = scene.fog;
    scene.fog = new Fog("#08080d", 10, 42);

    return () => {
      scene.fog = previousFog;
    };
  }, [scene]);

  return null;
}
