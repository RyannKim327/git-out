/**
 * Returns a whole number between min and max (both inclusive).
 *
 * @param min The smallest possible value you want (usually a number ≥ 0)
 * @param max The largest possible value you want
 */
function randomIntInRange(min: number, max: number): number {
  // Clamp the inputs so min <= max
  const [low, high] = min <= max ? [min, max] : [max, min];

  // Math.random() → [0, 1).  Scale it to the desired width,
  // then shift by the lower bound and round down.
  return Math.floor(Math.random() * (high - low + 1)) + low;
}
const rand = randomIntInRange(5, 10);
console.log(rand); // → a whole number 5, 6, 7, 8, 9, or 10
