'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import { usePathname } from 'next/navigation';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  // Always start as loading on both server and first client render to avoid hydration mismatches
  const [isLoading, setIsLoading] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasShownLoader', '1');
    }
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

  // Decide whether to show loader only on first visit (client-side) and cap max duration
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasShown = sessionStorage.getItem('hasShownLoader');
    if (hasShown) {
      setIsLoading(false);
      return;
    }

    // Show loader and cap to 4s max on first visit
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasShownLoader', '1');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
      <div ref={mainContentRef} className="min-h-screen bg-[#fafafa] relative overflow-hidden">
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
        <Navigation
          activePage={pathname && pathname.startsWith('/bio') ? 'bio' : 'work'}
          color={pathname && pathname.startsWith('/bio') ? 'white' : 'black'}
        />
        
        {/* Main content */}
        {children}
        
      </div>
  );
}
