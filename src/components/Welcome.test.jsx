import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import gsap from 'gsap';
import Welcome from './Welcome';

vi.mock('gsap');
vi.mock('@gsap/react');

const SUBTITLE_TEXT = "Hey, I'm Raunak! Welcome to my";
const TITLE_TEXT = 'portfolio';

describe('Welcome', () => {
  beforeEach(() => {
    gsap.to.mockClear();
  });

  it('renders a section with id="welcome"', () => {
    const { container } = render(<Welcome />);
    const section = container.querySelector('section#welcome');
    expect(section).not.toBeNull();
  });

  it('renders the subtitle as one span per character, converting spaces to non-breaking spaces', () => {
    const { container } = render(<Welcome />);
    const subtitle = container.querySelector('p');
    const spans = subtitle.querySelectorAll('span');

    expect(spans).toHaveLength(SUBTITLE_TEXT.length);
    spans.forEach((span, i) => {
      const expectedChar = SUBTITLE_TEXT[i] === ' ' ? '\u00A0' : SUBTITLE_TEXT[i];
      expect(span.textContent).toBe(expectedChar);
      expect(span.className).toBe('text-3xl font-georama');
    });
  });

  it('renders the title as one span per character with the title className', () => {
    const { container } = render(<Welcome />);
    const title = container.querySelector('h1');
    const spans = title.querySelectorAll('span');

    expect(spans).toHaveLength(TITLE_TEXT.length);
    spans.forEach((span, i) => {
      expect(span.textContent).toBe(TITLE_TEXT[i]);
      expect(span.className).toBe('text-9xl font-georama');
    });
  });

  it('renders the small-screen notice', () => {
    const { container, getByText } = render(<Welcome />);
    expect(container.querySelector('.small-screen')).not.toBeNull();
    expect(
      getByText('This Portfolio is designed for desktop/tablet screens only.')
    ).toBeInTheDocument();
  });

  it('animates letters closer to the cursor toward the max font weight on mousemove', () => {
    const { container } = render(<Welcome />);
    const title = container.querySelector('h1');
    const letters = title.querySelectorAll('span');

    // Force a deterministic layout: container starts at x=0, first letter
    // is centered at x=10, second letter centered at x=110.
    title.getBoundingClientRect = () => ({ left: 0 });
    letters[0].getBoundingClientRect = () => ({ left: 0, width: 20 });
    letters[1].getBoundingClientRect = () => ({ left: 100, width: 20 });

    fireEvent.mouseMove(title, { clientX: 10 });

    expect(gsap.to).toHaveBeenCalledTimes(letters.length);

    const call0 = gsap.to.mock.calls.find(([target]) => target === letters[0]);
    const call1 = gsap.to.mock.calls.find(([target]) => target === letters[1]);
    expect(call0).toBeDefined();
    expect(call1).toBeDefined();

    // Letter 0 is exactly under the cursor (distance 0) -> intensity 1 -> max weight.
    expect(call0[1]).toMatchObject({ duration: 0.25, ease: 'power2.out' });
    expect(call0[1].fontVariationSettings).toBe("'wght' 900");

    // Letter 1 is far from the cursor -> weight approaches (but doesn't reach) the min.
    const distance = Math.abs(10 - 110);
    const intensity = Math.exp(-(distance ** 2) / 2000);
    const expectedWeight = 400 + (900 - 400) * intensity;
    const actualWeight = Number(call1[1].fontVariationSettings.match(/'wght' ([\d.]+)/)[1]);
    expect(actualWeight).toBeCloseTo(expectedWeight, 5);
    expect(actualWeight).toBeLessThan(Number(call0[1].fontVariationSettings.match(/'wght' ([\d.]+)/)[1]));
  });

  it('resets every title letter to the default weight on mouseleave', () => {
    const { container } = render(<Welcome />);
    const title = container.querySelector('h1');
    const letters = title.querySelectorAll('span');

    fireEvent.mouseLeave(title);

    expect(gsap.to).toHaveBeenCalledTimes(letters.length);
    gsap.to.mock.calls.forEach(([, vars]) => {
      expect(vars).toMatchObject({ duration: 0.3, fontVariationSettings: "'wght' 400" });
    });
  });

  it('resets every subtitle letter to its default weight on mouseleave', () => {
    const { container } = render(<Welcome />);
    const subtitle = container.querySelector('p');
    const letters = subtitle.querySelectorAll('span');

    fireEvent.mouseLeave(subtitle);

    expect(gsap.to).toHaveBeenCalledTimes(letters.length);
    gsap.to.mock.calls.forEach(([, vars]) => {
      expect(vars).toMatchObject({ duration: 0.3, fontVariationSettings: "'wght' 100" });
    });
  });

  it('removes its mousemove/mouseleave listeners on unmount', () => {
    const { container, unmount } = render(<Welcome />);
    const title = container.querySelector('h1');

    unmount();
    gsap.to.mockClear();

    fireEvent.mouseMove(title, { clientX: 5 });
    fireEvent.mouseLeave(title);

    expect(gsap.to).not.toHaveBeenCalled();
  });
});