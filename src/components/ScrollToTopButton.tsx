// src/components/ScrollToTopButton.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-110 focus:outline-none z-50"
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
    )
  );
}