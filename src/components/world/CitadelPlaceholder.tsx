export function CitadelPlaceholder() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]} receiveShadow>
        <circleGeometry args={[38, 96]} />
        <meshStandardMaterial color="#121017" roughness={0.72} metalness={0.12} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[4.5, 4.62, 96]} />
        <meshStandardMaterial color="#7a4c20" emissive="#3a1d08" emissiveIntensity={0.38} />
      </mesh>

      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[3.6, 4.8, 1.1, 8]} />
          <meshStandardMaterial color="#19141a" roughness={0.64} metalness={0.28} />
        </mesh>

        <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 3.2, 2.4, 10]} />
          <meshStandardMaterial color="#1d171b" roughness={0.58} metalness={0.32} />
        </mesh>

        <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.25, 2.05, 3.1, 10]} />
          <meshStandardMaterial color="#21181a" roughness={0.52} metalness={0.36} />
        </mesh>

        <mesh position={[0, 6.3, 0]} castShadow>
          <coneGeometry args={[0.95, 4.5, 10]} />
          <meshStandardMaterial color="#0e0c10" roughness={0.48} metalness={0.42} />
        </mesh>

        <mesh position={[0, 9.05, 0]} castShadow>
          <coneGeometry args={[0.18, 2.2, 8]} />
          <meshStandardMaterial color="#050407" roughness={0.38} metalness={0.5} />
        </mesh>
      </group>

      {[
        [-4.8, 1.6, -2.2, 0.58, 3.2],
        [4.8, 1.6, -2.2, 0.58, 3.2],
        [-6.4, 1.1, 2.8, 0.42, 2.2],
        [6.4, 1.1, 2.8, 0.42, 2.2],
      ].map(([x, y, z, radius, height]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]} castShadow>
          <coneGeometry args={[radius, height, 7]} />
          <meshStandardMaterial color="#111016" roughness={0.6} metalness={0.3} />
        </mesh>
      ))}

      {[
        [-12, 0.35, -5],
        [-9, 0.28, 5],
        [10, 0.25, -4],
        [13, 0.34, 3],
        [-4, 0.2, 9],
        [5, 0.18, 8],
      ].map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]} rotation={[0, x * 0.13, 0]} receiveShadow>
          <dodecahedronGeometry args={[0.8 + Math.abs(x) * 0.025, 0]} />
          <meshStandardMaterial color="#0c0b0f" roughness={0.82} metalness={0.18} />
        </mesh>
      ))}
    </group>
  );
}
