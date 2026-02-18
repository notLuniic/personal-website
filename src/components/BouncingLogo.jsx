import { useState, useEffect, useRef } from 'react';

export function BouncingLogo() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 2.5, y: 2 });
  const logoRef = useRef(null);
  const animFrameRef = useRef(null);
  const posRef = useRef({ x: 100, y: 100 });
  const velRef = useRef({ x: 2.5, y: 2 });

  useEffect(() => {
    const animate = () => {
      const logo = logoRef.current;
      if (!logo) return;

      const logoW = logo.offsetWidth;
      const logoH = logo.offsetHeight;
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      let { x, y } = posRef.current;
      let { x: vx, y: vy } = velRef.current;

      x += vx;
      y += vy;

      // Bounce off edges
      if (x + logoW >= winW) { x = winW - logoW; vx = -vx; }
      if (x <= 0)             { x = 0;            vx = -vx; }
      if (y + logoH >= winH) { y = winH - logoH; vy = -vy; }
      if (y <= 0)             { y = 0;            vy = -vy; }

      posRef.current = { x, y };
      velRef.current = { x: vx, y: vy };
      setPosition({ x, y });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <img
      ref={logoRef}
      src="/wtf.svg"
      alt="wtf"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 'clamp(80px, 12vw, 160px)',
        mixBlendMode: 'difference',
        filter: 'invert(1)',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
}