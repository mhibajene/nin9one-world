"use client";

import type { Ref } from "react";
import {
  AdditiveBlending,
  BackSide,
  type MeshStandardMaterial,
} from "three";
import { materialLanguage } from "@/data/materials/nin9oneMaterialLanguage";

type MatterMaterialProps = {
  color?: string;
  roughness?: number;
  metalness?: number;
  flatShading?: boolean;
  transparent?: boolean;
  opacity?: number;
  depthWrite?: boolean;
};

type GlowMaterialProps = {
  color?: string;
  opacity?: number;
};

type BlackWaterMaterialProps = {
  materialRef?: Ref<MeshStandardMaterial>;
};

export function ObsidianMatterMaterial({
  color = materialLanguage.obsidianMatter.mid,
  roughness = materialLanguage.obsidianMatter.roughness,
  metalness = materialLanguage.obsidianMatter.metalness,
  flatShading = true,
  transparent,
  opacity,
  depthWrite,
}: MatterMaterialProps) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      flatShading={flatShading}
      emissive={materialLanguage.obsidianMatter.warmEmissive}
      emissiveIntensity={0.03}
      transparent={transparent}
      opacity={opacity}
      depthWrite={depthWrite}
    />
  );
}

export function WeatheredRemnantMaterial({
  color = materialLanguage.weatheredRemnants.near,
  roughness = materialLanguage.weatheredRemnants.roughness,
  metalness = materialLanguage.weatheredRemnants.metalness,
  transparent,
  opacity,
  depthWrite,
}: MatterMaterialProps) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      transparent={transparent}
      opacity={opacity}
      depthWrite={depthWrite}
    />
  );
}

export function BlackWaterMaterial({
  materialRef,
}: BlackWaterMaterialProps = {}) {
  return (
    <meshStandardMaterial
      ref={materialRef}
      color={materialLanguage.blackWater.surface}
      roughness={materialLanguage.blackWater.roughness}
      metalness={materialLanguage.blackWater.metalness}
      transparent
      opacity={1}
    />
  );
}

export function CelestialGoldMaterial({ color = materialLanguage.celestialGold.core, opacity = 0.48 }: GlowMaterialProps) {
  return <meshBasicMaterial color={color} transparent opacity={opacity} fog={false} />;
}

export function CelestialGoldRimMaterial({ opacity = 0.08 }: GlowMaterialProps) {
  return (
    <meshBasicMaterial
      color={materialLanguage.obsidianMatter.rimGold}
      transparent
      opacity={opacity}
      side={BackSide}
      depthWrite={false}
      blending={AdditiveBlending}
      fog={false}
    />
  );
}
