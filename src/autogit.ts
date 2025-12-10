function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNum = getRandomNumber(1, 10); // Random integer between 1-10
function randomInRange(
  min: number, 
  max: number, 
  options?: { inclusive?: boolean; integer?: boolean }
): number {
  const { inclusive = true, integer = true } = options || {};
  
  let random = Math.random() * (max - min + (inclusive ? 1 : 0)) + min;
  
  if (integer) {
    random = Math.floor(random);
  }
  
  return random;
}

// Usage examples
const randomInt = randomInRange(1, 10); // Integer 1-10 inclusive
const randomFloat = randomInRange(1, 10, { integer: false }); // Float 1-10
const randomExclusive = randomInRange(1, 10, { inclusive: false }); // Integer 1-9
class RandomNumberGenerator {
  static getInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  static getFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  
  static getInRange(min: number, max: number, inclusive: boolean = true): number {
    const range = max - min + (inclusive ? 1 : 0);
    return Math.floor(Math.random() * range) + min;
  }
}

// Usage
const random1 = RandomNumberGenerator.getInteger(5, 15);
const random2 = RandomNumberGenerator.getFloat(0, 1);
const random3 = RandomNumberGenerator.getInRange(1, 100, false);
const random = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Usage
const randomValue = random(50, 100); // Random integer between 50-100
function cryptoRandom(min: number, max: number): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const random = array[0] / (0xffffffff + 1);
  return Math.floor(random * (max - min + 1)) + min;
}

// Usage (only works in browser environments)
const secureRandom = cryptoRandom(1, 1000);
// Random between 0-100
const score = getRandomNumber(0, 100);

// Random percentage (0.0-1.0)
const percentage = Math.random();

// Random RGB color value (0-255)
const red = getRandomNumber(0, 255);
const green = getRandomNumber(0, 255);
const blue = getRandomNumber(0, 255);

// Random array index
const array = [1, 2, 3, 4, 5];
const randomIndex = getRandomNumber(0, array.length - 1);
