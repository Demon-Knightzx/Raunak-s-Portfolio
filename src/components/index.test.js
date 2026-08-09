import { describe, it, expect, vi } from 'vitest';

vi.mock('gsap');
vi.mock('@gsap/react');

import * as ComponentsIndex from './index';
import NavbarDefault from './Navbar';
import WelcomeDefault from './Welcome';

describe('components barrel (src/components/index.js)', () => {
  it('re-exports Navbar matching the default export of ./Navbar', () => {
    expect(ComponentsIndex.Navbar).toBe(NavbarDefault);
  });

  it('re-exports Welcome matching the default export of ./Welcome', () => {
    expect(ComponentsIndex.Welcome).toBe(WelcomeDefault);
  });

  it('exposes Navbar and Welcome as functions', () => {
    expect(typeof ComponentsIndex.Navbar).toBe('function');
    expect(typeof ComponentsIndex.Welcome).toBe('function');
  });

  it('does not provide a default export', () => {
    expect(ComponentsIndex.default).toBeUndefined();
  });

  it('exposes exactly the Navbar and Welcome named exports', () => {
    expect(Object.keys(ComponentsIndex).sort()).toEqual(['Navbar', 'Welcome']);
  });
});