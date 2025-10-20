'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronUp, ChevronDown } from 'lucide-react';
import FilmCard from './FilmCard';
import { filmData } from '../data/filmData';

export default function FilmShowreel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastScrollTime = useRef<number>(0);
  const currentCardRef = useRef<number>(0);

  // Initialize card positions once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    
    // Set initial positions - all cards start below viewport except first
    gsap.set(cards, { y: '100vh' });
    gsap.set(cards[0], { y: '0vh' });
  }, []);

  // Update ref when currentCard changes
  useEffect(() => {
    currentCardRef.current = currentCard;
  }, [currentCard]);

  // Handle wheel events separately
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Handle wheel event for controlled scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isAnimating) return;

      // Debounce rapid scroll events (minimum 100ms between scrolls)
      const now = Date.now();
      if (now - lastScrollTime.current < 100) {
        return;
      }
      lastScrollTime.current = now;

      const cards = cardsRef.current.filter(Boolean);
      const currentCardValue = currentCardRef.current;

      if (e.deltaY > 0 && currentCardValue < cards.length - 1) {
        // Scroll down - show next card
        setIsAnimating(true);
        const nextCard = currentCardValue + 1;
        const currentCardEl = cards[currentCardValue];
        const nextCardEl = cards[nextCard];

        if (currentCardEl && nextCardEl) {
          // Animate current card up and next card in
          gsap.timeline()
            .to(currentCardEl, {
              y: '-100vh',
              duration: 0.8,
              ease: 'power2.inOut'
            })
            .to(nextCardEl, {
              y: '0vh',
              duration: 0.8,
              ease: 'power2.inOut',
              onComplete: () => {
                setCurrentCard(nextCard);
                setIsAnimating(false);
              }
            }, 0);
        } else {
          // If elements don't exist, reset animation state
          setIsAnimating(false);
        }
      } else if (e.deltaY < 0 && currentCardValue > 0) {
        // Scroll up - show previous card
        setIsAnimating(true);
        const prevCard = currentCardValue - 1;
        const currentCardEl = cards[currentCardValue];
        const prevCardEl = cards[prevCard];

        if (currentCardEl && prevCardEl) {
          // Animate current card down and previous card in
          gsap.timeline()
            .to(currentCardEl, {
              y: '100vh',
              duration: 0.8,
              ease: 'power2.inOut'
            })
            .to(prevCardEl, {
              y: '0vh',
              duration: 0.8,
              ease: 'power2.inOut',
              onComplete: () => {
                setCurrentCard(prevCard);
                setIsAnimating(false);
              }
            }, 0);
        } else {
          // If elements don't exist, reset animation state
          setIsAnimating(false);
        }
      } else if (e.deltaY < 0 && currentCardValue === 0) {
        // On first card and scrolling up - scroll to hero section
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    // Add wheel event listener to the container instead of window
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isAnimating]);

  // Click-based navigation helpers
  const goToIndex = (targetIndex: number) => {
    const cards = cardsRef.current.filter(Boolean);
    const currentIndex = currentCardRef.current;
    if (isAnimating) return;
    if (targetIndex === currentIndex) return;
    if (targetIndex < 0 || targetIndex > cards.length - 1) return;

    setIsAnimating(true);
    const currentCardEl = cards[currentIndex];
    const targetCardEl = cards[targetIndex];

    if (!currentCardEl || !targetCardEl) {
      setIsAnimating(false);
      return;
    }

    // Determine direction
    const goingDown = targetIndex > currentIndex;

    gsap.timeline()
      .to(currentCardEl, {
        y: goingDown ? '-100vh' : '100vh',
        duration: 0.8,
        ease: 'power2.inOut'
      })
      .to(targetCardEl, {
        y: '0vh',
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setCurrentCard(targetIndex);
          setIsAnimating(false);
        }
      }, 0);
  };

  const goToNext = () => goToIndex(currentCardRef.current + 1);
  const goToPrev = () => {
    if (currentCardRef.current === 0) {
      // mimic existing behavior to scroll to hero when at first card
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    goToIndex(currentCardRef.current - 1);
  };

  return (
    <div className="w-full h-[100svh] bg-white overflow-hidden relative" ref={containerRef}>
      {/* Cards Container */}
      <div className="relative w-full h-full">
        {filmData.map((film, index) => (
          <div
            key={index}
            ref={el => { cardsRef.current[index] = el; }}
            className="absolute top-0 left-0 w-full h-full"
            style={{ 
              zIndex: index === currentCard ? 100 : index + 1 
            }}
          >
            <FilmCard
              title={film.title}
              year={film.year}
              role={film.role}
              stillImage={film.stillImage}
              stillImageAlt={film.stillImageAlt}
              isActive={index === currentCard}
              isCovered={index > currentCard}
              hasAwards={film.hasAwards || false}
              link={film.link}
            />
          </div>
        ))}
      </div>
      
      {/* Scroll indicator with click navigation - Left side (matching hero layout) */}
      <div className="absolute left-4 sm:left-5 md:left-6 top-1/2 transform -translate-y-1/2 z-[200]">
        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
          {/* Up button */}
          <button
            type="button"
            onClick={goToPrev}
            disabled={isAnimating}
            aria-label="Previous film"
            className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronUp size={16} className="sm:h-[18px] sm:w-[18px]" />
          </button>

          {/* Dots indicator */}
          <div className="flex flex-col items-center space-y-2 sm:space-y-3 pointer-events-none">
            {filmData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCard 
                    ? 'bg-white scale-110 shadow-lg' 
                    : 'bg-white/30 border-2 border-white/60'
                }`}
              />
            ))}
          </div>

          {/* Down button */}
          <button
            type="button"
            onClick={goToNext}
            disabled={isAnimating || currentCard === filmData.length - 1}
            aria-label="Next film"
            className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronDown size={16} className="sm:h-[18px] sm:w-[18px]" />
          </button>
        </div>
      </div>
      
    </div>
  );
}