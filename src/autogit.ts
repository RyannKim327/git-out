/**
 * Convert a decimal number to a binary string.
 * 
 * @param n – A non‑negative integer
 * @returns The binary representation as a string
 */
function decimalToBinary(n: number): string {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Input must be a non‑negative integer.');
  }

  // Handling zero explicitly – Math.pow(2, 0) is 1 but we still want "0"
  if (n === 0) return '0';

  let binary = '';
  let current = n;

  while (current > 0) {
    // Prepend the remainder (0 or 1) to the binary string
    binary = (current % 2) + binary;
    current = Math.floor(current / 2);
  }

  return binary;
}
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
console.log(decimalToBinary(0)); // "0"
