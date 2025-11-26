const tuple: [string, number, boolean] = ["first", 2, true];
const reversedTuple = [...tuple].reverse(); 
// Type inferred: (string | number | boolean)[]
// Result: [true, 2, "first"]
function reverseArray<T>(arr: T[]): T[] {
  const reversed: T[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

const result = reverseArray([10, 20, 30]); // [30, 20, 10]
