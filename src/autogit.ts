function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min); // Round up min if decimals exist
  max = Math.floor(max); // Round down max if decimals exist
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Random integer between 1-10 (inclusive)
const randomInt = getRandomInt(1, 10);
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
// Random float between 1.5 (inclusive) and 2.5 (exclusive)
const randomFloat = getRandomFloat(1.5, 2.5);
// Generate random integer (inclusive)
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) throw new Error("min must be less than or equal to max");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random float (min inclusive, max exclusive)
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Usage
console.log(getRandomInt(5, 10));   // e.g., 7
console.log(getRandomFloat(5, 10)); // e.g., 7.12345
