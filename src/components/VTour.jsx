import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";

const ControlPanel = ({ isAddingPointer, setIsAddingPointer }) => (
  <div style={{
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 1000,
    padding: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px'
  }}>
    <button
      onClick={() => setIsAddingPointer(!isAddingPointer)}
      style={{
        padding: '8px 16px',
        backgroundColor: isAddingPointer ? '#ff4444' : '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {isAddingPointer ? 'Cancel Adding Pointer' : 'Add New Pointer'}
    </button>
  </div>
);

const PanoramaViewer = ({ scenes }) => {
  const { sceneId } = useParams();
  const navigate = useNavigate();
  
  const [currentScene, setCurrentScene] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAddingPointer, setIsAddingPointer] = useState(false);
  const [userPointers, setUserPointers] = useState({});
  const controlsRef = useRef();
  
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState({ title: "", description: "", link: "" });
  const [cursorStyle, setCursorStyle] = useState('default');

  useEffect(() => {
    try {
      const savedPointers = localStorage.getItem('userPointers');
      if (savedPointers) {
        setUserPointers(JSON.parse(savedPointers));
      }
    } catch (error) {
      console.error('Error loading pointers:', error);
      localStorage.setItem('userPointers', JSON.stringify({}));
    }
  }, []);

  useEffect(() => {
    if (sceneId && scenes[sceneId]) {
      setCurrentScene(sceneId);
    } else {
      const firstScene = Object.keys(scenes)[0];
      navigate(`/panorama/${firstScene}`);
    }
  }, [sceneId, scenes, navigate]);

  const handleSceneChange = (newScene) => {
    if (scenes[newScene]) {
      setIsTransitioning(true);
      gsap.to(".fade-wrapper", { 
        opacity: 0, 
        duration: 1, 
        onComplete: () => {
          navigate(`/panorama/${newScene}`);
          setTimeout(() => {
            setIsTransitioning(false);
            gsap.to(".fade-wrapper", { opacity: 1, duration: 1 });
          }, 300);
        }
      });
    }
  };

  const savePointers = (newPointers) => {
    try {
      localStorage.setItem('userPointers', JSON.stringify(newPointers));
      setUserPointers(newPointers);
    } catch (error) {
      console.error('Error saving pointers:', error);
    }
  };

  if (!currentScene) return null;

  return (
    <div className="fade-wrapper" style={{ cursor: isAddingPointer ? 'crosshair' : cursorStyle, transition: 'opacity 1s' }}>
      <ControlPanel 
        isAddingPointer={isAddingPointer}
        setIsAddingPointer={setIsAddingPointer}
      />

      <Canvas 
        camera={{ position: [0, 0, 11], fov: 75 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <PanoramaScene 
          scenes={scenes}
          currentScene={currentScene}
          setCurrentScene={handleSceneChange}
          isTransitioning={isTransitioning}
          setIsTransitioning={setIsTransitioning}
          isZoomed={isZoomed}
          setIsZoomed={setIsZoomed}
          controlsRef={controlsRef}
          setTooltipVisible={setTooltipVisible}
          setTooltipPosition={setTooltipPosition}
          setTooltipContent={setTooltipContent}
          setCursorStyle={setCursorStyle}
          isAddingPointer={isAddingPointer}
          userPointers={userPointers[currentScene] || []}
          onAddPointer={(position) => {
            const newPointer = {
              position,
              showTooltip: true,
              tooltipContent: {
                title: `Point ${(userPointers[currentScene] || []).length + 1}`,
                description: "User-added pointer",
                link: ""
              },
              targetScene: null
            };

            const updatedPointers = {
              ...userPointers,
              [currentScene]: [...(userPointers[currentScene] || []), newPointer]
            };
            savePointers(updatedPointers);
            setIsAddingPointer(false);
          }}
        />
      </Canvas>

      {tooltipVisible && (
        <div style={{
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
        }}>
          <h3 style={{ margin: 0, fontSize: '14px' }}>{tooltipContent.title}</h3>
          <p style={{ margin: 0 }}>{tooltipContent.description}</p>
          {tooltipContent.link && (
            <Link to={tooltipContent.link} style={{ color: 'lightblue' }}>
              Learn More
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

const PanoramaScene = ({ 
  scenes,
  currentScene,
  setCurrentScene,
  isTransitioning,
  setIsTransitioning,
  isZoomed,
  setIsZoomed,
  controlsRef,
  setTooltipVisible,
  setTooltipPosition,
  setTooltipContent,
  setCursorStyle,
  isAddingPointer,
  userPointers,
  onAddPointer
}) => {
  const { camera, scene, size } = useThree();
  const material = useRef();
  const zoomTarget = useRef(new THREE.Vector3());
  const initialCameraPosition = useRef(new THREE.Vector3(0, 0, 11));
  const [isZoomAnimating, setIsZoomAnimating] = useState(false);
  
  const currentTexture = useTexture(scenes[currentScene].image);
  currentTexture.encoding = THREE.sRGBEncoding;

  useEffect(() => {
    const handleDoubleClick = (event) => {
      if (isAddingPointer || isZoomAnimating) return;

      event.preventDefault();
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(scene.children[0]);

      if (intersects.length > 0) {
        setIsZoomAnimating(true);
        if (!isZoomed) {
          const zoomPoint = intersects[0].point.clone().multiplyScalar(0.2);
          zoomTarget.current.copy(zoomPoint);
          
          if (controlsRef.current) {
            controlsRef.current.enabled = false;
          }

          gsap.to(camera.position, {
            x: zoomPoint.x,
            y: zoomPoint.y,
            z: zoomPoint.z,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setIsZoomed(true);
              setIsZoomAnimating(false);
            }
          });
        } else {
          if (controlsRef.current) {
            controlsRef.current.enabled = true;
          }

          gsap.to(camera.position, {
            x: zoomTarget.current.x * 5,
            y: zoomTarget.current.y * 5,
            z: zoomTarget.current.z * 5,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setIsZoomed(false);
              setIsZoomAnimating(false);
            }
          });
        }
      }
    };

    window.addEventListener('dblclick', handleDoubleClick);
    return () => window.removeEventListener('dblclick', handleDoubleClick);
  }, [camera, scene, isZoomed, isAddingPointer, isZoomAnimating]);

  const handleClick = (event) => {
    if (!isAddingPointer) return;
    event.stopPropagation();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.nativeEvent.offsetX / size.width) * 2 - 1,
      -(event.nativeEvent.offsetY / size.height) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(scene.children[0]);

    if (intersects.length > 0) {
      onAddPointer(intersects[0].point);
    }
  };

  const handleCircleClick = async (event, pointer) => {
    event.stopPropagation();
    if (pointer.targetScene && !isTransitioning) {
      setCurrentScene(pointer.targetScene);
    }
  };

  const handlePointerOver = (event, pointer, position) => {
    if (pointer.targetScene) {
      setCursorStyle('pointer');
    }

    if (pointer.showTooltip) {
      const vector = position.clone().project(camera);
      const x = (vector.x + 1) / 2 * size.width;
      const y = -(vector.y - 1) / 2 * size.height;

      setTooltipContent(pointer.tooltipContent);
      setTooltipPosition({ x, y });
      setTooltipVisible(true);
    }
  };

  const handlePointerOut = () => {
    setCursorStyle('default');
    setTooltipVisible(false);
  };

  const allPointers = [
    ...(scenes[currentScene].pointers || []).map(p => ({ ...p, isDefault: true })),
    ...userPointers.map(p => ({ ...p, isDefault: false }))
  ];

  return (
    <>
      <mesh onClick={handleClick}>
        <sphereGeometry args={[50, 64, 64]} />
        <meshBasicMaterial map={currentTexture} side={THREE.BackSide} />
      </mesh>

      {allPointers.map((pointer, index) => (
        <mesh
          key={index}
          position={pointer.position}
          onClick={(event) => handleCircleClick(event, pointer)}
          onPointerOver={(event) => handlePointerOver(event, pointer, pointer.position)}
          onPointerOut={handlePointerOut}
          rotation={[0, 0, 0]}
        >
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial
            color={pointer.isDefault ? "#656358" : "#ff4444"}
            side={THREE.DoubleSide}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </mesh>
      ))}

      <OrbitControls
        ref={controlsRef}
        minDistance={5}
        maxDistance={100}
        enableZoom={!isZoomed}
        enablePan={false}
        enabled={!isAddingPointer && !isZoomed}
        zoomSpeed={0.5}
      />
    </>
  );
};

export default PanoramaViewer;