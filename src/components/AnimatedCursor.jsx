import { useEffect, useState } from 'react';

export function AnimatedCursor({ isLoading, initialPosition }) {
  const [position, setPosition] = useState(initialPosition);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // Update position when initialPosition changes
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  useEffect(() => {
    if (!isLoading) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 18);
    }, 50);

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    style.id = 'custom-cursor-style';
    document.head.appendChild(style);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      document.body.style.cursor = '';
      const styleElement = document.getElementById('custom-cursor-style');
      if (styleElement) styleElement.remove();
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const cols = 5;
  const frameWidth = 32;
  const frameHeight = 32;
  
  const col = frame % cols;
  const row = Math.floor(frame / cols);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(0px, 0px)',
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url('/cursor-loading-spritesheet.png')`,
        backgroundPosition: `-${col * frameWidth}px -${row * frameHeight}px`,
        backgroundSize: `${cols * frameWidth}px auto`,
        imageRendering: 'pixelated',
      }}
    />
  );
}