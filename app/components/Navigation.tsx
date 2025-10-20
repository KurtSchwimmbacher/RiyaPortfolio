'use client';

import { useState } from 'react';

interface NavigationProps {
  activePage?: 'bio' | 'work' | 'contact';
  color?: 'black' | 'white';
}

export default function Navigation({ activePage = 'work', color = 'black' }: NavigationProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const textClass = color === 'white' ? 'text-white' : 'text-black';

  const navItems = [
    { id: 'bio', label: 'Bio' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-8">
      {/* Left side navigation */}
      <div className="flex space-x-8">
        {navItems.slice(0, 2).map((item) => (
          <a
            key={item.id}
            href={`/${item.id === 'work' ? '' : item.id}`}
            className={`${textClass} text-lg font-medium transition-all duration-200 ${
              activePage === item.id || hoveredLink === item.id
                ? 'underline underline-offset-4'
                : 'hover:underline hover:underline-offset-4'
            }`}
            onMouseEnter={() => setHoveredLink(item.id)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Right side navigation */}
      <div>
        <a
          href="/#contact"
          className={`${textClass} text-lg font-medium transition-all duration-200 ${
            activePage === 'contact' || hoveredLink === 'contact'
              ? 'underline underline-offset-4'
              : 'hover:underline hover:underline-offset-4'
          }`}
          onMouseEnter={() => setHoveredLink('contact')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
