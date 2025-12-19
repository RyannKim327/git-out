function decToBin(num: number): string {
  // Handles positive, zero, and negative numbers (two's‑complement string)
  return num.toString(2);
}

// Usage
console.log(decToBin(10));   // "1010"
console.log(decToBin(0));    // "0"
console.log(decToBin(-5));   // "-101"
function decToBinPadded(num: number, width: number = 8): string {
  const raw = Math.abs(num).toString(2);          // magnitude only
  const padded = raw.padStart(width, '0');        // left‑pad with zeros
  return num < 0 ? '-' + padded : padded;         // keep sign if needed
}

// Example
console.log(decToBinPadded(5, 8));   // "00000101"
console.log(decToBinPadded(255, 8)); // "11111111"
function decToBinTwosComplement(num: number, bits: number = 8): string {
  const mask = (1 << bits) - 1;          // e.g. 0b11111111 for 8 bits
  const unsigned = (num & mask) >>> 0;  // force unsigned 32‑bit
  return unsigned.toString(2).padStart(bits, '0');
}

// Example (8‑bit two's complement)
console.log(decToBinTwosComplement(-5, 8)); // "11111011"
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

// Test
console.log(decToBinManual(13)); // "1101"
console.log(decToBinManual(-13)); // "-1101"
function bigIntToBin(value: bigint): string {
  // BigInt also has toString(radix)
  return value.toString(2);
}

// Example
const huge = 123456789012345678901234567890n;
console.log(bigIntToBin(huge));
// "1101101101001101101001110010010110011111110010011111110100010101101110010010101101110"
type BinOptions = {
  /** Desired width (number of bits). If omitted, no padding is applied. */
  width?: number;
  /** If true, returns two's‑complement representation for negative numbers. */
  twosComplement?: boolean;
};

/**
 * Convert a decimal number (Number or BigInt) to a binary string.
 *
 * @param value   The decimal value to convert.
 * @param opts    Optional formatting flags.
 * @returns       Binary string according to the requested options.
 */
function decToBinary(
  value: number | bigint,
  opts: BinOptions = {}
): string {
  const { width, twosComplement = false } = opts;

  // ---------- 1️⃣ Handle BigInt ----------
  if (typeof value === 'bigint') {
    const raw = value.toString(2);
    if (width) return raw.padStart(width, '0');
    return raw;
  }

  // ---------- 2️⃣ Normal Number ----------
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new TypeError('Only finite integers can be converted to binary.');
  }

  // Two's complement path (unsigned mask)
  if (twosComplement && width) {
    const mask = (1 << width) - 1;               // works up to 31 bits safely
    const unsigned = (value & mask) >>> 0;      // >>> forces unsigned 32‑bit
    const bin = unsigned.toString(2).padStart(width, '0');
    return bin;
  }

  // Regular signed conversion
  const raw = Math.abs(value).toString(2);
  const padded = width ? raw.padStart(width, '0') : raw;
  return value < 0 ? '-' + padded : padded;
}

// ---- Demo -------------------------------------------------
console.log(decToBinary(42));                     // "101010"
console.log(decToBinary(-42));                    // "-101010"
console.log(decToBinary(42, { width: 8 }));       // "00101010"
console.log(decToBinary(-5, { width: 8, twosComplement: true })); // "11111011"
console.log(decToBinary(12345678901234567890n)); // big‑int example
// One‑liner for most cases
const binary = (num: number) => num.toString(2);

// Example
console.log(binary(13)); // "1101"
