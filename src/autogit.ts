/**
 * Returns the area of a triangle given its base and height.
 *
 * @param base   Length of the base (must be > 0)
 * @param height Height measured perpendicular to the base (must be > 0)
 * @returns      The triangle's area
 * @throws       Error if inputs are invalid
 */
export function triangleAreaFromBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error('Base and height must be positive numbers.');
  }
  return (base * height) / 2;
}

// Example usage:
const area1 = triangleAreaFromBaseHeight(5, 3); // 7.5
console.log('Area (base/height):', area1);
/**
 * Returns the area of a triangle given the lengths of its three sides.
 *
 * @param a Length of side a (must be > 0)
 * @param b Length of side b (must be > 0)
 * @param c Length of side c (must be > 0)
 * @returns  The triangle's area
 * @throws   Error if the sides cannot form a valid triangle
 */
export function triangleAreaFromSides(a: number, b: number, c: number): number {
  // ---- Validation ---------------------------------------------------------
  const sides = [a, b, c];
  if (sides.some(side => side <= 0)) {
    throw new Error('All side lengths must be positive numbers.');
  }

  // Triangle inequality: sum of any two sides must be greater than the third
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('The provided side lengths do not satisfy the triangle inequality.');
  }

  // ---- Heron's formula ----------------------------------------------------
  const s = (a + b + c) / 2; // semi‑perimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  // Guard against floating‑point rounding errors that could produce NaN
  if (!Number.isFinite(area) || isNaN(area)) {
    throw new Error('Failed to compute area due to numeric instability.');
  }

  return area;
}

// Example usage:
const area2 = triangleAreaFromSides(3, 4, 5); // 6 (right‑angled 3‑4‑5 triangle)
console.log('Area (Heron):', area2);
type TriangleInput =
  | { base: number; height: number }               // base/height version
  | { a: number; b: number; c: number };           // side‑length version

/**
 * Compute triangle area from either base/height or three sides.
 *
 * @param input Object describing the triangle.
 * @returns     Area of the triangle.
 */
export function triangleArea(input: TriangleInput): number {
  if ('base' in input && 'height' in input) {
    return triangleAreaFromBaseHeight(input.base, input.height);
  }

  // Must be the three‑side variant
  return triangleAreaFromSides(input.a, input.b, input.c);
}

// Example usage:
console.log(triangleArea({ base: 8, height: 6 }));          // 24
console.log(triangleArea({ a: 7, b: 10, c: 5 }));          // ≈16.248
// triangleArea.test.ts
import {
  triangleAreaFromBaseHeight,
  triangleAreaFromSides,
  triangleArea,
} from './triangleArea';

describe('triangleAreaFromBaseHeight', () => {
  test('calculates correctly', () => {
    expect(triangleAreaFromBaseHeight(10, 4)).toBeCloseTo(20);
  });

  test('rejects non‑positive inputs', () => {
    expect(() => triangleAreaFromBaseHeight(0, 5)).toThrow();
    expect(() => triangleAreaFromBaseHeight(-2, 5)).toThrow();
  });
});

describe('triangleAreaFromSides', () => {
  test('3‑4‑5 triangle', () => {
    expect(triangleAreaFromSides(3, 4, 5)).toBeCloseTo(6);
  });

  test('invalid triangle inequality', () => {
    expect(() => triangleAreaFromSides(1, 2, 3)).toThrow();
  });
});

describe('triangleArea (wrapper)', () => {
  test('base/height path', () => {
    expect(triangleArea({ base: 5, height: 2 })).toBeCloseTo(5);
  });

  test('side‑length path', () => {
    expect(triangleArea({ a: 6, b: 6, c: 6 })).toBeCloseTo(15.588);
  });
});
npm i -D jest @types/jest ts-jest
npx jest
