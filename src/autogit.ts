const array: number[] = [1, 2, 3, 4];
array.reverse();
console.log(array); // Output: [4, 3, 2, 1]
const original: string[] = ["a", "b", "c"];
const reversed = [...original].reverse(); // Shallow copy + reverse

console.log(original); // ["a", "b", "c"]
console.log(reversed); // ["c", "b", "a"]
function reverseArray<T>(arr: T[]): T[] {
  const result: T[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}
