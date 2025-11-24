const originalArray: number[] = [1, 2, 3, 4, 5];
originalArray.reverse();
console.log(originalArray); // Output: [5, 4, 3, 2, 1]
const originalArray: string[] = ["a", "b", "c"];
const reversedCopy: string[] = [...originalArray].reverse();

console.log(originalArray); // ["a", "b", "c"]
console.log(reversedCopy); // ["c", "b", "a"]
// With union types
const mixedTypeArray: (string | number)[] = [1, "two", 3];
const reversedMixed = [...mixedTypeArray].reverse();
// Result: [3, "two", 1] → Type remains (string | number)[]
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

// Usage:
const reversedNumbers = reverseArray([10, 20, 30]); // [30, 20, 10]
const reversedStrings = reverseArray(["hello", "world"]); // ["world", "hello"]
