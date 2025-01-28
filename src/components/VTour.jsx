import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const PanoramaViewer = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const controlsRef = useRef();

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState({ title: "", description: "", link: "" });
  
  const [cursorStyle, setCursorStyle] = useState('default');

  return (
    <>
      <div style={{ cursor: cursorStyle }}>
        <Canvas 
          camera={{ position: [0, 0, 11], fov: 75 }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <PanoramaScene 
            isZoomed={isZoomed} 
            setIsZoomed={setIsZoomed}
            controlsRef={controlsRef}
            setTooltipVisible={setTooltipVisible}
            setTooltipPosition={setTooltipPosition}
            setTooltipContent={setTooltipContent}
            setCursorStyle={setCursorStyle}
          />
        </Canvas>

        {tooltipVisible && (
          <div 
            style={{
              position: 'absolute',
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              pointerEvents: 'none',
              zIndex: 1000,
              width: '150px',
              fontSize: '12px',
              textAlign: 'center',
              transform: 'translate(-50%, -100%)',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '14px' }}>{tooltipContent.title}</h3>
            <p style={{ margin: 0 }}>{tooltipContent.description}</p>
            {tooltipContent.link && (
              <a 
                href={tooltipContent.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'lightblue', textDecoration: 'underline' }}
              >
                Learn More
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const PanoramaScene = ({ 
  isZoomed, 
  setIsZoomed, 
  controlsRef, 
  setTooltipVisible, 
  setTooltipPosition, 
  setTooltipContent,
  setCursorStyle 
}) => {
  const { camera, scene, size } = useThree();
  const texture = useTexture("/panaroma.jpg");
  const initialCameraPosition = useRef(camera.position.clone());
  const initialControlTarget = useRef(new THREE.Vector3(0, 0, 0));

  const sphericalToCartesian = (radius, theta, phi) => {
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const circleConfigurations = [
    {
      radius: 49,
      theta: Math.PI / 4,
      phi: Math.PI / 3,
      showTooltip: false,
      directLink: "https://example.com/location1",
    },
    {
      radius: 49,
      theta: -Math.PI / 2,
      phi: Math.PI / 1.8,
      showTooltip: true,
      tooltipContent: {
        title: "Bed",
        description: "This is a comfortable bed.",
        link: "",
      },
      directLink: "",
    },
    {
      radius: 49,
      theta: -Math.PI / 4,
      phi: Math.PI / 2,
      showTooltip: true,
      tooltipContent: {
        title: "Living Room",
        description: "",
        link: "",
      },
      directLink: "/living-room",
    },
  ];

  const circlePositions = circleConfigurations.map(config => 
    sphericalToCartesian(config.radius, config.theta, config.phi)
  );

  const handleCircleClick = (event, config) => {
    event.stopPropagation();
    if (config.directLink) {
      window.location.href = config.directLink;
    }
  };

  const handleDoubleClick = (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.nativeEvent.offsetX / size.width) * 2 - 1,
      -(event.nativeEvent.offsetY / size.height) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      
      if (!isZoomed) {
        initialCameraPosition.current = camera.position.clone();
        if (controlsRef.current) {
          initialControlTarget.current = controlsRef.current.target.clone();
        }

        const zoomFactor = 0.3;
        const newPosition = camera.position.clone().lerp(point, zoomFactor);
        
        camera.position.copy(newPosition);
        
        if (controlsRef.current) {
          controlsRef.current.target.copy(point);
          controlsRef.current.enableRotate = false;
          controlsRef.current.update();
        }
        
        setIsZoomed(true);
      } else {
        camera.position.copy(initialCameraPosition.current);
        
        if (controlsRef.current) {
          controlsRef.current.target.copy(initialControlTarget.current);
          controlsRef.current.enableRotate = true;
          controlsRef.current.update();
        }
        
        setIsZoomed(false);
      }
    }
  };

  const handlePointerOver = (event, index, position) => {
    const config = circleConfigurations[index];
    
    if (config.directLink) {
      setCursorStyle('pointer');
    }

    if (config.showTooltip) {
      const vector = position.clone().project(camera);
      const x = (vector.x + 1) / 2 * size.width;
      const y = -(vector.y - 1) / 2 * size.height;

      setTooltipContent(config.tooltipContent);
      setTooltipPosition({ x, y });
      setTooltipVisible(true);
    }
  };

  const handlePointerOut = () => {
    setCursorStyle('default');
    setTooltipVisible(false);
  };

  return (
    <>
      <mesh onDoubleClick={handleDoubleClick}>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial 
          map={texture} 
          side={THREE.BackSide} 
        />
      </mesh>

      {circlePositions.map((position, index) => (
        <mesh 
          key={index} 
          position={position}
          onClick={(event) => handleCircleClick(event, circleConfigurations[index])}
          onPointerOver={(event) => handlePointerOver(event, index, position)}
          onPointerOut={handlePointerOut}
        >
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial 
            color={circleConfigurations[index].directLink ? "#656358" : "white"} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}

      <OrbitControls 
        ref={controlsRef} 
        enableRotate={!isZoomed}
      />
    </>
  );
};

export default PanoramaViewer;