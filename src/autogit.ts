function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example: Generate random number between 1 and 10
const randomNum = getRandomNumber(1, 10);
console.log(randomNum);
function getRandomNumber(
  min: number, 
  max: number, 
  inclusive: boolean = true
): number {
  if (inclusive) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

// Examples
const inclusiveRandom = getRandomNumber(1, 10, true); // 1-10 inclusive
const exclusiveRandom = getRandomNumber(1, 10, false); // 1-9
class RandomNumberGenerator {
  static getInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}

// Usage
const randomInt = RandomNumberGenerator.getInteger(1, 100);
const randomFloat = RandomNumberGenerator.getFloat(1.5, 9.5);
function getValidatedRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value");
  }
  
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Both min and max must be integers");
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
try {
  const randomNum = getValidatedRandomNumber(5, 15);
  console.log(`Random number: ${randomNum}`);
} catch (error) {
  console.error(error.message);
}
function getMultipleRandomNumbers(
  min: number, 
  max: number, 
  count: number
): number[] {
  const numbers: number[] = [];
  
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  
  return numbers;
}

// Generate 5 random numbers between 1 and 100
const randomNumbers = getMultipleRandomNumbers(1, 100, 5);
