/**
 * Convert a decimal number to binary.
 *
 * @param n – the decimal number you want to convert (must be an integer ≥ 0)
 * @returns a string containing the binary representation
 */
function decimalToBinary(n: number): string {
  if (n === 0) return '0';

  let result = '';
  let current = n;

  while (current > 0) {
    result = (current % 2).toString() + result;
    current = Math.floor(current / 2);
  }

  return result;
}
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
function decimalToBinaryWithSign(n: number): string {
  if (n < 0) return '-' + decimalToBinary(-n);
  return decimalToBinary(n);
}
