const decimal = 42;          // any number you want to convert
const binary = decimal.toString(2);  // '101010'
console.log(binary);        // → 101010
/**
 * Convert a non‑negative decimal number to binary.
 */
function decimalToBinary(n: number): string {
  if (n === 0) return '0';
  let result: string = '';
  let num = n;

  while (num > 0) {
    // `num % 2` is the remainder (0 or 1)
    const bit = (num % 2).toString();
    result = bit + result;          // prepend the bit
    num = Math.floor(num / 2);       // shift right
  }

  return result;
}

// Demo
console.log(decimalToBinary(42));   // → 101010
console.log(decimalToBinary(0));    // → 0
console.log(decimalToBinary(255));  // → 11111111
function bigIntDecimalToBinary(n: bigint): string {
  if (n === 0n) return '0';
  let result = '';
  let num = n;
  while (num > 0n) {
    result = (num & 1n).toString() + result; // `& 1n` is a fast bitwise test
    num >>= 1n;   // shift right
  }
  return result;
}
// 16 decimal → 10000 binary
console.assert(decimalToBinary(16) === '10000');

// 255 decimal → 11111111 binary
console.assert(decimalToBinary(255) === '11111111');
