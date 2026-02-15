import { useScrambleTitle } from './hooks/useScrambleTitle';

function App() {
  useScrambleTitle('luniic.wtf', {
    scrambleChars: '█▓▒░⎔⎕⎖⎗⎘⎙⎚⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦☰☱☲☳☴☵☶☷',
    scrambleSpeed: 50,
    revealSpeed: 500,
    loopDelay: 3000
  });
  return (
    <div 
      className="bg-cover bg-center"
      style={{ 
        backgroundImage: "url('/background.png')",
        minHeight: '100vh',
        width: '100vw'
      }}
    >
    </div>
  )
}

export default App