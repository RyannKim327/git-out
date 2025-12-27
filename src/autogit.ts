function toBin(n: number): string {
  if (!Number.isInteger(n) || n < 0)
    throw new RangeError('Only non-negative integers allowed');
  return n.toString(2); // "1010" etc.
}

console.log(toBin(13)); // "1101"
function toBinManual(n: number): string {
  if (!Number.isInteger(n) || n < 0)
    throw new RangeError('Only non-negative integers allowed');

  if (n === 0) return '0';

  let bits = '';
  while (n > 0) {
    bits = (n & 1) + bits; // same as (n % 2) but faster
    n >>>= 1;               // unsigned right-shift divides by 2
  }
  return bits;
}

console.log(toBinManual(13)); // "1101"
function toBinBigInt(value: bigint): string {
  if (value < 0n) throw new RangeError('Only non-negative integers allowed');
  return value.toString(2);
}

console.log(toBinBigInt(123456789012345678901234567890n));
// → "11010001001010110110101010010000011101101…"
