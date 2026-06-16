export function CitadelLighting() {
  return (
    <>
      <hemisphereLight color="#2b201b" groundColor="#020204" intensity={0.42} />
      <ambientLight color="#1f1814" intensity={0.1} />
      <directionalLight
        color="#ffb85f"
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
      <pointLight color="#ffb044" intensity={92} distance={155} position={[0, 32, -92]} />
      <pointLight color="#37210f" intensity={5.5} distance={70} position={[0, 4, 30]} />
      <pointLight color="#130d13" intensity={9} distance={95} position={[0, 10, 62]} />
    </>
  );
}
