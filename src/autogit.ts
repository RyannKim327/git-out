/**
 * Counting sort for non-negative integers.
 * @param data  ArrayLike<number> (Array, typed array, NodeList, …)
 * @param min   Optional smallest value (inferred if omitted)
 * @param max   Optional largest  value (inferred if omitted)
 * @returns     New sorted array of the same runtime type as `data`
 */
export function countingSort<T extends ArrayLike<number>>(
  data: T,
  min?: number,
  max?: number
): T {
  const len = data.length;
  if (len === 0) return data.slice(0) as T;

  // 1. Discover range if not supplied
  if (min === undefined || max === undefined) {
    let lo = data[0]!;
    let hi = lo;
    for (let i = 1; i < len; ++i) {
      const v = data[i]!;
      lo = v < lo ? v : lo;
      hi = v > hi ? v : hi;
    }
    min = lo;
    max = hi;
  }
  if (min < 0) throw new RangeError("Counting sort requires non-negative keys");

  // 2. Allocate counters
  const range = max - min + 1;
  const count = new Uint32Array(range);

  // 3. Frequency count
  for (let i = 0; i < len; ++i) ++count[data[i]! - min];

  // 4. Prefix sum (count[i] will store the *end* index of value i)
  for (let i = 1; i < range; ++i) count[i] += count[i - 1];

  // 5. Stable write into output
  const out = new (data.constructor as ArrayConstructor)(len) as T;
  for (let i = len - 1; i >= 0; --i) {
    const v = data[i]!;
    const pos = --count[v - min];
    (out as any)[pos] = v;
  }
  return out;
}

/* ---------- usage example ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("sorts 0-99 backwards", () => {
    const data = Uint8Array.from({ length: 100 }, (_, i) => 99 - i);
    const sorted = countingSort(data);
    expect(Array.from(sorted)).toEqual(Array.from({ length: 100 }, (_, i) => i));
  });
}
