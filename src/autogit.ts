/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum integer value (inclusive).
 * @param max - Maximum integer value (inclusive).
 */
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Example: Random integer between 5 and 20 (inclusive)
const randomInt = getRandomInt(5, 20); // e.g., 7, 15, 20
/**
 * Generates a random float between min (inclusive) and max (exclusive).
 * @param min - Minimum value (inclusive).
 * @param max - Maximum value (exclusive).
 */
const getRandomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Example: Random float between 2.5 and 8.5 (exclusive)
const randomFloat = getRandomFloat(2.5, 8.5); // e.g., 3.14, 7.89 (but never 8.5)
console.log(getRandomInt(1, 10));   // e.g., 3, 7, 10
console.log(getRandomFloat(1, 10)); // e.g., 1.23, 9.99
