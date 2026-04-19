/**
 * Returns an integer between `min` and `max` (both inclusive).
 *
 * @param min - The smallest value you want (inclusive)
 * @param max - The largest value you want (inclusive)
 */
export function randomInt(min: number, max: number): number {
  // Guard against accidental inverted bounds
  if (min > max) [min, max] = [max, min];

  // `Math.random()` gives us a value in the half‑open interval [0, 1).
  // Multiply to widen the range, add 1 to make the bound inclusive,
  // then floor to truncate to an integer.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const roll = randomInt(1, 6);   // a fair d6 roll
console.log(roll);              // 1–6, every call varies
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
