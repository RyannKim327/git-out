/**
 * Stable counting sort on a single 8-bit digit.
 * @param src      source array
 * @param dst      destination array (same length as src)
 * @param exp      0→bits 0-7, 1→bits 8-15, 2→bits 16-23, 3→bits 24-31
 */
function countingSort8(src: number[], dst: number[], exp: number): void {
  const count = new Uint32Array(256);            // 0-255
  const mask = 0xff << (exp * 8);                // select the byte
  const shift = exp * 8;

  // 1. frequency
  for (let n of src) {
    const bucket = ((n & mask) >>> shift) & 0xff; // extract byte
    ++count[bucket];
  }

  // 2. prefix sum → start indices
  let total = 0;
  for (let i = 0; i < 256; ++i) {
    const old = count[i];
    count[i] = total;
    total += old;
  }

  // 3. stable scatter
  for (let n of src) {
    const bucket = ((n & mask) >>> shift) & 0xff;
    dst[count[bucket]++] = n;
  }
}

/**
 * In-place radix sort (LSD) for signed 32-bit integers.
 * Time  O(n)   ·  Space  O(n)  ·  Stable
 */
export function radixSort(arr: number[]): number[] {
  if (arr.length < 2) return arr;

  const len = arr.length;
  const tmp = new Array<number>(len);

  // convert signed → unsigned once
  for (let i = 0; i < len; ++i) tmp[i] = arr[i] + 0x8000_0000;

  // 4 passes, 8 bits each
  for (let exp = 0; exp < 4; ++exp) {
    countingSort8(tmp, arr, exp);   // tmp → arr
    [arr, tmp] = [tmp, arr];        // swap buffers
  }

  // convert back unsigned → signed
  for (let i = 0; i < len; ++i) arr[i] = tmp[i] - 0x8000_0000;

  return arr;
}

/* ---------- demo ---------- */
if (require.main === module) {
  const data = [170, 45, -75, 90, 2, 802, -1, 24, 66, -2147483648, 2147483647];
  console.log('original:', data);
  radixSort(data);
  console.log('sorted  :', data);
}
