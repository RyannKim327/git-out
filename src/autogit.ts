/**
 * Returns the area of a triangle given its base and height.
 *
 * @param base   Length of the base side (must be > 0)
 * @param height Length of the altitude to that base (must be > 0)
 * @returns      Area of the triangle
 * @throws       Error if inputs are non‑positive
 */
export function triangleAreaFromBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error('Base and height must be positive numbers.');
  }
  return (base * height) / 2;
}
const area = triangleAreaFromBaseHeight(5, 3); // 7.5
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
  // Basic validation
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('All side lengths must be positive numbers.');
  }

  // Triangle inequality check
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('The provided side lengths do not satisfy the triangle inequality.');
  }

  const s = (a + b + c) / 2; // semi‑perimeter
  const areaSquared = s * (s - a) * (s - b) * (s - c);

  // Guard against floating‑point rounding errors that could make areaSquared slightly negative
  if (areaSquared < 0) {
    return 0; // degenerate triangle (area effectively zero)
  }

  return Math.sqrt(areaSquared);
}
const area = triangleAreaFromSides(3, 4, 5); // 6 (right‑angled 3‑4‑5 triangle)
console.log(`Area = ${area}`);
// Overload signatures
export function triangleArea(base: number, height: number): number;
export function triangleArea(a: number, b: number, c: number): number;

// Implementation
export function triangleArea(...args: number[]): number {
  if (args.length === 2) {
    const [base, height] = args;
    return triangleAreaFromBaseHeight(base, height);
  }
  if (args.length === 3) {
    const [a, b, c] = args;
    return triangleAreaFromSides(a, b, c);
  }
  throw new Error('Invalid number of arguments. Provide either (base, height) or (a, b, c).');
}
console.log(triangleArea(5, 3));          // base‑height → 7.5
console.log(triangleArea(3, 4, 5));       // sides → 6
function assertEqual(actual: number, expected: number, tolerance = 1e-9) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`Assertion failed: expected ${expected}, got ${actual}`);
  }
}

// Base‑height
assertEqual(triangleAreaFromBaseHeight(10, 4), 20);
assertEqual(triangleArea(10, 4), 20);

// Heron
assertEqual(triangleAreaFromSides(3, 4, 5), 6);
assertEqual(triangleArea(3, 4, 5), 6);
export function triangleArea(...args: number[]): number {
  if (args.length === 2) {
    const [base, height] = args;
    if (base <= 0 || height <= 0) throw new Error('Base & height must be > 0');
    return (base * height) / 2;
  }

  if (args.length === 3) {
    const [a, b, c] = args;
    if (a <= 0 || b <= 0 || c <= 0) throw new Error('Sides must be > 0');
    if (a + b <= c || a + c <= b || b + c <= a) throw new Error('Invalid triangle sides');
    const s = (a + b + c) / 2;
    const areaSq = s * (s - a) * (s - b) * (s - c);
    return Math.sqrt(Math.max(areaSq, 0));
  }

  throw new Error('Provide (base, height) or (a, b, c).');
}
