function calculateMean(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate mean of an empty array");
  }

  const sum = numbers.reduce((acc, current) => acc + current, 0);
  const mean = sum / numbers.length;
  return mean;
}

// Example usage:
const myNumbers = [10, 20, 30, 40, 50];
const average = calculateMean(myNumbers);
console.log(`The mean is: ${average}`); // Output: The mean is: 30
