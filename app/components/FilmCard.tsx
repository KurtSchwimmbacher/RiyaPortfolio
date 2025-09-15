'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Award } from 'lucide-react';

interface FilmCardProps {
  title: string;
  year: string;
  role: string;
  stillImage?: string;
  stillImageAlt?: string;
  isActive?: boolean;
  isCovered?: boolean;
  hasAwards?: boolean;
}

export default function FilmCard({ 
  title, 
  year, 
  role, 
  stillImage, 
  stillImageAlt,
  isActive = false,
  isCovered = false,
  hasAwards = false
}: FilmCardProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Create the scrambled text effect
    const scrambleText = (element: HTMLElement, originalText: string) => {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
      let iterations = 0;
      const maxIterations = originalText.length * 2;

      const interval = setInterval(() => {
        element.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iterations >= originalText.length) {
          clearInterval(interval);
          // Final reveal with a subtle bounce
          gsap.fromTo(element, 
            { scale: 1.1 },
            { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
          );
        }

        iterations += 1;
      }, 60);
    };

    // Animate title on scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the scramble animation after a short delay
            setTimeout(() => {
              scrambleText(titleRef.current!, title);
            }, 200);
            
            // Add entrance animation for the card
            gsap.fromTo(cardRef.current, 
              { 
                opacity: 0,
                y: 100,
                scale: 0.9
              },
              { 
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out"
              }
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [title]);

  return (
    <div 
      ref={cardRef}
      className="w-full h-screen bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 flex flex-col relative group"
    >
      {/* Film Still Image */}
      <div className="flex-1 bg-gray-100 relative overflow-hidden">
        {stillImage ? (
          <img
            src={stillImage}
            alt={stillImageAlt || `${title} film still`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">Film Still</span>
          </div>
        )}
        
        {/* Dynamic overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
        
        {/* Award Icon for Award-Winning Films */}
        {hasAwards && (
          <div className="absolute top-6 left-6 z-20 group/award">
            <div className="relative flex items-center">
              <Award 
                size={24}
                className="text-white drop-shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
              
              {/* Tooltip - positioned to the right */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover/award:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-30">
                Award-winning film / Festival screenings
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/90"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Film Information - Bottom right (matching hero layout) */}
      <div className="absolute bottom-0 right-0 p-8 space-y-4 text-white z-10 text-right">
        <h3 
          ref={titleRef}
          className="text-8xl md:text-10xl lg:text-12xl font-black leading-none drop-shadow-2xl tracking-tight"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {title}
        </h3>
        
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-bold drop-shadow-lg">
            *({year})
          </div>
          <div className="text-xl font-medium drop-shadow-md">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}
