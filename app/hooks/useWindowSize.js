import { useCallback, useEffect, useRef, useState } from 'react';

// Default dimensions used during SSR and the first client render,
// before the real window size is measured in an effect.
const DEFAULT_SIZE = { width: 1280, height: 800 };

export function useWindowSize() {
  const iosHeight = useRef(DEFAULT_SIZE.height);

  const createRuler = useCallback(() => {
    let ruler = document.createElement('div');

    ruler.style.position = 'fixed';
    ruler.style.height = '100vh';
    ruler.style.width = '0';
    ruler.style.top = '0';

    document.documentElement.appendChild(ruler);

    // Set cache conscientious of device orientation
    iosHeight.current = ruler.offsetHeight;

    // Clean up after ourselves
    document.documentElement.removeChild(ruler);
    ruler = null;
  }, []);

  // Get the actual height on iOS Safari
  const getHeight = useCallback(() => {
    const isIOS = navigator?.userAgent.match(/iphone|ipod|ipad/i);

    if (isIOS) {
      createRuler();
      return iosHeight.current;
    }

    return window.innerHeight;
  }, [createRuler]);

  const getSize = useCallback(() => {
    return {
      width: window.innerWidth,
      height: getHeight(),
    };
  }, [getHeight]);

  const [windowSize, setWindowSize] = useState(DEFAULT_SIZE);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getSize]);

  return windowSize;
}
