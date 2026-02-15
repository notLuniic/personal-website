import { useEffect, useState } from 'react';

export function AnimatedCursor({ isLoading }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Animate through 18 frames (your sprite sheet has 18 frames)
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 18);
    }, 50); // Adjust speed here (lower = faster)

    // Hide default cursor
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

  // Calculate sprite position
  // Sprite sheet is 5 columns, frames go left to right, top to bottom
  const cols = 5;
  const frameWidth = 32; // Each frame appears to be ~32px
  const frameHeight = 32;
  
  const col = frame % cols;
  const row = Math.floor(frame / cols);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-16px, -16px)', // Center the cursor (half of 32px)
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url('/cursor-loading-spritesheet.png')`,
        backgroundPosition: `-${col * frameWidth}px -${row * frameHeight}px`,
        backgroundSize: `${cols * frameWidth}px auto`,
        imageRendering: 'pixelated', // Keep it crisp/pixelated
      }}
    />
  );
}