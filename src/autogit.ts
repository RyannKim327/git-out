/**
 * Returns a random integer N such that min ≤ N ≤ max.
 * Both arguments are inclusive.
 */
function randomInt(min: number, max: number): number {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

// examples
const dice: number = randomInt(1, 6);      // 1..6
const percent: number = randomInt(0, 100); // 0..100
const randomFloat = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
