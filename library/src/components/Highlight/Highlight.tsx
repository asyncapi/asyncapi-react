import React, { useEffect, useRef } from 'react';

interface HighlightProps {
  elementId: string;
  duration?: number;
}

export const Highlight: React.FC<HighlightProps> = ({ elementId, duration = 2000 }) => {
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element || !highlightRef.current) return;

    const rect = element.getBoundingClientRect();
    const highlight = highlightRef.current;

    // Position the highlight overlay
    highlight.style.top = `${rect.top + window.scrollY}px`;
    highlight.style.left = `${rect.left + window.scrollX}px`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.opacity = '1';

    // Scroll the element into view
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Fade out the highlight after the duration
    const timeout = setTimeout(() => {
      highlight.style.opacity = '0';
    }, duration);

    return () => clearTimeout(timeout);
  }, [elementId, duration]);

  return (
    <div
      ref={highlightRef}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        transition: 'opacity 0.5s ease-out',
        opacity: '0',
        backgroundColor: 'rgba(3, 169, 244, 0.1)',
        border: '2px solid rgba(3, 169, 244, 0.4)',
        borderRadius: '4px',
        zIndex: 1000,
      }}
    />
  );
};