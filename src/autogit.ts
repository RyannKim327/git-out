const decimalToBinary = (num: number): string => {
  return num.toString(2);
};

// Example usage:
console.log(decimalToBinary(5));   // Output: "101"
console.log(decimalToBinary(42));  // Output: "101010"
const decimalToBinaryPadded = (num: number, bits: number): string => {
  return (num >>> 0).toString(2).padStart(bits, '0');
};

// Example usage (16-bit):
console.log(decimalToBinaryPadded(5, 8));  // Output: "00000101"
console.log(decimalToBinaryPadded(42, 8)); // Output: "00101010"
const manualDecimalToBinary = (num: number): string => {
  const isNegative = num < 0;
  let absNum = Math.abs(num);
  let binary = '';

  if (absNum === 0) return '0';

  while (absNum > 0) {
    binary = (absNum % 2) + binary; // Prepend remainder
    absNum = Math.floor(absNum / 2);
  }

  return isNegative ? `-${binary}` : binary;
};

console.log(manualDecimalToBinary(5)); // "101"
