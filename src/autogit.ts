Math.floor(Math.random() * (max - min + 1)) + min
function getRandomInt(min: number, max: number): number {
  // Ensure the inputs are integers and min is less than max
  min = Math.ceil(min);
  max = Math.floor(max);
  
  // The core formula
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example: Get a random number between 1 and 10 (inclusive)
const randomNum = getRandomInt(1, 10);
console.log(randomNum); // Could be 1, 2, 3, ..., 10
function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Example: Get a random decimal between 5.5 and 10.5
const randomFloat = getRandomArbitrary(5.5, 10.5);
console.log(randomFloat); // e.g., 7.834219941012456
function getRandomIntSecure(min: number, max: number): number {
  // Validate that inputs are numbers
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Both min and max must be numbers.');
  }

  // Validate that min is less than or equal to max
  if (min > max) {
    throw new Error('Min must be less than or equal to max.');
  }

  // Calculate the safe, inclusive range
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
