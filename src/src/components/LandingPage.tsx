import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animationTime, setAnimationTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (-1 to 1)
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation frame for circular motion
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setAnimationTime(Date.now() * 0.001);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Calculate automatic circular motion
  const radius = 30; // Radius of circular motion
  const speed = 0.5; // Speed of rotation (adjust for faster/slower)
  
  // Circular motion calculations
  const circularX = Math.cos(animationTime * speed) * radius;
  const circularY = Math.sin(animationTime * speed) * radius;
  
  // Combine mouse movement with circular motion
  const translateX = mousePosition.x * 20 + circularX; // Move horizontally + circular
  const translateY = mousePosition.y * 15 + circularY; // Move vertically + circular
  const rotateX = mousePosition.y * 5; // Tilt based on Y position
  const rotateY = mousePosition.x * 5; // Tilt based on X position
  const scale = isHovering ? 1.05 : 1; // Slight scale on hover

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top bar with icon and slogan */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl flex items-center justify-between border border-white rounded-2xl px-8 py-3 z-10">
        <div className="flex items-center">
          <span className="text-white text-3xl mr-4">
            {/* White Headphones Icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <rect x="2" y="17" width="4" height="7" rx="2" fill="white" stroke="white" />
              <rect x="18" y="17" width="4" height="7" rx="2" fill="white" stroke="white" />
            </svg>
          </span>
        </div>
        <div className="text-white text-2xl font-bold tracking-wide">FEEL. STREAM. CONNECT.</div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full pt-12 md:pt-0">
        <div className="flex-1 flex flex-col items-center justify-center z-10 min-h-[50vh]">
          <button
            onClick={onEnter}
            className="text-white font-extrabold focus:outline-none hover:scale-105 transition-transform text-[18vw] md:text-[10vw] leading-none tracking-tight text-center"
            style={{ letterSpacing: '0.01em' }}
            aria-label="Enter VibeSpace"
          >
            VIBE<br />SPACE
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center relative z-0">
          {/* 3D Parallax Bubble Image */}
          <div
            className="w-[80vw] max-w-2xl h-auto select-none pointer-events-none transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/vibespace-bubble.png.png"
              alt="VibeSpace Bubble"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 