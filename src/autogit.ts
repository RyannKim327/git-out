function calculateMean(numbers: number[]): number {
  if (numbers.length === 0) return NaN; // or throw an error if preferred
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

// Example usage:
const values = [10, 20, 30, 40];
const mean = calculateMean(values);
console.log(mean); // Output: 25
