import { describe, it, expect } from 'vitest';
import { readFileSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const rootDir = dirname(fileURLToPath(import.meta.url));
const wallpaperPath = resolve(rootDir, '..', 'public', 'images', 'wallpaper.png');

// The 8-byte magic number every valid PNG file must start with.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

describe('public/images/wallpaper.png', () => {
  it('exists and is a non-empty file', () => {
    const stats = statSync(wallpaperPath);
    expect(stats.isFile()).toBe(true);
    expect(stats.size).toBeGreaterThan(0);
  });

  it('is a valid PNG file (correct magic number)', () => {
    const buffer = readFileSync(wallpaperPath);
    const signature = buffer.subarray(0, PNG_SIGNATURE.length);
    expect(signature.equals(PNG_SIGNATURE)).toBe(true);
  });

  it('is referenced by the global background-image in src/index.css', () => {
    const cssPath = resolve(rootDir, '..', 'src', 'index.css');
    const css = readFileSync(cssPath, 'utf-8');
    expect(css).toContain('url("/images/wallpaper.png")');
  });
});