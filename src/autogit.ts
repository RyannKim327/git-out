const decimal = 42;
const binaryStr = decimal.toString(2); // "101010"
console.log(binaryStr);
function toFixedBinary(n: number, width: number): string {
  const bin = n.toString(2);
  return bin.padStart(width, '0');
}

console.log(toFixedBinary(5, 8)); // "00000101"
function decimalToBinary(num: number): string {
  if (num === 0) return '0';
  let n = Math.abs(num);
  let bits = '';
  while (n > 0) {
    bits = (n % 2).toString() + bits;
    n = Math.floor(n / 2);
  }
  // Two's complement for negatives (using 32‑bit for illustration)
  if (num < 0) {
    // Pad to 32 bits
    bits = bits.padStart(32, '0');
    // Invert bits
    bits = bits.split('').map(c => (c === '0' ? '1' : '0')).join('');
    // Add 1
    let carry = 1;
    bits = bits.split('').reverse().map((b, idx) => {
      const sum = Number(b) + carry;
      carry = Math.floor(sum / 2);
      return (sum % 2).toString();
    }).reverse().join('');
  }
  return bits;
}

console.log(decimalToBinary(101)); // "1100101"
console.log(decimalToBinary(-3));  // "11111111111111111111111111111101" (32‑bit two's complement)
function bigIntToBinary(n: bigint): string {
  if (n === 0n) return '0';
  let negative = false;
  if (n < 0n) {
    negative = true;
    n = -n;          // work with the absolute value
  }
  let bits = '';
  while (n > 0n) {
    bits = (n & 1n).toString() + bits; // n & 1n gives lowest bit
    n >>= 1n;                          // shift right
  }
  return negative ? '-' + bits : bits;
}

const huge = BigInt('123456789012345678901234567890');
console.log(bigIntToBinary(huge));
// prints a long binary string
export type BinaryOpts = {
  width?: number;          // pad to this width
  useBigInt?: boolean;     // switch to BigInt mode
  signed?: boolean;        // two’s complement for negatives
};

export function toBinary(
  num: number | bigint,
  opts: BinaryOpts = {}
): string {
  const { width, useBigInt = false, signed = false } = opts;

  let bin: string;

  if (useBigInt) {
    const big = typeof num === 'bigint' ? num : BigInt(num);
    bin = signed ? bigIntToBinary(big) : big.toString(2);
  } else {
    bin = signed
      ? decimalToBinary(Number(num))
      : Number(num).toString(2);
  }

  return width ? bin.padStart(width, '0') : bin;
}
console.log(toBinary(42));                 // "101010"
console.log(toBinary(42, { width: 8 }));   // "00101010"
console.log(toBinary(-3, { useBigInt: true, signed: true })); // 32‑bit two's complement
