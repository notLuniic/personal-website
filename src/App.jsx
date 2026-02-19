import { useScrambleTitle } from './hooks/useScrambleTitle';
import { AnimatedCursor } from './components/AnimatedCursor';
import { BouncingLogo } from './components/BouncingLogo';
import { useState, useEffect } from 'react';

function App() {
  
  useScrambleTitle('luniic.wtf', {
    scrambleChars: '█▓▒░⎔⎕⎖⎗⎘⎙⎚⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦☰☱☲☳☴☵☶☷',
    scrambleSpeed: 50,
    revealSpeed: 500,
    loopDelay: 3000
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'custom-cursor-override';
    style.innerHTML = `
      *, *::before, *::after {
        cursor: url('/cursor.png') 0 0, auto;
      }
      button, a, input, select, textarea, [role="button"] {
        cursor: url('/cursor-pointer.png') 0 0, pointer;
      }
      .hide-cursor,
      .hide-cursor *,
      .hide-cursor button,
      .hide-cursor a {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('custom-cursor-override');
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  const handleNavClick = async (e, linkName) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log(`${linkName} clicked`);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      {/* Custom Gradient Background - Fixed layer */}
      <div 
        className="fixed inset-0"
        style={{ 
          zIndex: -20,
          backgroundColor: 'hsla(245,47%,35%,1)',
          backgroundImage: `
            radial-gradient(at 99% 1%, hsla(261,40%,37%,1) 0px, transparent 50%),
            radial-gradient(at 54% 51%, hsla(269,60%,40%,1) 0px, transparent 50%),
            radial-gradient(at 3% 100%, hsla(261,38%,44%,1) 0px, transparent 50%)
          `
        }}
      />

      {/* Full-width Glassmorphism Header */}
      <header
        className="absolute top-0 left-0 right-0 z-50 flex items-end justify-end px-10 py-4"
        style={{
          background: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Right: nav links */}
        <nav className="flex items-center gap-8 flex">
          {[
            { label: '<ABOUT>',    key: 'ABOUT' },
            { label: 'PROJECTS_', key: 'PROJECTS' },
            { label: '[REDACTED]',  key: 'REDACTED'},
          ].map(({ label, key }) => (
            <button
              key={key}
              onClick={(e) => handleNavClick(e, key)}
              disabled={isLoading}
              className="bg-transparent border-none font-mono text-sm uppercase tracking-widest disabled:opacity-50 transition-opacity hover:opacity-60"
              style={{ mixBlendMode: 'difference', filter: 'invert(1)', color: 'white' }}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
      
      {/* Dog Image - Fixed to bottom left corner, 80% height */}
      <div 
        className="fixed left-0 bottom-0 w-full sm:w-2/3 md:w-1/2 lg:w-5/12 xl:w-1/3 opacity-40 sm:opacity-60 md:opacity-80 lg:opacity-100"
        style={{ 
          zIndex: -10,
          height: '80vh'
        }}
      >
        <img 
          src="/Dog.png" 
          alt="" 
          className="h-full w-auto object-contain object-left-bottom"
          style={{ 
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.1) brightness(0.95)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 gap-16">
        <AnimatedCursor isLoading={isLoading} initialPosition={cursorPosition} />

        {/* Title SVG - inverts whatever colour is behind it */}
        <img
          src="/luniic.svg"
          alt="luniic"
          style={{
            mixBlendMode: 'difference',
            filter: 'invert(1)',
            width: 'clamp(280px, 60vw, 800px)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      <BouncingLogo />
    </div>
  )
}

export default App