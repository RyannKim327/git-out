function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNum = getRandomNumber(1, 10); // Returns integer between 1-10
function getRandomInRange(min: number, max: number, inclusive: boolean = true): number {
  const range = max - min + (inclusive ? 1 : 0);
  return Math.random() * range + min;
}

// Usage examples
const randomInt = Math.floor(getRandomInRange(1, 10)); // Integer 1-10
const randomFloat = getRandomInRange(1, 10, false); // Float 1.0-9.999...
function getRandomNumber(
  min: number, 
  max: number, 
  decimalPlaces: number = 0
): number {
  const randomValue = Math.random() * (max - min) + min;
  return decimalPlaces === 0 
    ? Math.floor(randomValue)
    : parseFloat(randomValue.toFixed(decimalPlaces));
}

// Usage
const integer = getRandomNumber(5, 15); // Integer 5-15
const decimal = getRandomNumber(0, 1, 2); // Decimal 0.00-0.99
class RandomNumberGenerator {
  static integer(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static float(min: number, max: number, precision: number = 2): number {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(precision));
  }
}

// Usage
const randomInt = RandomNumberGenerator.integer(1, 100);
const randomFloat = RandomNumberGenerator.float(0, 1, 3);
const randomInRange = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Usage
const result = randomInRange(20, 30); // 20-30
function getRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
