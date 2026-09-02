/**
 * Returns a random integer between `min` and `max` – both inclusive.
 * Uses the standard Math.random() (not crypto‑safe).
 */
export function randomIntInRange(min: number, max: number): number {
  // Make sure min ≤ max and that the inputs are integers
  if (!Number.isInteger(min) || !Number.isInteger(max))
    throw new Error('min and max must be integers');
  if (min > max) [min, max] = [max, min];

  const range = max - min + 1;          // how many possible numbers
  return Math.floor(Math.random() * range) + min;
}

/**
 * Returns a random floating‑point number in `[min, max)`.
 * If you want `max` inclusive, add a tiny epsilon before flooring.
 */
export function randomFloatInRange(min: number, max: number): number {
  if (min > max) [min, max] = [max, min];
  return Math.random() * (max - min) + min;
}
export function secureRandomInt(min: number, max: number): number {
  if (min > max) [min, max] = [max, min];
  const range = max - min + 1;
  // We'll grab 4 random bytes and reduce them into our range
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return (buf[0] % range) + min;
}
console.log(randomIntInRange(1, 6)); // 1‑6 like a die
console.log(randomFloatInRange(0, 1)); // 0 ≤ x < 1
console.log(secureRandomInt(1000, 9999)); // 4‑digit number, cryptographically random
