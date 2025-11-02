/**
 * Returns a uniformly-distributed integer in the inclusive range [min, max].
 * min and max must be integers and min ≤ max.
 */
function randomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
    throw new RangeError('Arguments must be integers with min ≤ max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Examples
console.log(randomInt(1, 6));   // dice roll: 1‒6
console.log(randomInt(0, 99));  // 0‒99
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
