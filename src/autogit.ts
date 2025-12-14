/**
 * Returns a random integer N such that min ≤ N ≤ max.
 */
function randomInt(min: number, max: number): number {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

// ----- usage -----
const dice = randomInt(1, 6);   // 1..6
const grade = randomInt(50, 100); // 50..100
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
