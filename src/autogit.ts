/**
 * Binary search – recursive.  
 * @param arr        — sorted array
 * @param target     — value to find
 * @param compare    — optional comparison function (a, b) => number
 *                     returns <0 if a<b, 0 if a==b, >0 if a>b
 * @returns index of `target` or -1 if not found
 */
function binarySearchRec<T>(
  arr: T[],
  target: T,
  compare?: (a: T, b: T) => number
): number {
  // Provide a default numeric comparator
  const cmp = compare ?? ((a: any, b: any) => a - b);

  const search = (low: number, high: number): number => {
    if (low > high) return -1;          // base case: not found

    const mid = Math.floor((low + high) / 2);
    const cmpResult = cmp(arr[mid], target);

    if (cmpResult === 0) return mid;    // target is at mid
    if (cmpResult < 0) return search(mid + 1, high); // target is right
    return search(low, mid - 1);        // target is left
  };

  return search(0, arr.length - 1);
}
// Numbers – no comparator needed
const nums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearchRec(nums, 7));  // → 3
console.log(binarySearchRec(nums, 2));  // → -1

// Strings – supply a comparator
const words = ["apple", "banana", "cherry", "date"];
const stringCmp = (a: string, b: string) => a.localeCompare(b);

console.log(binarySearchRec(words, "cherry", stringCmp)); // → 2
console.log(binarySearchRec(words, "fig", stringCmp));    // → -1
