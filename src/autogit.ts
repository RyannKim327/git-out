function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNum = getRandomNumber(1, 10); // Random number between 1 and 10 (inclusive)
function getRandomNumberInRange(min: number, max: number): number {
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNumber = getRandomNumberInRange(5, 15);
console.log(randomNumber); // Random number between 5-15
function getRandomFloat(min: number, max: number, decimals: number = 2): number {
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }
  
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(decimals));
}

// Usage
const randomFloat = getRandomFloat(0, 1, 3); // Random float between 0-1 with 3 decimal places
class RandomNumberGenerator {
  static getInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  static getFloat(min: number, max: number, decimals: number = 2): number {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(decimals));
  }
}

// Usage
const randomInt = RandomNumberGenerator.getInteger(10, 20);
const randomFloat = RandomNumberGenerator.getFloat(0.5, 2.5, 3);
function getSecureRandomNumber(min: number, max: number): number {
  const array = new Uint32Array(1);
  const randomBuffer = crypto.getRandomValues(array);
  const randomValue = randomBuffer[0] / (0xFFFFFFFF + 1);
  
  return Math.floor(randomValue * (max - min + 1)) + min;
}

// Usage (Note: Only works in browser/Node.js environments with crypto support)
const secureRandom = getSecureRandomNumber(1, 100);
type RandomRange = {
  min: number;
  max: number;
};

function generateRandomNumber(range: RandomRange): number {
  const { min, max } = range;
  
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('Both min and max must be integers');
  }
  
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNum = generateRandomNumber({ min: 1, max: 100 });
console.log(`Random number: ${randomNum}`);
