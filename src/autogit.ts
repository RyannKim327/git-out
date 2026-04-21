/**
 * Convert a decimal number to a binary string.
 *
 * @param n   A whole number (integer) you want to encode.
 * @returns   Binary representation of `n` as a string.
 */
function decimalToBinary(n: number): string {
  // JavaScript (and TypeScript) can do the heavy lifting for us.
  // make sure the number is an integer first.
  if (!Number.isFinite(n)) {
    throw new RangeError('Only finite numbers are supported.');
  }

  // The built‑in toString radix overload expects an integer.
  // If you pass a floating point value, the fractional part is
  // silently truncated, so we guard against that.
  if (!Number.isInteger(n)) {
    throw new TypeError('Only integers are supported.  For decimal fractions see the next example.');
  }

  // Negative numbers are handled automatically by toString.
  return n.toString(2);
}

// Usage examples:
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
console.log(decimalToBinary(-5));  // "-101"
function bigIntToBinary(n: bigint): string {
  if (n < 0n) {
    return '-' + (-n).toString(2);
  }
  return n.toString(2);
}

// Examples
console.log(bigIntToBinary(123456789012345678901234567890123456789n));
// "1000101100110011100111101111011011110010101110001010011001110111"
/**
 * Convert a decimal fraction (0 <= n < 1) to its binary representation.
 * Stops when the binary terminates or a max length is reached.
 *
 * @param n            The fractional part to convert.
 * @param maxBits     Optional maximum number of fractional bits.
 * @returns           Binary string including the leading "0.".
 */
function fractionalDecimalToBinary(n: number, maxBits = 32): string {
  if (n <= 0 || n >= 1) {
    throw new RangeError('Input must be a fractional part between 0 (exclusive) and 1 (exclusive).');
  }

  let result = '0.';
  let value = n;

  for (let i = 0; i < maxBits; i++) {
    value *= 2;
    if (value >= 1) {
      result += '1';
      value -= 1;
    } else {
      result += '0';
    }
    if (value === 0) break; // terminates exactly
  }

  return result;
}

// Examples
console.log(fractionalDecimalToBinary(0.625)); // "0.101"
console.log(fractionalDecimalToBinary(0.1));   // "0.00011001100110011001100110011001"
function floatToBinary(num: number, maxFractionBits = 16): string {
  if (!Number.isFinite(num)) throw new RangeError('Only finite numbers are supported.');

  const sign = num < 0 ? '-' : '';
  const absolute = Math.abs(num);
  const intPart = Math.trunc(absolute);
  const fracPart = absolute - intPart;

  const intBin = intPart.toString(2);
  const fracBin = fracPart ? fractionalDecimalToBinary(fracPart, maxFractionBits).slice(1) : '';

  return `${sign}${intBin}${fracBin ? '.' + fracBin : ''}`;
}

console.log(floatToBinary(-12.75)); // "-1100.11"
