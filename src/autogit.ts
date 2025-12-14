function decToBin(num: number): string {
  if (!Number.isFinite(num) || !Number.isInteger(num)) {
    throw new Error('Input must be a finite integer.');
  }
  // The built‑in toString(radix) does the heavy lifting.
  return (num >>> 0).toString(2);
}
console.log(decToBin(10));   // "1010"
console.log(decToBin(255));  // "11111111"
console.log(decToBin(-5));   // "11111111111111111111111111111011"
/**
 * Convert a decimal integer (Number or BigInt) to a binary string.
 *
 * @param value          The decimal value to convert.
 * @param options        Optional configuration.
 * @returns              Binary representation (e.g., "-1010", "001010").
 */
export function decimalToBinary(
  value: number | bigint,
  options?: {
    /** Minimum number of bits; pads with leading zeros if needed. */
    padLength?: number;
    /** If true, keep the sign (`-`) for negative numbers. */
    signed?: boolean;
    /** If true, treat the number as an unsigned 32‑bit integer (default for Number). */
    unsigned?: boolean;
  }
): string {
  const { padLength = 0, signed = false, unsigned = typeof value === 'number' } = options ?? {};

  // ---------- 1️⃣ Normalise input ----------
  let binary: string;
  let isNegative = false;

  if (typeof value === 'bigint') {
    // BigInt has its own toString(radix) that works for arbitrarily large integers.
    if (value < 0n) {
      isNegative = true;
      value = -value;
    }
    binary = value.toString(2);
  } else {
    // ----- Number path -----
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      throw new Error('Number input must be a finite integer.');
    }

    if (unsigned) {
      // Force unsigned 32‑bit representation.
      binary = (value >>> 0).toString(2);
    } else {
      // Signed handling.
      if (value < 0) {
        isNegative = true;
        value = -value;
      }
      binary = value.toString(2);
    }
  }

  // ---------- 2️⃣ Pad if requested ----------
  if (padLength > binary.length) {
    binary = binary.padStart(padLength, '0');
  }

  // ---------- 3️⃣ Add sign if needed ----------
  if (signed && isNegative) {
    binary = '-' + binary;
  }

  return binary;
}
// Simple unsigned conversion
console.log(decimalToBinary(13));                     // "1101"

// Signed conversion (keeps the minus sign)
console.log(decimalToBinary(-13, { signed: true })); // "-1101"

// Pad to 8 bits (useful for byte‑level work)
console.log(decimalToBinary(5, { padLength: 8 }));    // "00000101"

// Unsigned 32‑bit view of a negative number
console.log(decimalToBinary(-5, { unsigned: true })); // "11111111111111111111111111111011"

// BigInt support (no overflow worries)
const huge = 123456789012345678901234567890n;
console.log(decimalToBinary(huge));                  // long binary string
/**
 * Manual decimal → binary conversion using repeated division.
 * Works for positive integers only (Number or BigInt).
 */
export function manualDecToBin(value: number | bigint): string {
  if (typeof value === 'number') {
    if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
      throw new Error('Number input must be a non‑negative integer.');
    }
    // Fast path for zero.
    if (value === 0) return '0';
  } else {
    if (value < 0n) {
      throw new Error('BigInt input must be non‑negative.');
    }
    if (value === 0n) return '0';
  }

  const bits: string[] = [];

  // Use a while‑loop that repeatedly divides by 2.
  while (value > 0) {
    // For Number we can use `% 2` and `/ 2`; for BigInt we must use the BigInt operators.
    const remainder = typeof value === 'bigint' ? (value % 2n) : (value % 2);
    bits.push(remainder.toString()); // remainder is 0 or 1
    value = typeof value === 'bigint' ? (value / 2n) : Math.floor(value / 2);
  }

  // Bits were collected LSB → MSB, so reverse them.
  return bits.reverse().join('');
}
console.log(manualDecToBin(10));               // "1010"
console.log(manualDecToBin(0));                // "0"
console.log(manualDecToBin(123456789n));       // "111010110111100110100010101"
/**
 * Convert a floating‑point decimal number to binary string.
 * Returns a string like "101.011" (integer part . fractional part).
 *
 * @param num          The decimal number (must be finite).
 * @param fracBits     Number of bits after the point (default 52, same as IEEE‑754 mantissa).
 */
export function floatToBinary(num: number, fracBits = 52): string {
  if (!Number.isFinite(num)) {
    throw new Error('Input must be a finite number.');
  }

  const sign = num < 0 ? '-' : '';
  num = Math.abs(num);

  const intPart = Math.floor(num);
  let fracPart = num - intPart;

  const intBinary = intPart.toString(2);

  // Build fractional bits by repeated multiplication by 2.
  let fracBinary = '';
  for (let i = 0; i < fracBits && fracPart > 0; i++) {
    fracPart *= 2;
    if (fracPart >= 1) {
      fracBinary += '1';
      fracPart -= 1;
    } else {
      fracBinary += '0';
    }
  }

  // Trim trailing zeros for a cleaner output (optional).
  fracBinary = fracBinary.replace(/0+$/g, '');

  return sign + (fracBinary ? `${intBinary}.${fracBinary}` : intBinary);
}
console.log(floatToBinary(10.625)); // "1010.101"
console.log(floatToBinary(-0.1, 30)); // "-0.000110011001100110011001100110"
// 1 million conversions
const nums = Array.from({ length: 1e6 }, (_, i) => i);
console.time('builtin');
for (const n of nums) n.toString(2);
console.timeEnd('builtin');   // ≈ 30‑40 ms

console.time('manual');
for (const n of nums) manualDecToBin(n);
console.timeEnd('manual');    // ≈ 150‑200 ms (≈5× slower)
// Simple, production‑ready conversion (unsigned 32‑bit)
export const toBinary = (n: number): string => (n >>> 0).toString(2);

// Example
console.log(toBinary(42)); // "101010"
