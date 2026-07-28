import { vi } from 'vitest';

// Manual mock for the `gsap` package used by src/components/Welcome.jsx.
// Replaces the real tween engine with a spy so tests can assert on the
// arguments passed to gsap.to(...) without relying on real animation timing.
const gsap = {
  to: vi.fn(() => ({})),
};

export default gsap;