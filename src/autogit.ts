function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example: Random integer between 1 (inclusive) and 10 (inclusive)
const randomInt = getRandomInt(1, 10); // e.g., 7
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Example: Random float between 1.5 (inclusive) and 4.5 (exclusive)
const randomFloat = getRandomFloat(1.5, 4.5); // e.g., 3.14159
function getRandomInt(min: number, max: number): number {
  if (min > max) [min, max] = [max, min]; // Swap if min > max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate between 10 and 20
console.log(getRandomInt(10, 20)); // e.g., 15
async function getSecureRandomInt(min: number, max: number): Promise<number> {
  const range = max - min + 1;
  const bytes = crypto.getRandomValues(new Uint32Array(1));
  return min + (bytes[0] % range);
}

// Usage (only in secure contexts, e.g., browsers/Node.js)
getSecureRandomInt(1, 100).then(console.log); // e.g., 42
