function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNum = getRandomNumber(1, 10); // Returns random integer between 1-10
function getRandomNumber(
  min: number, 
  max: number, 
  inclusive: boolean = true
): number {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
  
  const range = inclusive ? (max - min + 1) : (max - min);
  return Math.floor(Math.random() * range) + min;
}

// Usage
const randomInt = getRandomNumber(5, 15); // 5-15 inclusive
const randomExclusive = getRandomNumber(5, 15, false); // 5-14
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Usage
const randomFloat = getRandomFloat(1.5, 3.7); // Random float between 1.5-3.7
class RandomNumberGenerator {
  static integer(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  static float(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  
  static boolean(): boolean {
    return Math.random() < 0.5;
  }
}

// Usage
const randomInt = RandomNumberGenerator.integer(1, 100);
const randomFloat = RandomNumberGenerator.float(0, 1);
const randomBool = RandomNumberGenerator.boolean();
function getRandomNumbers(
  count: number, 
  min: number, 
  max: number
): number[] {
  return Array.from({ length: count }, () => 
    getRandomNumber(min, max)
  );
}

// Usage
const randomNumbers = getRandomNumbers(5, 1, 100); // [23, 45, 67, 12, 89]
function getRandomNumberByStep(
  min: number, 
  max: number, 
  step: number = 1
): number {
  const steps = Math.floor((max - min) / step);
  return min + (Math.floor(Math.random() * (steps + 1)) * step);
}

// Usage
const randomBy5 = getRandomNumberByStep(0, 100, 5); // 0, 5, 10, 15, ... 100
