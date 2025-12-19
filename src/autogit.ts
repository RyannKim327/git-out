function decimalToBinary(decimal: number): string {
  return decimal.toString(2);
}

// Example usage:
const decimal = 42;
const binary = decimalToBinary(decimal);
console.log(binary); // Output: "101010"
