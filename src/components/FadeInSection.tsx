// File: FadeInSection.tsx
"use client";
import { useRef, useState, useEffect, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string; // Make className optional
}

export function FadeInSection({
  children,
  className = "", // Default to empty string
}: FadeInSectionProps): JSX.Element {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.4, // Trigger when 40% of the component is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // Stop observing after first trigger
        }
      });
    }, observerOptions);

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    // Cleanup function to unobserve on component unmount
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-40'
      } transform transition-opacity duration-1000 ease-out`}
    >
      {children}
    </div>
  );
}
