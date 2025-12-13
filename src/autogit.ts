const numbers: number[] = [1, 2, 3, 4, 5];
numbers.reverse();               // mutates `numbers`
console.log(numbers); // → [5, 4, 3, 2, 1]
const numbers: number[] = [1, 2, 3, 4, 5];
const reversed = [...numbers].reverse(); // or numbers.slice().reverse()
console.log(numbers);  // → [1, 2, 3, 4, 5] (unchanged)
console.log(reversed); // → [5, 4, 3, 2, 1]
function reverseArray<T>(arr: readonly T[]): T[] {
  const result = new Array<T>(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[arr.length - 1 - i];
  }
  return result;
}

// Usage
const letters = ['a', 'b', 'c'] as const; // readonly tuple
const rev = reverseArray(letters);
console.log(rev); // → ['c', 'b', 'a']
// 4.1 Type‑level helper (TS 4.1+)
type ReverseTuple<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? [...ReverseTuple<Rest>, First]
    : [];

// 4.2 Runtime implementation
function reverseTuple<T extends any[]>(tuple: T): ReverseTuple<T> {
  // cast is safe because we build the array element‑by‑element
  return [...tuple].reverse() as ReverseTuple<T>;
}

// Example
const tup = [1, 'a', true] as const;
const revTup = reverseTuple(tup);
// revTup is inferred as [true, 'a', 1]
function reverseInPlace<T>(arr: T[]): void {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const tmp = arr[left];
    arr[left] = arr[right];
    arr[right] = tmp;
    left++;
    right--;
  }
}

// Example
const big = new Array(1_000_000).fill(0).map((_, i) => i);
reverseInPlace(big); // mutates `big` without extra memory
// Immutable (most common safe pattern)
const reversed = [...myArray].reverse();   // or: const reversed = myArray.slice().reverse();
myArray.reverse(); // mutates in place
