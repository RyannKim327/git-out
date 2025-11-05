/**
 * Interpolation search for primitive arrays.
 * @param arr Sorted array of numbers (or values convertible to numbers).
 * @param key Value to locate.
 * @returns Index of key or -1 if not found.
 */
export function interpolationSearch<T extends number | bigint>(
  arr: readonly T[],
  key: T
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && key >= arr[low] && key <= arr[high]) {
    // Handle tiny slices with a simple linear scan to avoid division by zero
    if (arr[low] === arr[high]) {
      if (arr[low] === key) return low;
      break;
    }

    // Estimate position by linear interpolation
    const pos = low + Math.floor(
      ((Number(key) - Number(arr[low])) * (high - low)) /
      (Number(arr[high]) - Number(arr[low]))
    );

    // Bounds check (paranoid but safe)
    if (pos < low || pos > high) break;

    const value = arr[pos];

    if (value === key) return pos;
    if (value < key) low = pos + 1;
    else high = pos - 1;
  }

  return -1;
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('finds items in uniform arrays', () => {
    const a = Array.from({ length: 1_000_000 }, (_, i) => i);
    expect(interpolationSearch(a, 7)).toBe(7);
    expect(interpolationSearch(a, 1_000_000)).toBe(-1);
  });

  it('handles duplicates', () => {
    const a = [1, 2, 2, 2, 3, 4, 5];
    const idx = interpolationSearch(a, 2);
    expect(idx).toBeGreaterThanOrEqual(1);
    expect(idx).toBeLessThanOrEqual(3);
  });

  it('handles non-uniform data (degrades gracefully)', () => {
    const a = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1_000_000];
    expect(interpolationSearch(a, 1_000_000)).toBe(9);
  });
}
const data: number[] = [];
for (let i = 0; i < 1e6; i++) data.push(i * 2);   // even numbers only

const index = interpolationSearch(data, 123456);
console.log(index); // 61728
export function interpolationSearchBy<T, K extends number | bigint>(
  arr: readonly T[],
  key: K,
  valueOf: (item: T) => K
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && key >= valueOf(arr[low]) && key <= valueOf(arr[high])) {
    const lowVal = valueOf(arr[low]);
    const highVal = valueOf(arr[high]);

    if (lowVal === highVal) {
      if (lowVal === key) return low;
      break;
    }

    const pos = low + Math.floor(
      ((Number(key) - Number(lowVal)) * (high - low)) /
      (Number(highVal) - Number(lowVal))
    );

    if (pos < low || pos > high) break;

    const midVal = valueOf(arr[pos]);
    if (midVal === key) return pos;
    if (midVal < key) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}

/* example */
interface User { id: number; name: string }
const users: User[] = generateSortedUsers(); // sorted by id
const idx = interpolationSearchBy(users, 42_123, u => u.id);
