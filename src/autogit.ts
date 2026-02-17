/**
 * Pick a random floating‑point number ≥ min and < max.
 *
 * @param min – lower bound (inclusive)
 * @param max – upper bound (exclusive)
 * @returns random number in [min, max)
 */
export function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
/**
 * Pick a random integer ≥ min and ≤ max.
 *
 * @param min – lower bound (inclusive)
 * @param max – upper bound (inclusive)
 * @returns random integer in [min, max]
 */
export function randInt(min: number, max: number): number {
  // floor ensures min can be selected; max included by +1 offset
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 0 <= x < 1
console.log(randFloat(0, 1));

// 5 <= y <= 10
console.log(randInt(5, 10));
