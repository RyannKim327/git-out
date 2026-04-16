/**
 * Convert a decimal number to its binary representation.
 *
 * @param dec - A Number or a string that can be parsed to a Number.
 * @returns The binary string.
 */
function toBinary(dec: number | string): string {
  // If a string was passed, turn it into a number first.
  const numericValue = Number(dec);

  // Do a sanity check – NaN results in an empty string.
  if (isNaN(numericValue)) {
    throw new Error('Input must be a valid number');
  }

  // Convert to binary.
  return numericValue.toString(2);
}

/* --- Usage examples --- */
console.log(toBinary(10));          // "1010"
console.log(toBinary('255'));       // "11111111"
console.log(toBinary(1000));        // "1111101000"
const digits = toBinary(42).split('').map(Number);
// digits => [1, 0, 1, 0, 1, 0]
function toBinaryBigInt(n: bigint): string {
  return n.toString(2);
}

console.log(toBinaryBigInt(12345678901234567890n)); // big binary string
