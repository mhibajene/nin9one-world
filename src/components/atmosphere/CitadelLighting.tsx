export function CitadelLighting() {
  return (
    <>
      <ambientLight color="#4f3827" intensity={0.34} />
      <directionalLight
        color="#f4a13a"
        intensity={5.6}
        position={[-18, 54, -70]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight color="#ff9d28" intensity={68} distance={120} position={[0, 34, -82]} />
      <pointLight color="#4a3424" intensity={10} distance={78} position={[0, 1, 38]} />
    </>
  );
}
