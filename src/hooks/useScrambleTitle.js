import { useEffect } from 'react';

export function useScrambleTitle(finalText, options = {}) {
  const {
    scrambleSpeed = 50,
    revealSpeed = 100,
    loopDelay = 2000,  // Pause before restarting scramble
    scrambleChars = '!<>-_\\/[]{}—=+*^?#________'
  } = options;

  useEffect(() => {
    let frame = 0;
    let interval;
    let isRevealed = false;

    const scramble = () => {
      let output = '';
      
      for (let i = 0; i < finalText.length; i++) {
        if (frame > i * revealSpeed / scrambleSpeed) {
          output += finalText[i];
        } else {
          output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }
      
      document.title = output;
      frame++;

      // Once fully revealed, pause then restart
      if (frame > finalText.length * revealSpeed / scrambleSpeed + 20) {
        if (!isRevealed) {
          isRevealed = true;
          clearInterval(interval);
          
          setTimeout(() => {
            frame = 0;
            isRevealed = false;
            interval = setInterval(scramble, scrambleSpeed);
          }, loopDelay);
        }
      }
    };

    interval = setInterval(scramble, scrambleSpeed);

    return () => clearInterval(interval);
  }, [finalText, scrambleSpeed, revealSpeed, loopDelay, scrambleChars]);
}