/**
 * Returns a random integer between min and max (inclusive).
 * @param min The lower bound (inclusive)
 * @param max The upper bound (inclusive)
 */
function randInt(min: number, max: number): number {
  // Clamp the bounds to whole numbers
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  // Math.random() -> [0, 1)
  // Multiply by the range width + 1 to get inclusive bounds
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
console.log(randInt(1, 10)); // might output: 7
