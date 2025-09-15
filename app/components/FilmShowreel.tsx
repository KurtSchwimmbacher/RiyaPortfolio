'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import FilmCard from './FilmCard';

// Sample film data
const filmData = [
  {
    title: "Die Fokken Voel",
    year: "2025",
    role: " Production designer, Co-director, Gaffer, Actor ",
    stillImage: "/assets/films/die_fokken_voel.png",
    stillImageAlt: "Die Fokken Voel film still"
  },
  {
    title: "Mushrooms",
    year: "2024",
    role: "Director, Producer, Writer, Production designer, Editor",
    stillImage: "/assets/films/mushrooms.png",
    stillImageAlt: "Mushrooms film still"
  },
  {
    title: "The Overcoat",
    year: "2024",
    role: "Director, Production designer, Producer, Editor",
    stillImage: "/assets/films/the_overcoat.png",
    stillImageAlt: "The Overcoat film still"
  },
  {
    title: "Til Death Do I Part",
    year: "2024",
    role: "Director, Writer, Production designer, Editor, Producer",
    stillImage: "/assets/films/til_death_do_i_part.png",
    stillImageAlt: "Til Death Do I Part film still"
  },
  {
    title: "Womb With A Woo",
    year: "2024",
    role: "Head Production Designer",
    stillImage: "/assets/films/womb_with_a_woo.png",
    stillImageAlt: "Womb With A Woo film still"
  }
];

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

  return (
    <div className="w-full h-screen bg-white overflow-hidden relative" ref={containerRef}>
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
            />
          </div>
        ))}
      </div>
      
      {/* Scroll indicator - Left side (matching hero layout) */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-[200] pointer-events-none">
        <div className="flex flex-col space-y-3">
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
      </div>
      
    </div>
  );
}