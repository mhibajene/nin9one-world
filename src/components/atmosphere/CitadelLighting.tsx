import { materialLanguage } from "@/data/materials/nin9oneMaterialLanguage";

export function CitadelLighting() {
  return (
    <>
      <hemisphereLight
        color={materialLanguage.atmosphericMatter.skyWarm}
        groundColor={materialLanguage.atmosphericMatter.groundDark}
        intensity={0.42}
      />
      <ambientLight color={materialLanguage.atmosphericMatter.ambientWarm} intensity={0.1} />
      <directionalLight
        color={materialLanguage.celestialGold.halo}
        intensity={8.2}
        position={[0, 46, -96]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={78}
        shadow-camera-bottom={-42}
        shadow-camera-near={1}
        shadow-camera-far={175}
      />
      <pointLight color={materialLanguage.celestialGold.reflection} intensity={92} distance={155} position={[0, 32, -92]} />
      <pointLight color={materialLanguage.atmosphericMatter.lowBounce} intensity={5.5} distance={70} position={[0, 4, 30]} />
      <pointLight color={materialLanguage.atmosphericMatter.deepBounce} intensity={9} distance={95} position={[0, 10, 62]} />
    </>
  );
}
