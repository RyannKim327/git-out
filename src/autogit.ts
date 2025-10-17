function calculateMean(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate mean of empty array");
  }
  
  const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
  return sum / numbers.length;
}

// Example usage
const numbers: number[] = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate mean of empty array");
  }
  
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  
  return sum / numbers.length;
}

// Example usage
const numbers: number[] = [10, 20, 30, 40];
const mean = calculateMean(numbers);
console.log(mean); // Output: 25
const numbers: number[] = [1, 2, 3, 4, 5];
const mean = numbers.length > 0 ? 
  numbers.reduce((a, b) => a + b, 0) / numbers.length : 
  0;

console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number | null {
  // Check for empty array
  if (numbers.length === 0) {
    return null;
  }
  
  // Filter out non-finite values (NaN, Infinity)
  const validNumbers = numbers.filter(n => isFinite(n));
  
  if (validNumbers.length === 0) {
    return null;
  }
  
  const sum = validNumbers.reduce((acc, curr) => acc + curr, 0);
  return sum / validNumbers.length;
}

// Example with edge cases
const testNumbers: number[] = [1, 2, NaN, 4, Infinity, 6];
const mean = calculateMean(testNumbers);
console.log(mean); // Output: 3.25 (ignores NaN and Infinity)
