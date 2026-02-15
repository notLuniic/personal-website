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

  const handleClick = async (buttonName) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  
  }

  return (
    <div 
      className="bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: "url('/background.png')",
        minHeight: '100vh',
        width: '100vw'
      }}
    >
      <AnimatedCursor isLoading={isLoading} />

      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleClick('Enter')}
          disabled={isLoading} 
          className="px-12 py-4 bg-transparent text-green-400 border-2 border-green-400 font-mono uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]">
          &gt; INITIALIZE
        </button>
        <button 
          onClick={() => handleClick('Enter')}
          disabled={isLoading}
          className="px-12 py-4 bg-transparent text-green-400 border-2 border-green-400 font-mono uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]">
          &gt; PROJECTS_
        </button>
        <button
          onClick={() => handleClick('Enter')}
          disabled={isLoading} 
          className="px-12 py-4 bg-transparent text-green-400 border-2 border-green-400 font-mono uppercase tracking-wider hover:bg-green-400 hover:text-black transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]">
          &gt; CONTACT.EXE
        </button>
      </div>

    </div>
  )
}

export default App