function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNumber = getRandomInt(1, 10); // Random integer between 1 and 10
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Usage
const randomFloat = getRandomFloat(1.5, 5.5); // Random float between 1.5 and 5.5
function getRandomInRange(min: number, max: number, inclusive: boolean = true): number {
  if (inclusive) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.random() * (max - min) + min;
  }
}

// Usage
const inclusiveRandom = getRandomInRange(1, 10); // 1-10 inclusive
const exclusiveRandom = getRandomInRange(1, 10, false); // 1-10 exclusive
class RandomNumberGenerator {
  static int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static float(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}

// Usage
const randomInt = RandomNumberGenerator.int(1, 100);
const randomFloat = RandomNumberGenerator.float(0, 1);
const randomInRange = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Usage
const number = randomInRange(5, 15);
type RandomNumberOptions = {
  min: number;
  max: number;
  inclusive?: boolean;
  integer?: boolean;
};

function generateRandomNumber(options: RandomNumberOptions): number {
  const { min, max, inclusive = true, integer = true } = options;
  
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value");
  }

  if (integer) {
    return Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min;
  } else {
    return Math.random() * (max - min) + min;
  }
}

// Usage examples
const randomInt = generateRandomNumber({ min: 1, max: 10 });
const randomFloat = generateRandomNumber({ min: 0, max: 1, integer: false });
const exclusiveRandom = generateRandomNumber({ min: 5, max: 20, inclusive: false });
