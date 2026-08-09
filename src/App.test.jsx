import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('#components', () => ({
  Navbar: () => <div data-testid="navbar-mock">Navbar</div>,
  Welcome: () => <div data-testid="welcome-mock">Welcome</div>,
}));

describe('App', () => {
  it('renders a main landmark', () => {
    const { container } = render(<App />);
    expect(container.querySelector('main')).not.toBeNull();
  });

  it('renders the Navbar component', () => {
    render(<App />);
    expect(screen.getAllByTestId('navbar-mock')).toHaveLength(1);
  });

  it('renders the Welcome component', () => {
    render(<App />);
    expect(screen.getAllByTestId('welcome-mock')).toHaveLength(1);
  });

  it('renders Navbar before Welcome inside main', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    const children = Array.from(main.children);

    expect(children).toHaveLength(2);
    expect(children[0]).toHaveAttribute('data-testid', 'navbar-mock');
    expect(children[1]).toHaveAttribute('data-testid', 'welcome-mock');
  });
});