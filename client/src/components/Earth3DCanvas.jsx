// import { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Sphere, Stars } from '@react-three/drei';
// import * as THREE from 'three';

// // Earth component that rotates
// function Earth() {
//   const meshRef = useRef();
//   const cloudsRef = useRef();
  
//   // Create textures procedurally for the Earth
//   const earthTexture = useMemo(() => {
//     try {
//       const canvas = document.createElement('canvas');
//       canvas.width = 512; // Reduced for performance
//       canvas.height = 256;
//       const ctx = canvas.getContext('2d');
      
//       if (!ctx) return null;
      
//       // Create gradient for ocean
//       const oceanGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//       oceanGradient.addColorStop(0, '#0c1445');
//       oceanGradient.addColorStop(0.5, '#1a237e');
//       oceanGradient.addColorStop(1, '#0d1b4c');
//       ctx.fillStyle = oceanGradient;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
      
//       // Add landmasses (simplified continents)
//       ctx.fillStyle = '#1b5e20';
      
//       // North America
//       ctx.beginPath();
//       ctx.ellipse(100, 75, 60, 40, 0.3, 0, Math.PI * 2);
//       ctx.fill();
      
//       // South America
//       ctx.beginPath();
//       ctx.ellipse(140, 160, 25, 50, 0.2, 0, Math.PI * 2);
//       ctx.fill();
      
//       // Europe/Africa
//       ctx.beginPath();
//       ctx.ellipse(260, 100, 40, 75, 0.1, 0, Math.PI * 2);
//       ctx.fill();
      
//       // Asia
//       ctx.beginPath();
//       ctx.ellipse(375, 80, 75, 50, -0.2, 0, Math.PI * 2);
//       ctx.fill();
      
//       // Australia
//       ctx.beginPath();
//       ctx.ellipse(425, 175, 25, 20, 0.3, 0, Math.PI * 2);
//       ctx.fill();
      
//       // Add city lights effect
//       ctx.fillStyle = 'rgba(255, 200, 100, 0.4)';
//       for (let i = 0; i < 100; i++) {
//         const x = Math.random() * canvas.width;
//         const y = Math.random() * canvas.height;
//         ctx.beginPath();
//         ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
//         ctx.fill();
//       }
      
//       const texture = new THREE.CanvasTexture(canvas);
//       texture.needsUpdate = true;
//       return texture;
//     } catch (e) {
//       console.warn('Failed to create earth texture:', e);
//       return null;
//     }
//   }, []);
  
//   // Create atmosphere glow texture
//   const atmosphereTexture = useMemo(() => {
//     try {
//       const canvas = document.createElement('canvas');
//       canvas.width = 128;
//       canvas.height = 128;
//       const ctx = canvas.getContext('2d');
      
//       if (!ctx) return null;
      
//       const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
//       gradient.addColorStop(0, 'rgba(100, 180, 255, 0)');
//       gradient.addColorStop(0.5, 'rgba(100, 180, 255, 0.05)');
//       gradient.addColorStop(0.8, 'rgba(100, 180, 255, 0.1)');
//       gradient.addColorStop(1, 'rgba(100, 180, 255, 0.25)');
      
//       ctx.fillStyle = gradient;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
      
//       const texture = new THREE.CanvasTexture(canvas);
//       texture.needsUpdate = true;
//       return texture;
//     } catch (e) {
//       console.warn('Failed to create atmosphere texture:', e);
//       return null;
//     }
//   }, []);

//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += delta * 0.08;
//     }
//     if (cloudsRef.current) {
//       cloudsRef.current.rotation.y += delta * 0.1;
//     }
//   });

//   if (!earthTexture) return null;

//   return (
//     <group>
//       {/* Earth */}
//       <Sphere ref={meshRef} args={[2, 48, 48]} position={[3, 0, 0]}>
//         <meshStandardMaterial
//           map={earthTexture}
//           metalness={0.1}
//           roughness={0.8}
//         />
//       </Sphere>
      
//       {/* Cloud layer */}
//       <Sphere ref={cloudsRef} args={[2.02, 32, 32]} position={[3, 0, 0]}>
//         <meshStandardMaterial
//           transparent
//           opacity={0.12}
//           color="#ffffff"
//           depthWrite={false}
//         />
//       </Sphere>
      
//       {/* Atmosphere glow */}
//       {atmosphereTexture && (
//         <Sphere args={[2.15, 32, 32]} position={[3, 0, 0]}>
//           <meshBasicMaterial
//             map={atmosphereTexture}
//             transparent
//             side={THREE.BackSide}
//             opacity={0.4}
//             blending={THREE.AdditiveBlending}
//           />
//         </Sphere>
//       )}
//     </group>
//   );
// }

// // Animated particles around Earth - simplified
// function Particles() {
//   const pointsRef = useRef();
  
//   const particlesPosition = useMemo(() => {
//     const positions = new Float32Array(500 * 3); // Reduced count
//     for (let i = 0; i < 500; i++) {
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.random() * Math.PI;
//       const r = 3 + Math.random() * 1.5;
      
//       positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) + 3;
//       positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
//       positions[i * 3 + 2] = r * Math.cos(phi);
//     }
//     return positions;
//   }, []);

//   useFrame((state, delta) => {
//     if (pointsRef.current) {
//       pointsRef.current.rotation.y += delta * 0.015;
//     }
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={500}
//           array={particlesPosition}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={0.02}
//         color="#8b5cf6"
//         transparent
//         opacity={0.5}
//         sizeAttenuation
//       />
//     </points>
//   );
// }

// // Scene content
// function SceneContent() {
//   return (
//     <>
//       <ambientLight intensity={0.15} />
//       <directionalLight position={[-5, 3, 5]} intensity={1.2} color="#ffffff" />
//       <directionalLight position={[5, 0, -5]} intensity={0.2} color="#8b5cf6" />
//       <pointLight position={[-10, 0, 10]} intensity={0.4} color="#3b82f6" />
      
//       <Earth />
//       <Particles />
//       <Stars 
//         radius={80} 
//         depth={40} 
//         count={1500} 
//         factor={3} 
//         saturation={0} 
//         fade 
//         speed={0.5} 
//       />
//     </>
//   );
// }

// // Main Canvas component
// const Earth3DCanvas = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 6], fov: 45 }}
//       dpr={[1, 1.5]} // Reduced for performance
//       style={{ 
//         background: 'transparent',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none'
//       }}
//       gl={{ 
//         antialias: false, // Disabled for performance
//         alpha: true,
//         powerPreference: 'low-power',
//         failIfMajorPerformanceCaveat: false
//       }}
//       frameloop="always" // Continuous animation
//       performance={{ min: 0.5 }}
//     >
//       <SceneContent />
//     </Canvas>
//   );
// };

// export default Earth3DCanvas;
