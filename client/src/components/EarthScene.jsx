// import React, { useRef, useMemo, useState, useEffect, Suspense, lazy } from 'react';

// // Check if WebGL is supported
// const isWebGLSupported = () => {
//   try {
//     const canvas = document.createElement('canvas');
//     return !!(
//       window.WebGLRenderingContext &&
//       (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
//     );
//   } catch (e) {
//     return false;
//   }
// };

// // Static Fallback Background (shown if Three.js fails or WebGL not supported)
// const FallbackBackground = () => {
//   // Generate stars positions once
//   const stars = useMemo(() => 
//     Array.from({ length: 50 }, (_, i) => ({
//       id: i,
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       delay: `${Math.random() * 3}s`,
//       size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-0.5 h-0.5'
//     })), 
//   []);

//   return (
//     <div className="absolute inset-0 z-0 overflow-hidden">
//       {/* Gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
//       {/* Animated circles - simulating earth glow */}
//       <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
//       <div 
//         className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
//         style={{ animationDelay: '1s' }} 
//       />
//       <div 
//         className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" 
//         style={{ animationDelay: '2s' }} 
//       />
      
//       {/* Simulated Earth glow */}
//       <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 blur-2xl" />
      
//       {/* Stars effect */}
//       <div className="absolute inset-0">
//         {stars.map((star) => (
//           <div
//             key={star.id}
//             className={`absolute ${star.size} bg-white rounded-full animate-pulse`}
//             style={{
//               left: star.left,
//               top: star.top,
//               animationDelay: star.delay,
//               opacity: 0.4
//             }}
//           />
//         ))}
//       </div>
      
//       {/* Overlay gradient for text readability */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
//     </div>
//   );
// };

// // Loading state for 3D scene
// const LoadingScene = () => (
//   <div className="absolute inset-0 z-0 overflow-hidden">
//     <div className="absolute inset-0 bg-black" />
//     <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
//     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
//   </div>
// );

// // The actual 3D Earth component - wrapped in its own error boundary
// const Earth3D = React.lazy(() => import('./Earth3DCanvas.jsx').catch(() => ({
//   default: () => <FallbackBackground />
// })));

// // Main Earth Scene component with safe loading
// export const EarthScene = () => {
//   const [canRender3D, setCanRender3D] = useState(false);
//   const [hasFailed, setHasFailed] = useState(false);

//   useEffect(() => {
//     // Check WebGL support on mount
//     const supported = isWebGLSupported();
//     if (supported) {
//       // Small delay to let the main content render first
//       const timer = setTimeout(() => setCanRender3D(true), 200);
//       return () => clearTimeout(timer);
//     } else {
//       console.warn('WebGL not supported, using fallback background');
//       setHasFailed(true);
//     }
//   }, []);

//   // Show fallback if WebGL failed
//   if (hasFailed) {
//     return <FallbackBackground />;
//   }

//   // Don't render 3D until ready
//   if (!canRender3D) {
//     return <LoadingScene />;
//   }

//   return (
//     <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
//       <ErrorBoundary 
//         fallback={<FallbackBackground />}
//         onError={() => setHasFailed(true)}
//       >
//         <Suspense fallback={<LoadingScene />}>
//           <Earth3D />
//         </Suspense>
//       </ErrorBoundary>
      
//       {/* Overlay gradient for text readability - always visible */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
//     </div>
//   );
// };

// // Error Boundary Component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.warn('Earth3D Error:', error?.message || error);
//     if (this.props.onError) {
//       this.props.onError(error);
//     }
//   }

//   render() {
//     if (this.state.hasError) {
//       return this.props.fallback || null;
//     }
//     return this.props.children;
//   }
// }

// export default EarthScene;
