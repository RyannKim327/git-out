/**
 * Returns the area of a triangle.
 *
 * You can provide:
 *   • base & height (Cartesian geometry)
 *   • three side lengths (Heron's formula)
 *
 * @param base   Base of the triangle (required if you give height)
 * @param height Height of the triangle
 * @param a      Length of side a
 * @param b      Length of side b
 * @param c      Length of side c
 * @returns      The area, or NaN if the input is invalid.
 */
export function triangleArea({
  base,
  height,
  a,
  b,
  c,
}: {
  base?: number;
  height?: number;
  a?: number;
  b?: number;
  c?: number;
}): number {
  // Cartesian: base * height / 2
  if (base !== undefined && height !== undefined) {
    if (base <= 0 || height <= 0) return NaN;
    return (base * height) / 2;
  }

  // Heron: given three sides
  if (a !== undefined && b !== undefined && c !== undefined) {
    if (a <= 0 || b <= 0 || c <= 0) return NaN;
    // Check triangle inequality: the sum of any two sides must exceed the third
    if (a + b <= c || a + c <= b || b + c <= a) return NaN;

    const s = (a + b + c) / 2; // semi‑perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  // If the required parameters aren’t supplied
  return NaN;
}
// Base + height
const area1 = triangleArea({ base: 10, height: 5 }); // 25

// Three sides
const area2 = triangleArea({ a: 3, b: 4, c: 5 }); // 6

console.log(area1, area2);
