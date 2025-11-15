function decimalToBinary(num: number): string {
  return num.toString(2);
}

// Example usage:
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(7));  // "111"
console.log(decimalToBinary(0));  // "0"
console.log(decimalToBinary(-42));// "-101010" (handles negatives)
function decimalToBinaryManual(num: number): string {
  if (num === 0) return "0"; // Edge case for 0

  let binary = "";
  let absNum = Math.abs(num); // Handle negative numbers

  // Collect remainders (LSB to MSB)
  while (absNum > 0) {
    binary = (absNum % 2) + binary;
    absNum = Math.floor(absNum / 2);
  }

  return num < 0 ? `-${binary}` : binary; // Add negative sign if needed
}

// Example usage:
console.log(decimalToBinaryManual(10)); // "1010"
console.log(decimalToBinaryManual(7));  // "111"
console.log(decimalToBinaryManual(0));  // "0"
