function decToBin(num: number): string {
  // `toString(radix)` works for any base from 2‑36.
  return num.toString(2);
}

// Example
console.log(decToBin(13)); // "1101"
function decToBinPadded(num: number, bits: number = 8): string {
  const bin = Math.abs(num).toString(2);
  const padded = bin.padStart(bits, '0');

  // Preserve the sign for negative numbers (two's‑complement style)
  if (num < 0) {
    // In two's complement the sign bit is the leftmost bit.
    // For simplicity we just prefix a minus sign; real two's‑complement
    // conversion would require more work (see section 4).
    return '-' + padded;
  }
  return padded;
}

// Example
console.log(decToBinPadded(5, 8));   // "00000101"
console.log(decToBinPadded(255, 8)); // "11111111"
function decToBinManual(num: number): string {
  if (num === 0) return '0';
  const isNeg = num < 0;
  let n = Math.abs(num);
  let bits = '';

  while (n > 0) {
    bits = (n % 2) + bits;   // prepend remainder (0 or 1)
    n = Math.floor(n / 2);
  }

  return isNeg ? '-' + bits : bits;
}

// Example
console.log(decToBinManual(42)); // "101010"
/**
 * Returns a binary string that matches the two's‑complement representation
 * of a signed integer of `bits` width.
 *
 * @param num  The decimal number (must fit in the given bit width)
 * @param bits Number of bits (8, 16, 32 …). Default = 8.
 */
function decToBinTwosComplement(num: number, bits: number = 8): string {
  const maxPos = 2 ** (bits - 1) - 1;   // largest positive value
  const minNeg = -(2 ** (bits - 1));    // most negative value

  if (num > maxPos || num < minNeg) {
    throw new RangeError(`Number ${num} does not fit in ${bits} bits`);
  }

  // For negative numbers, add 2^bits to get the unsigned representation.
  const unsigned = num < 0 ? (2 ** bits + num) : num;
  return unsigned.toString(2).padStart(bits, '0');
}

// Examples
console.log(decToBinTwosComplement(5, 8));   // "00000101"
console.log(decToBinTwosComplement(-5, 8));  // "11111011"
console.log(decToBinTwosComplement(-128, 8)); // "10000000"
function bigIntToBin(value: bigint): string {
  // `toString` works on bigint as well.
  return value.toString(2);
}

// Example
const huge = 123456789012345678901234567890n;
console.log(bigIntToBin(huge));
// → "110110110100110110100111001001011001010111001111001010101010"
// binary-utils.ts
export function toBinary(num: number, bits?: number): string {
  return bits ? decToBinPadded(num, bits) : decToBin(num);
}

export function toBinaryTwosComplement(num: number, bits: number = 8): string {
  return decToBinTwosComplement(num, bits);
}

export function toBinaryBigInt(value: bigint, bits?: number): string {
  const bin = bigIntToBin(value);
  return bits ? bin.padStart(bits, '0') : bin;
}
import { toBinary, toBinaryTwosComplement, toBinaryBigInt } from './binary-utils';

console.log(toBinary(13));                 // "1101"
console.log(toBinary(13, 8));              // "00001101"
console.log(toBinaryTwosComplement(-13)); // "11110011"
console.log(toBinaryBigInt(123n, 16));     // "0000000001111011"
// 1️⃣ Quickest way
const binary = myNumber.toString(2);

// 2️⃣ Fixed width (e.g., 8‑bit)
const binary8 = Math.abs(myNumber).toString(2).padStart(8, '0');

// 3️⃣ Signed two's‑complement (8‑bit)
const signed8 = (myNumber < 0 ? (2 ** 8 + myNumber) : myNumber)
                .toString(2).padStart(8, '0');
