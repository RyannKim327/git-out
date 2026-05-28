/**
 * Return the intersection of two arrays.
 * @param a  First array
 * @param b  Second array
 * @returns  An array containing every element that appears in **both** `a` and `b`
 *
 * The function is generic so it keeps the element type while still being type‑safe.
 * For primitive values a direct equality check (`===`) is sufficient.
 */
export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
  // Build a set from the larger array – that keeps lookup O(1).
  // (You could skip the `max` decision; it's just a micro‑optimization.)
  const [large, small] = a.length > b.length ? [a, b] : [b, a];
  const set = new Set(large);

  // Pick elements of the smaller array that exist in the set.
  return small.filter((x) => set.has(x));
}
const xs = [1, 2, 3, 4];
const ys = [3, 4, 5, 6];

console.log(intersection(xs, ys)); // → [3, 4]
import { intersection } from 'lodash'; // or lodash/fp if you prefer FP style

console.log(intersection(xs, ys)); // → [3, 4]
interface Person {
  id: number;
  name: string;
}

const a: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob'   },
  { id: 3, name: 'Carol' },
];

const b: Person[] = [
  { id: 2, name: 'Bob'   },
  { id: 3, name: 'Carol' },
  { id: 4, name: 'Dan'   },
];

const key = (p: Person) => p.id;

function intersectionBy<T, K extends string | number | symbol>(
  a: readonly T[],
  b: readonly T[],
  getKey: (item: T) => K
): T[] {
  const map = new Map<K, T>();
  for (const item of a) {
    map.set(getKey(item), item);
  }
  const result: T[] = [];
  for (const item of b) {
    const key = getKey(item);
    if (map.has(key)) {
      result.push(item);
    }
  }
  return result;
}

console.log(intersectionBy(a, b, key));
// → [{ id: 2, name: 'Bob' }, { id: 3, name: 'Carol' }]
