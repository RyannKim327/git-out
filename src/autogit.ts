/**
 * Convert a decimal number (base‑10) into a binary string.
 *
 * Works for both positive and negative integers.
 * If you need a signed‑bit representation (e.g., 32‑bit), adjust the `bits` argument.
 */
function decimalToBinary(num: number, bits?: number): string {
  // Handles NaN, Infinity, -Infinity
  if (!Number.isFinite(num)) {
    throw new RangeError('Input must be a finite number');
  }

  // Quick built‑in path for normal integers/small numbers
  if (!bits) {
    return num.toString(2);
  }

  // For fixed‑width binary (two's complement)
  // e.g., decimalToBinary(-1, 8) → "11111111"
  const mask = (1 << bits) - 1;
  return (num & mask).toString(2).padStart(bits, '0');
}

/* Examples */
console.log(decimalToBinary(10));           // "1010"
console.log(decimalToBinary(-5));          // "-101"
// 8‑bit representation
console.log(decimalToBinary(-5, 8));        // "11111011"
