import debounce from 'lodash.debounce';
import { RefObject, useEffect, useState } from 'react';
import { SCROLL_ANCHOR, scrollAnchorType } from '../utils/constants';

export const useScrollToEnd = (ref: RefObject<HTMLElement>, scrollType: scrollAnchorType, callback: () => void) => {
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (!ref.current) return;
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      let atEnd = false;
      if(scrollType === SCROLL_ANCHOR.BOTTOM) {
        atEnd = scrollTop + clientHeight >= scrollHeight - 5;
      } else {        
        atEnd = scrollTop === 0;
      }

      if(atEnd) {
        setIsAtEnd(atEnd);
      }
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
    if (isAtEnd) {      
      setIsAtEnd(false); 
      callback();
    }
  }, [isAtEnd, callback]);
};