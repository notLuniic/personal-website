import { useScrambleTitle } from './hooks/useScrambleTitle';
import { AnimatedCursor } from './components/AnimatedCursor';
import { useState } from 'react';

function App() {
  
  useScrambleTitle('luniic.wtf', {
    scrambleChars: '█▓▒░⎔⎕⎖⎗⎘⎙⎚⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦☰☱☲☳☴☵☶☷',
    scrambleSpeed: 50,
    revealSpeed: 500,
    loopDelay: 3000
  });

  /*Handles the loading states*/
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleClick = async (e, buttonName) => {
    // Capture click position
    setCursorPosition({ x: e.clientX, y: e.clientY });
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Add your actual navigation/logic here based on buttonName
    console.log(`${buttonName} clicked`);
  };

  return (
    <div 
      className="bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: "url('/background.png')",
        minHeight: '100vh',
        width: '100vw'
      }}
    >
      <AnimatedCursor isLoading={isLoading} initialPosition={cursorPosition} />

      <div className="flex flex-col gap-4">
        <button
          onClick={(e) => handleClick(e, 'Initialize')}
          disabled={isLoading} 
          className="px-12 py-4 bg-transparent text-green-400 border-2 border-green-400 font-mono uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] disabled:opacity-50">
          &gt; INITIALIZE
        </button>
        <button 
          onClick={(e) => handleClick(e, 'Projects')}
          disabled={isLoading}
          className="px-12 py-4 bg-transparent text-green-400 border-2 border-green-400 font-mono uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] disabled:opacity-50">
          &gt; PROJECTS_
        </button>
        <button
          onClick={(e) => handleClick(e, 'Contact')}
          disabled={isLoading} 
          className="px-12 py-4 bg-transparent text-green-400 border-2 border-green-400 font-mono uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] disabled:opacity-50">
          &gt; CONTACT.EXE
        </button>
      </div>
    </div>
  )
}

export default App