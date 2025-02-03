import React, { useState, useRef } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

const Panorama = ({ imageUrl, onPointerPlace }) => {
  const texture = useLoader(TextureLoader, imageUrl);
  const { camera } = useThree();
  
  const handleClick = (event) => {
    event.stopPropagation();
    const { point } = event;
    onPointerPlace(point);
  };

  return (
    <mesh scale={[-1, 1, 1]} onClick={handleClick}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
};

const Pointer = ({ position }) => (
  <mesh position={position}>
    <sphereGeometry args={[2, 32, 32]} />
    <meshBasicMaterial color="red" />
  </mesh>
);

const PanoramaViewerx = ({ imageUrl = "pan.webp" }) => {
  const [pointers, setPointers] = useState([]);
  
  const handlePointerPlace = (point) => {
    setPointers([...pointers, point]);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={-0.5}
        />
        <Panorama imageUrl={imageUrl} onPointerPlace={handlePointerPlace} />
        {pointers.map((position, index) => (
          <Pointer key={index} position={position} />
        ))}
      </Canvas>
    </div>
  );
};

export default PanoramaViewerx;