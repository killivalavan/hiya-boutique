import { useEffect, useRef } from 'react';

export function useLockBodyScroll(open: boolean) {
  const prevOverflow = useRef<string | null>(null);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (open) {
      if (prevOverflow.current === null) {
        prevOverflow.current = document.body.style.overflow || '';
      }
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      if (prevOverflow.current !== null) {
        document.body.style.overflow = prevOverflow.current;
        prevOverflow.current = null;
      } else {
        document.body.style.overflow = '';
      }
      document.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      // cleanup on unmount
      if (prevOverflow.current !== null) {
        document.body.style.overflow = prevOverflow.current;
        prevOverflow.current = null;
      } else {
        document.body.style.overflow = '';
      }
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [open]);
}
