const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();               // numbers is now [5, 4, 3, 2, 1]
const reversed: number[] = numbers.reverse(); // ✅
const original: string[] = ['a', 'b', 'c'];
const reversed = original.slice().reverse(); // ['c', 'b', 'a']
const reversed = [...original].reverse(); // Same result
/**
 * Returns a new array with the elements of `arr` in reverse order.
 * The original array is not mutated.
 */
function reverseArray<T>(arr: readonly T[]): T[] {
  // `readonly T[]` accepts both mutable and readonly arrays.
  // The spread operator creates a shallow copy, then we reverse it.
  return [...arr].reverse();
}

// Usage examples
const nums = [10, 20, 30];
const revNums = reverseArray(nums); // [30, 20, 10]

const readonlyStrs: readonly string[] = ['x', 'y', 'z'];
const revStrs = reverseArray(readonlyStrs); // ['z', 'y', 'x']
function reverseWithReduce<T>(arr: readonly T[]): T[] {
  return arr.reduceRight<T[]>((acc, cur) => {
    acc.push(cur);
    return acc;
  }, []);
}

// Example
const letters = ['a', 'b', 'c'];
const revLetters = reverseWithReduce(letters); // ['c', 'b', 'a']
function reverseManually<T>(arr: readonly T[]): T[] {
  const result: T[] = new Array(arr.length);
  for (let i = 0, j = arr.length - 1; i < arr.length; i++, j--) {
    result[i] = arr[j];
  }
  return result;
}
// Runtime helper (same as before)
function reverseArray<T>(arr: readonly T[]): T[] {
  return [...arr].reverse();
}

// Type‑level reversal (purely compile‑time)
type ReverseTuple<T extends readonly any[]> =
  T extends [infer First, ...infer Rest]
    ? [...ReverseTuple<Rest>, First]
    : [];

// Example
type Original = [1, 2, 3];
type Reversed = ReverseTuple<Original>; // -> [3, 2, 1]

// Using the helper
const tuple: Original = [1, 2, 3] as const;
const reversedTuple = reverseArray(tuple) as Reversed; // type‑checked
// 1️⃣ In‑place (mutates)
arr.reverse();

// 2️⃣ Immutable (copy + reverse)
const rev1 = arr.slice().reverse();
const rev2 = [...arr].reverse();

// 3️⃣ Generic helper (immutable)
function reverseArray<T>(arr: readonly T[]): T[] {
  return [...arr].reverse();
}
const rev3 = reverseArray(arr);

// 4️⃣ Functional reduceRight (immutable)
function reverseWithReduce<T>(arr: readonly T[]): T[] {
  return arr.reduceRight<T[]>((acc, cur) => (acc.push(cur), acc), []);
}

// 5️⃣ Manual loop (immutable)
function reverseManually<T>(arr: readonly T[]): T[] {
  const out = new Array<T>(arr.length);
  for (let i = 0, j = arr.length - 1; i < arr.length; i++, j--) {
    out[i] = arr[j];
  }
  return out;
}
