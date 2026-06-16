export function CitadelLighting() {
  return (
    <>
      <ambientLight color="#4f3827" intensity={0.34} />
      <directionalLight
        color="#f4a13a"
        intensity={4.8}
        position={[-9, 18, -18]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight color="#ff9d28" intensity={42} distance={64} position={[0, 13, -28]} />
      <pointLight color="#4a3424" intensity={8} distance={32} position={[0, 1, 18]} />
    </>
  );
}
