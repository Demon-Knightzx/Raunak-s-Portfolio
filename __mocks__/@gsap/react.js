import { useEffect } from 'react';

// Manual mock for `@gsap/react`'s useGSAP hook. The real hook sets up a
// GSAP context tied to the component lifecycle; for tests we approximate
// this with a plain effect so that the callback (and its cleanup function)
// still run at the expected points in the React lifecycle (after refs are
// attached, and on unmount) without pulling in the real GSAP context code.
export function useGSAP(callback) {
  useEffect(() => {
    const cleanup = callback();
    return typeof cleanup === 'function' ? cleanup : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}