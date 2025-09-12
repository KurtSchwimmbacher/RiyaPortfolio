'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const percentageRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create loading animation timeline
    const tl = gsap.timeline();

    // Initial animation for the percentage counter
    gsap.fromTo(percentageRef.current, 
      { 
        scale: 0.8,
        opacity: 0,
        y: 20
      },
      { 
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }
    );

    // Animate the percentage counter from 0 to 100
    tl.to({}, {
      duration: 3, // 3 seconds total loading time
      ease: "power2.out",
      onUpdate: function() {
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress);
      },
      onComplete: () => {
        // Add a slight delay before fade out
        gsap.delayedCall(0.3, () => {
          gsap.to(loadingRef.current, {
            duration: 0.8,
            opacity: 0,
            scale: 1.05,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={loadingRef}
      className="fixed inset-0 bg-[#fafafa] z-50 flex items-center justify-center"
    >
      {/* Background texture - same as main page */}
      <div className="absolute inset-0 bg-[#fafafa] z-0" id="loading-background-texture">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat mix-blend-screen"
          style={{
            backgroundImage: 'url(/assets/GrungePosterTextures25.png)'
          }}
        />
      </div>
      
      {/* Large percentage counter - positioned center right */}
      <div className="relative z-10 w-full h-full flex items-center justify-end px-8">
        <div 
          ref={percentageRef}
          className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-black tracking-tight leading-none"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}
