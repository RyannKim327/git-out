/**
 * Return a random integer between `min` and `max`, inclusive.
 */
function randomInt(min: number, max: number): number {
  // Math.random() → [0, 1)
  // Multiply by (max - min + 1) → [0, max - min + 1)
  // floor to get an integer in [0, max - min]
  // Shift by min to get the desired range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Example */
console.log(randomInt(5, 15)); // might print 7, 12, 15, …
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min; // [min, max)
}
