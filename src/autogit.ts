// 1️⃣  Define a comparison helper – most of the time you’ll just pass
//     (a, b) => a < b for ascending order.
type Comparator<T> = (a: T, b: T) => boolean;

// 2️⃣  The merge function – it expects two sorted arrays and pulls
//     the smaller (according to the comparator) element out first.
function merge<T>(left: T[], right: T[], cmp: Comparator<T>): T[] {
  const result: T[] = [];
  let i = 0,
      j = 0;

  while (i < left.length && j < right.length) {
    if (cmp(left[i], right[j])) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // One side still has items – splice the rest onto the result.
  if (i < left.length) result.push(...left.slice(i));
  if (j < right.length) result.push(...right.slice(j));

  return result;
}

// 3️⃣  The recursive mergeSort main function – sorts in place if you
//     prefer not to allocate the full array during every merge.
export function mergeSort<T>(arr: T[], cmp: Comparator<T> = (a, b) => a < b): T[] {
  if (arr.length <= 1) return arr;     // Base case: nothing to do

  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid), cmp);
  const right = mergeSort(arr.slice(mid),    cmp);

  return merge(left, right, cmp);
}
// Numbers, ascending
const sortedNumbers = mergeSort([8, 3, 5, 1, 9, 2]);

// Strings, descending
const sortedStrings = mergeSort(
  ["banana", "apple", "cherry"],
  (a, b) => a > b
);

console.log(sortedNumbers); // [1, 2, 3, 5, 8, 9]
console.log(sortedStrings); // ["cherry", "banana", "apple"]
