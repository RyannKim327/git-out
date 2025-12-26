function radixSortNonNegative32(arr: number[]): number[] {
  const n = arr.length;
  // Work with unsigned 32-bit values
  let src = arr.map(v => v >>> 0);
  let dest = new Array<number>(n);
  const RADIX = 256;
  const counts = new Array<number>(RADIX).fill(0);

  for (let pass = 0; pass < 4; pass++) {
    const shift = pass * 8;

    // reset counts
    for (let i = 0; i < RADIX; i++) counts[i] = 0;

    // count per bucket
    for (let i = 0; i < n; i++) {
      const b = (src[i] >>> shift) & 0xff;
      counts[b]++;
    }

    // prefix sums
    for (let i = 1; i < RADIX; i++) counts[i] += counts[i - 1];

    // stable placement (iterate backwards)
    for (let i = n - 1; i >= 0; i--) {
      const b = (src[i] >>> shift) & 0xff;
      const pos = --counts[b];
      dest[pos] = src[i];
    }

    // swap src/dest for next pass
    const tmp = src;
    src = dest;
    dest = tmp;
  }

  // After 4 passes (even number), sorted data ends up in `src`
  return src.slice();
}
const a = [170, 45, 75, 802, 24, 0, 3];
console.log(radixSortNonNegative32(a)); // [0, 3, 24, 45, 75, 170, 802]
function radixSortInt32(arr: number[]): number[] {
  const n = arr.length;
  // Map to unsigned by flipping the sign bit: n ^ 0x80000000
  let src = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    // Coerce to 32-bit signed, then bias to unsigned
    const v = arr[i] | 0;
    src[i] = (v ^ 0x80000000) >>> 0;
  }

  let dest = new Array<number>(n);
  const RADIX = 256;
  const counts = new Array<number>(RADIX).fill(0);

  for (let pass = 0; pass < 4; pass++) {
    const shift = pass * 8;

    // reset counts
    for (let i = 0; i < RADIX; i++) counts[i] = 0;

    // count per bucket
    for (let i = 0; i < n; i++) {
      const b = (src[i] >>> shift) & 0xff;
      counts[b]++;
    }

    // prefix sums
    for (let i = 1; i < RADIX; i++) counts[i] += counts[i - 1];

    // stable placement
    for (let i = n - 1; i >= 0; i--) {
      const b = (src[i] >>> shift) & 0xff;
      const pos = --counts[b];
      dest[pos] = src[i];
    }

    // swap for next pass
    const tmp = src;
    src = dest;
    dest = tmp;
  }

  // Map back to signed numbers
  const result = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    result[i] = (src[i] ^ 0x80000000) | 0;
  }
  return result;
}
const b = [170, -5, 75, -2147483648, 0, 3];
console.log(radixSortInt32(b)); // [-2147483648, -5, 0, 3, 75, 170]
