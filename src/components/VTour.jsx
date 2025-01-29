import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as THREE from "three";

const PanoramaViewer = ({ scenes, brightness = 0, contrast = 1 }) => {
  const { sceneId } = useParams();
  const navigate = useNavigate();
  
  const [currentScene, setCurrentScene] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const controlsRef = useRef();
  
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState({ title: "", description: "", link: "" });
  const [cursorStyle, setCursorStyle] = useState('default');

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
      navigate(`/panorama/${newScene}`);
    }
  };

  if (!currentScene) return null;

  return (
    <div style={{ cursor: cursorStyle }}>
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
          brightness={brightness}
          contrast={contrast}
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
            <Link 
              to={tooltipContent.link}
              style={{ color: 'lightblue', textDecoration: 'underline' }}
            >
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
  brightness,
  contrast
}) => {
  const { camera, scene, size } = useThree();
  const transitionProgress = useRef(0);
  const transitionSpeed = useRef(0.015); 
  const zoomTarget = useRef(new THREE.Vector3());
  const initialCameraPosition = useRef();
  const nextTextureRef = useRef(null);
  
  const currentTexture = useTexture(scenes[currentScene].image);
  currentTexture.encoding = THREE.sRGBEncoding;
  
  const customShader = {
    uniforms: {
      baseTexture: { value: currentTexture },
      nextTexture: { value: null },
      progress: { value: 0.0 },
      brightness: { value: brightness },
      contrast: { value: contrast }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D baseTexture;
      uniform sampler2D nextTexture;
      uniform float progress;
      uniform float brightness;
      uniform float contrast;
      varying vec2 vUv;
      
      void main() {
        vec4 currentColor = texture2D(baseTexture, vUv);
        vec4 nextColor = texture2D(nextTexture, vUv);
        
        float smoothProgress = smoothstep(0.0, 1.0, progress);
        vec4 color = mix(currentColor, nextColor, smoothProgress);
        
        color.rgb += brightness;
        
        vec3 contrastedColor = (color.rgb - 0.5) * contrast + 0.5;
        color = vec4(contrastedColor, color.a);
        
        color = clamp(color, 0.0, 1.0);
        
        gl_FragColor = color;
      }
    `
  };

  const material = useRef(
    new THREE.ShaderMaterial({
      ...customShader,
      side: THREE.BackSide,
      transparent: true,
    })
  );

  useEffect(() => {
    if (material.current) {
      material.current.uniforms.brightness.value = brightness;
      material.current.uniforms.contrast.value = contrast;
    }
  }, [brightness, contrast]);

  const preloadTexture = async (url) => {
    return new Promise((resolve) => {
      new THREE.TextureLoader().load(url, (texture) => {
        texture.encoding = THREE.sRGBEncoding;
        resolve(texture);
      });
    });
  };

  const sphericalToCartesian = (radius, theta, phi) => {
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const circlePositions = scenes[currentScene].circles.map(config => 
    sphericalToCartesian(config.radius, config.theta, config.phi)
  );

  const handleCircleClick = async (event, config) => {
    event.stopPropagation();
    if (config.targetScene && !isTransitioning) {
      setIsTransitioning(true);
      transitionProgress.current = 0;
      
      const nextTexture = await preloadTexture(scenes[config.targetScene].image);
      nextTextureRef.current = nextTexture;
      material.current.uniforms.nextTexture.value = nextTexture;
      
      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const startTransition = async () => {
        return new Promise(resolve => {
          const animate = () => {
            transitionProgress.current += transitionSpeed.current;
            
            if (transitionProgress.current >= 1) {
              setCurrentScene(config.targetScene);
              material.current.uniforms.baseTexture.value = nextTextureRef.current;
              material.current.uniforms.progress.value = 0;
              setIsTransitioning(false);
              resolve();
            } else {
              const easedProgress = easeInOutCubic(transitionProgress.current);
              material.current.uniforms.progress.value = easedProgress;
              requestAnimationFrame(animate);
            }
          };
          animate();
        });
      };
      
      await startTransition();
    }
  };

  const handleDoubleClick = (event) => {
    event.stopPropagation();
    
    if (!initialCameraPosition.current) {
      initialCameraPosition.current = camera.position.clone();
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.nativeEvent.offsetX / size.width) * 2 - 1,
      -(event.nativeEvent.offsetY / size.height) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      const startQuaternion = camera.quaternion.clone();
      
      if (!isZoomed) {
        zoomTarget.current.copy(intersects[0].point);
        const direction = zoomTarget.current.clone().sub(camera.position).normalize();
        const distance = camera.position.distanceTo(zoomTarget.current);
        const newPosition = camera.position.clone().add(direction.multiplyScalar(distance * 0.5));
        
        const startPos = camera.position.clone();
        const startTime = Date.now();
        const duration = 1000;

        const targetQuaternion = new THREE.Quaternion();
        const targetRotation = new THREE.Vector3().subVectors(zoomTarget.current, newPosition).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const matrix = new THREE.Matrix4().lookAt(newPosition, zoomTarget.current, up);
        targetQuaternion.setFromRotationMatrix(matrix);

        const animateCamera = () => {
          const elapsed = Math.min(Date.now() - startTime, duration);
          const progress = elapsed / duration;
          const easedProgress = easeInOutQuad(progress);

          camera.position.lerpVectors(startPos, newPosition, easedProgress);
          
          camera.quaternion.slerpQuaternions(startQuaternion, targetQuaternion, easedProgress);

          if (controlsRef.current) {
            controlsRef.current.target.lerp(zoomTarget.current, easedProgress);
            controlsRef.current.update();
          }

          if (progress < 1) {
            requestAnimationFrame(animateCamera);
          }
        };

        animateCamera();
        setIsZoomed(true);
      } else {
        const startPos = camera.position.clone();
        const startTarget = controlsRef.current ? controlsRef.current.target.clone() : new THREE.Vector3();
        const startTime = Date.now();
        const duration = 1000;

        const targetQuaternion = new THREE.Quaternion();
        const targetRotation = new THREE.Vector3(0, 0, 1);
        const up = new THREE.Vector3(0, 1, 0);
        const matrix = new THREE.Matrix4().lookAt(initialCameraPosition.current, new THREE.Vector3(0, 0, 0), up);
        targetQuaternion.setFromRotationMatrix(matrix);

        const animateReset = () => {
          const elapsed = Math.min(Date.now() - startTime, duration);
          const progress = elapsed / duration;
          const easedProgress = easeInOutQuad(progress);

          camera.position.lerpVectors(startPos, initialCameraPosition.current, easedProgress);
          
          camera.quaternion.slerpQuaternions(startQuaternion, targetQuaternion, easedProgress);

          if (controlsRef.current) {
            controlsRef.current.target.lerpVectors(
              startTarget,
              new THREE.Vector3(0, 0, 0),
              easedProgress
            );
            controlsRef.current.update();
          }

          if (progress < 1) {
            requestAnimationFrame(animateReset);
          } else {
            camera.position.copy(initialCameraPosition.current);
            camera.quaternion.copy(targetQuaternion);
            if (controlsRef.current) {
              controlsRef.current.target.set(0, 0, 0);
              controlsRef.current.update();
            }
          }
        };

        animateReset();
        setIsZoomed(false);
      }
    }
  };

  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  const handlePointerOver = (event, index, position) => {
    const config = scenes[currentScene].circles[index];
    
    if (config.targetScene) {
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
        <primitive object={material.current} attach="material" />
      </mesh>

      {circlePositions.map((position, index) => (
        <mesh 
          key={index} 
          position={position}
          onClick={(event) => handleCircleClick(event, scenes[currentScene].circles[index])}
          onPointerOver={(event) => handlePointerOver(event, index, position)}
          onPointerOut={handlePointerOut}
        >
          <circleGeometry args={[1.5, 32]} />
          <meshBasicMaterial 
            color={scenes[currentScene].circles[index].targetScene ? "#656358" : "white"} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      ))}

      <OrbitControls 
        ref={controlsRef}
        minDistance={5}
        maxDistance={100}
        enableZoom={true}
        enablePan={false}
      />
    </>
  );
};

export default PanoramaViewer;