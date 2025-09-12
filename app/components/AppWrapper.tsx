'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Animate main content entrance when loading is complete
  useEffect(() => {
    if (!isLoading && mainContentRef.current) {
      gsap.fromTo(mainContentRef.current, 
        { 
          opacity: 0,
          y: 20
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      );
    }
  }, [isLoading]);

  // Optional: Add a minimum loading time to ensure smooth experience
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 4000); // Maximum 4 seconds loading time

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div ref={mainContentRef} className="min-h-screen bg-[#fafafa] relative">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[#fafafa] z-0" id="background-texture">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mix-blend-screen"
          style={{
            backgroundImage: 'url(/assets/GrungePosterTextures25.png)'
          }}
        />
      </div>
      
      {/* Navigation */}
      <Navigation activePage="work" />
      
      {/* Main content */}
      {children}
    </div>
  );
}
