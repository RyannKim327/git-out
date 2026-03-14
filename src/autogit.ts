/**
 * Returns a random number in the closed interval [min, max].
 *
 * Uses the built‑in Math.random() which yields a uniformly distributed
 * 64‑bit floating‑point number in [0, 1).
 *
 * @param min - The lower bound of the range (inclusive)
 * @param max - The upper bound of the range (inclusive)
 * @returns A random number in the range [min, max]
 */
export function randomInRange(min: number, max: number): number {
  if (min > max) throw new Error('min must be <= max');
  // Math.random() is 0 ≤ r < 1.  Scale and shift to match [min, max].
  return Math.random() * (max - min) + min;
}
export function randomIntInRange(min: number, max: number): number {
  // The +1 ensures the max is included.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomFloat = randomInRange(5.2, 10.7);      // Anything between 5.2 and 10.7
const randomInt   = randomIntInRange(1, 6);        // 1, 2, 3, 4, 5, or 6
