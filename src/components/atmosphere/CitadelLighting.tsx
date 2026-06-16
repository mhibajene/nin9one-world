export function CitadelLighting() {
  return (
    <>
      <ambientLight color="#5b4533" intensity={0.42} />
      <directionalLight
        color="#f6a13a"
        intensity={3.4}
        position={[-7, 10, 9]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight color="#ff8a16" intensity={18} distance={22} position={[0, 3, -5]} />
    </>
  );
}
