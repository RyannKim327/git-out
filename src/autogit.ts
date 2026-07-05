function decimalToBinary(n: number): string {
  // Number.prototype.toString accepts a radix (2 = binary, 10 = decimal, etc.)
  // It automatically floors the number (works for ints, truncates decimals).
  return Math.floor(n).toString(2);
}
console.log(decimalToBinary(10));   // → '1010'
console.log(decimalToBinary(255));  // → '11111111'
function binaryPadded(n: number, bits = 8): string {
  return decimalToBinary(n).padStart(bits, '0');
}

console.log(binaryPadded(10, 8));   // → '00001010'
function decimalToBinaryManual(n: number): string {
  if (n === 0) return '0';
  let result = '';
  let value = Math.floor(n);

  while (value > 0) {
    result = (value % 2) + result; // prepend remainder
    value = Math.floor(value / 2);
  }
  return result;
}
function bigIntToBinary(n: bigint): string {
  return n.toString(2);
}

console.log(bigIntToBinary(123456789012345678901234567890n));
// → '1110001101100110100100001100100000111010011010110111111001101'
function decimalToBitsArray(n: number): number[] {
  const binary = decimalToBinary(n);
  return Array.from(binary, Number); // ['1', '0', ...] → [1, 0, ...]
}
