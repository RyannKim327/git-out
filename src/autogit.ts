/**
 * Interpolation search.
 * @param arr    Sorted array of numbers (or objects).
 * @param key    Value to search for.
 * @param map    Optional projector: (element) => number. Default = identity.
 * @returns Index of key or -1 if not found.
 */
export function interpolationSearch<T>(
  arr: T[],
  key: number,
  map: (t: T) => number = (x: any) => x
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && key >= map(arr[low]) && key <= map(arr[high])) {
    // Range is flat → fall back to linear scan
    if (map(arr[high]) === map(arr[low])) {
      return map(arr[low]) === key ? low : -1;
    }

    // Estimate position
    const pos =
      low +
      Math.floor(
        ((key - map(arr[low])) * (high - low)) /
          (map(arr[high]) - map(arr[low]))
      );

    if (pos < low || pos > high) return -1; // safeguard

    const value = map(arr[pos]);

    if (value === key) return pos;
    if (value < key) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}

/* ---------- Usage examples ---------- */

// 1. Simple numeric array
const nums = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
console.log(interpolationSearch(nums, 12)); // → 5
console.log(interpolationSearch(nums, 3));  // → -1

// 2. Array of objects
interface Product {
  id: number;
  name: string;
}
const prods: Product[] = [
  { id: 10, name: "A" },
  { id: 20, name: "B" },
  { id: 30, name: "C" },
];
console.log(interpolationSearch(prods, 20, p => p.id)); // → 1
