const numbers = [1, 2, 3, 4];
numbers.reverse();          // → [4, 3, 2, 1]
console.log(numbers);       // the same array has changed
const numbers = [1, 2, 3, 4];
const reversed = numbers.slice().reverse(); // or [...numbers].reverse()

console.log(numbers);   // → [1, 2, 3, 4]
console.log(reversed);  // → [4, 3, 2, 1]
function reverseArray<T>(arr: T[]): T[] {
  const out = new Array<T>(arr.length);
  for (let i = 0, j = arr.length - 1; i <= j; ++i, --j) {
    out[i] = arr[j];
    out[j] = arr[i];
  }
  return out;
}
const rev = reverseArray([10, 20, 30]); // → [30, 20, 10]
