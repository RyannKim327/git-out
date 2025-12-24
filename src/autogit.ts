function calculateMean(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0; // or throw an error for empty array
  }
  
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers); // Result: 3
function calculateMean(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate mean of empty array");
  }
  
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
}

// Usage with try-catch
try {
  const mean = calculateMean([10, 20, 30]); // Result: 20
  console.log(mean);
} catch (error) {
  console.error(error.message);
}
class Statistics {
  static mean(numbers: number[]): number {
    if (numbers.length === 0) {
      throw new Error("Array cannot be empty");
    }
    
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  }
}

// Usage
const data = [2, 4, 6, 8, 10];
const average = Statistics.mean(data); // Result: 6
const mean = (numbers: number[]): number => 
  numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b) / numbers.length;

// Usage
const result = mean([1, 3, 5, 7, 9]); // Result: 5
function calculateMean<T extends number>(numbers: T[]): number {
  if (numbers.length === 0) return 0;
  
  const sum = numbers.reduce((acc: number, curr: T) => acc + curr, 0);
  return sum / numbers.length;
}

// Usage - works with any numeric type
const integers = [1, 2, 3, 4, 5];
const floats = [1.5, 2.5, 3.5];
const mixed = [1, 2.5, 3];

console.log(calculateMean(integers)); // 3
console.log(calculateMean(floats));   // 2.5
console.log(calculateMean(mixed));    // 2.166...
