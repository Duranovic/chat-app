import debounce from 'lodash.debounce';
import { RefObject, useEffect, useState } from 'react';

export const useScrollToEnd = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (!ref.current) return;
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
      setIsAtBottom(atBottom);
    }, 200);

    const element = ref.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    // Cleanup
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (isAtBottom) {      
      setIsAtBottom(false); 
      callback();
    }
  }, [isAtBottom, callback]);
};