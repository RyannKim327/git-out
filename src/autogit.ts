area = (base * height) / 2
/**
 * Return the area of a triangle when you know its base and height.
 *
 * @param base   Length of the base side.
 * @param height Height perpendicular to that base.
 * @returns      Area of the triangle as a number.
 */
export function areaFromBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error("Base and height must be positive numbers.");
  }
  return (base * height) / 2;
}
s = (a + b + c) / 2            // semi‑perimeter
area = sqrt( s * (s−a) * (s−b) * (s−c) )
/**
 * Compute the area of a triangle from its three side lengths.
 *
 * @param a   Length of side A.
 * @param b   Length of side B.
 * @param c   Length of side C.
 * @returns   Area of the triangle (number) or NaN if the sides
 *            don’t form a valid triangle.
 */
export function areaFromSides(a: number, b: number, c: number): number {
  // Basic validation – all sides must be positive
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error("All side lengths must be positive numbers.");
  }

  // Triangle inequality check – else area calculation would
  // produce NaN or a negative under the radicand.
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error("The provided side lengths do not form a valid triangle.");
  }

  const s = (a + b + c) / 2;
  const radicand = s * (s - a) * (s - b) * (s - c);

  return Math.sqrt(radicand);
}
import { areaFromBaseHeight, areaFromSides } from "./triangle-utils";

const base = 10;
const height = 6;
console.log(areaFromBaseHeight(base, height)); // 30

const a = 7, b = 10, c = 5;
console.log(areaFromSides(a, b, c));           // ≈ 17.89
