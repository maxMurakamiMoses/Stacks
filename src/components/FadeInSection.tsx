"use client";
import { useRef, useState, useEffect, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string; 
}

export function FadeInSection({
  children,
  className = "",
}: FadeInSectionProps): JSX.Element {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.25,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

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
