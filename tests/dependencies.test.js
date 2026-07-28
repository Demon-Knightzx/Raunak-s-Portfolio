import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const rootDir = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(
  readFileSync(resolve(rootDir, '..', 'package.json'), 'utf-8')
);
const packageLock = JSON.parse(
  readFileSync(resolve(rootDir, '..', 'package-lock.json'), 'utf-8')
);

const NEW_DEPENDENCIES = {
  '@gsap/react': '^2.1.2',
  gsap: '^3.15.0',
  'lucide-react': '^1.27.0',
};

describe('package.json dependencies', () => {
  it('declares the new runtime dependencies with the expected semver ranges', () => {
    Object.entries(NEW_DEPENDENCIES).forEach(([name, range]) => {
      expect(packageJson.dependencies).toHaveProperty(name, range);
    });
  });

  it('does not declare the new dependencies as devDependencies', () => {
    Object.keys(NEW_DEPENDENCIES).forEach((name) => {
      expect(packageJson.devDependencies).not.toHaveProperty(name);
    });
  });
});

describe('package-lock.json consistency', () => {
  it('matches the root dependencies declared in package.json', () => {
    const lockedRootDeps = packageLock.packages[''].dependencies;
    expect(lockedRootDeps).toEqual(packageJson.dependencies);
  });

  it('resolves each new dependency to the version declared in package.json', () => {
    Object.entries(NEW_DEPENDENCIES).forEach(([name, range]) => {
      const entry = packageLock.packages[`node_modules/${name}`];
      expect(entry).toBeDefined();

      const expectedVersion = range.replace(/^[\^~]/, '');
      expect(entry.version).toBe(expectedVersion);
    });
  });

  it('declares gsap as a peer dependency of @gsap/react compatible with the locked gsap version', () => {
    const gsapReactEntry = packageLock.packages['node_modules/@gsap/react'];
    const gsapEntry = packageLock.packages['node_modules/gsap'];

    expect(gsapReactEntry.peerDependencies).toHaveProperty('gsap', '^3.12.5');
    // The locked gsap major version must satisfy @gsap/react's declared peer range.
    expect(gsapEntry.version.startsWith('3.')).toBe(true);
  });

  it('declares a react peer dependency for lucide-react compatible with the installed react version', () => {
    const lucideEntry = packageLock.packages['node_modules/lucide-react'];
    expect(lucideEntry.peerDependencies.react).toContain('^19.0.0');
  });
});