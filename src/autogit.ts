const numbers = [1, 2, 3, 4];
const reversed = [...numbers].reverse();   // → [4,3,2,1]
function reverseArray<T>(arr: readonly T[]): T[] {
  // `readonly T[]` lets you pass both mutable and immutable arrays.
  // The spread operator creates a shallow copy, then we reverse it.
  return [...arr].reverse();
}

// Usage
const letters = ['a', 'b', 'c'];
const revLetters = reverseArray(letters); // ['c','b','a']
function reverseInPlace<T>(arr: T[]): void {
  arr.reverse(); // mutates `arr`
}

// Usage
const nums = [10, 20, 30];
reverseInPlace(nums);
console.log(nums); // [30,20,10]
function reversePure<T>(arr: readonly T[]): T[] {
  return arr.reduce<T[]>((acc, cur) => [cur, ...acc], []);
}

// Or with a classic for‑loop
function reverseLoop<T>(arr: readonly T[]): T[] {
  const result: T[] = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[arr.length - 1 - i];
  }
  return result;
}
// Immutable (recommended)
const reversed = [...myArray].reverse();   // or myArray.slice().reverse()

// Mutable
myArray.reverse(); // changes myArray itself

// Generic helper (immutable)
function reverse<T>(arr: readonly T[]): T[] {
  return arr.slice().reverse(); // slice is a bit faster than spread for huge arrays
}
