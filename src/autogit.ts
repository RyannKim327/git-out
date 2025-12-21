/**
 * Returns the majority element of `arr` if it exists, otherwise `null`.
 *
 * A majority element is an element that appears strictly more than floor(n/2) times.
 *
 * @param arr - The input array (any type that can be compared with `===`).
 * @returns The majority element or `null` if none exists.
 */
export function majorityElement<T>(arr: readonly T[]): T | null {
  if (arr.length === 0) return null;

  // ---------- 1️⃣ First pass: find a candidate ----------
  let candidate: T | undefined = undefined;
  let count = 0;

  for (const value of arr) {
    if (count === 0) {
      candidate = value;
      count = 1;
    } else if (candidate === value) {
      count++;
    } else {
      count--;
    }
  }

  // If the array was empty, candidate stays undefined.
  if (candidate === undefined) return null;

  // ---------- 2️⃣ Second pass: verify ----------
  let occurrences = 0;
  for (const value of arr) {
    if (value === candidate) occurrences++;
  }

  return occurrences > Math.floor(arr.length / 2) ? candidate : null;
}
import { majorityElement } from "./majority";

const nums = [2, 2, 1, 1, 2, 2, 5];
const result = majorityElement(nums);
console.log(result); // → 2

const noMajority = [1, 2, 3, 4];
console.log(majorityElement(noMajority)); // → null
export function majorityElementMap<T>(arr: readonly T[]): T | null {
  const freq = new Map<T, number>();
  const threshold = Math.floor(arr.length / 2) + 1; // > n/2

  for (const v of arr) {
    const newCount = (freq.get(v) ?? 0) + 1;
    if (newCount >= threshold) return v; // early exit
    freq.set(v, newCount);
  }

  return null;
}
export function majorityElementBy<T, K>(
  arr: readonly T[],
  keyFn: (item: T) => K
): T | null {
  if (arr.length === 0) return null;

  // First pass – candidate based on key
  let candidateKey: K | undefined;
  let count = 0;
  for (const item of arr) {
    const k = keyFn(item);
    if (count === 0) {
      candidateKey = k;
      count = 1;
    } else if (candidateKey === k) {
      count++;
    } else {
      count--;
    }
  }

  if (candidateKey === undefined) return null;

  // Second pass – verify and return the *original* element
  let occurrences = 0;
  let candidateItem: T | undefined;
  for (const item of arr) {
    if (keyFn(item) === candidateKey) {
      occurrences++;
      candidateItem ??= item; // keep the first matching item
    }
  }

  return occurrences > Math.floor(arr.length / 2) ? candidateItem! : null;
}
// majority.test.ts
import { majorityElement } from "./majority";

describe("majorityElement", () => {
  test("basic majority", () => {
    expect(majorityElement([1, 1, 2, 1, 3, 1, 1])).toBe(1);
  });

  test("no majority", () => {
    expect(majorityElement([1, 2, 3, 4])).toBeNull();
  });

  test("single element", () => {
    expect(majorityElement([42])).toBe(42);
  });

  test("empty array", () => {
    expect(majorityElement([])).toBeNull();
  });

  test("objects with custom key", () => {
    const data = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 1, name: "c" },
      { id: 1, name: "d" },
    ];
    const result = majorityElementBy(data, (x) => x.id);
    expect(result?.id).toBe(1);
  });
});
npm test   # assuming jest is set up
function majority<T>(arr: readonly T[]): T | null {
  let cand: T | undefined, cnt = 0;
  for (const v of arr) cnt === 0 ? (cand = v, cnt = 1) : (v === cand ? cnt++ : cnt--);
  return (cand !== undefined && arr.filter(x => x === cand).length > arr.length / 2) ? cand : null;
}
