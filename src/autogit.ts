function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNum = getRandomNumber(1, 10); // Random integer between 1-10
function getRandomInRange(
  min: number, 
  max: number, 
  options?: { inclusive?: boolean; integer?: boolean }
): number {
  const inclusive = options?.inclusive ?? true;
  const integer = options?.integer ?? true;
  
  const range = max - min + (inclusive ? 1 : 0);
  const random = Math.random() * range + min;
  
  return integer ? Math.floor(random) : random;
}

// Usage examples
const randomInt = getRandomInRange(1, 10); // Integer between 1-10
const randomFloat = getRandomInRange(1, 10, { integer: false }); // Float between 1-10
const randomExclusive = getRandomInRange(1, 10, { inclusive: false }); // 1-9
class RandomNumberGenerator {
  constructor(
    private min: number,
    private max: number,
    private integer: boolean = true
  ) {}
  
  generate(): number {
    const range = this.max - this.min + 1;
    const random = Math.random() * range + this.min;
    return this.integer ? Math.floor(random) : random;
  }
}

// Usage
const diceRoll = new RandomNumberGenerator(1, 6);
console.log(diceRoll.generate()); // Random number 1-6
function getRandomDecimal(min: number, max: number, decimals: number = 2): number {
  const random = Math.random() * (max - min) + min;
  return Number(random.toFixed(decimals));
}

// Usage
const randomDecimal = getRandomDecimal(1, 5, 2); // e.g., 3.45
function getSecureRandomInRange(min: number, max: number): number {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const random = array[0] / (0xffffffff + 1);
  return Math.floor(random * (max - min + 1)) + min;
}

// Usage (only in browser environments)
const secureRandom = getSecureRandomInRange(1, 100);
// Generate random age between 18-65
const randomAge = getRandomNumber(18, 65);

// Generate random percentage (0-100)
const randomPercentage = getRandomNumber(0, 100);

// Generate random price between 10.00-99.99
const randomPrice = getRandomDecimal(10, 100, 2);
