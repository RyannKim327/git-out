/**
 * Returns a random integer N such that min ≤ N ≤ max.
 * Both bounds are inclusive.
 */
function randomInt(min: number, max: number): number {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

// examples
console.log(randomInt(1, 6));   // dice: 1..6
console.log(randomInt(10, 10)); // always 10
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min; // min ≤ x < max
}
