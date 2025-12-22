/**
 * Returns the area of a triangle given its base and height.
 *
 * @param base   Length of the base side (must be > 0)
 * @param height Height corresponding to the base (must be > 0)
 * @returns      Area of the triangle
 * @throws       Error if inputs are invalid
 */
export function triangleAreaFromBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error('Base and height must be positive numbers.');
  }
  return (base * height) / 2;
}
const area = triangleAreaFromBaseHeight(8, 5); // 20
console.log(`Area = ${area}`);
/**
 * Returns the area of a triangle given the lengths of its three sides.
 *
 * @param a Length of side a (must be > 0)
 * @param b Length of side b (must be > 0)
 * @param c Length of side c (must be > 0)
 * @returns  Area of the triangle
 * @throws   Error if the sides cannot form a valid triangle
 */
export function triangleAreaFromSides(a: number, b: number, c: number): number {
  // ---- validation ---------------------------------------------------------
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
  const areaSquared = s * (s - a) * (s - b) * (s - c);

  // Guard against floating‑point rounding errors that could make areaSquared slightly negative
  if (areaSquared < 0) {
    // In practice this should never happen after the inequality check,
    // but we protect against NaN.
    return 0;
  }

  return Math.sqrt(areaSquared);
}
const area = triangleAreaFromSides(3, 4, 5); // 6 (right‑angled 3‑4‑5 triangle)
console.log(`Area = ${area}`);
type TriangleInput =
  | { base: number; height: number }
  | { a: number; b: number; c: number };

/**
 * Compute triangle area from either {base, height} or {a, b, c}.
 */
export function triangleArea(input: TriangleInput): number {
  if ('base' in input && 'height' in input) {
    return triangleAreaFromBaseHeight(input.base, input.height);
  }

  // Must be the three‑side version
  return triangleAreaFromSides(input.a, input.b, input.c);
}
console.log(triangleArea({ base: 10, height: 4 }));          // 20
console.log(triangleArea({ a: 7, b: 8, c: 9 }));            // ≈ 26.8328
// triangleArea.test.ts
import { triangleAreaFromBaseHeight, triangleAreaFromSides } from './triangleArea';

test('base‑height formula', () => {
  expect(triangleAreaFromBaseHeight(10, 5)).toBeCloseTo(25);
});

test('heron formula – 3‑4‑5 triangle', () => {
  expect(triangleAreaFromSides(3, 4, 5)).toBeCloseTo(6);
});

test('invalid sides throw', () => {
  expect(() => triangleAreaFromSides(1, 2, 3)).toThrow();
});
