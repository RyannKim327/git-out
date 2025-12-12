function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNumber = getRandomInt(1, 10); // Random integer between 1-10
function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const result = randomInRange(5, 15); // Random integer between 5-15
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Usage
const floatNumber = getRandomFloat(1.5, 3.5); // Random float between 1.5-3.5
function randomNumber(min: number, max: number, inclusive: boolean = true): number {
  if (min > max) {
    throw new Error("Min cannot be greater than max");
  }
  
  if (inclusive) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.random() * (max - min) + min;
  }
}

// Usage
const intResult = randomNumber(1, 10); // Integer 1-10
const floatResult = randomNumber(1, 10, false); // Float 1-9.999...
class RandomNumberGenerator {
  static int(min: number, max: number): number {
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
const randomInt = RandomNumberGenerator.int(1, 100);
const randomFloat = RandomNumberGenerator.float(0, 1);
const randomBool = RandomNumberGenerator.boolean();
function generateRandomNumbers(count: number, min: number, max: number): number[] {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Usage
const randomNumbers = generateRandomNumbers(5, 1, 100); // 5 random numbers between 1-100
function seededRandom(seed: number): () => number {
  return function(): number {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Usage
const seededGenerator = seededRandom(12345);
const randomValue = Math.floor(seededGenerator() * (100 - 1 + 1)) + 1;
