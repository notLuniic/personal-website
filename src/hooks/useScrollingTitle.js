import { useEffect } from 'react';

export function useScrollingTitle(text, speed = 300) {
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      document.title = text.substring(index) + text.substring(0, index);
      index = (index + 1) % text.length;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);
}