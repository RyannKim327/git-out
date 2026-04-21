const numbers: number[] = [12, 4, 56, 3, 9];

// The default sort is string comparison → "12" < "56" < ...!
const sorted = numbers.slice().sort((a, b) => a - b);

console.log(sorted); // [3, 4, 9, 12, 56]
function sortNums(arr: number[]): number[] {
  return arr.slice().sort((a, b) => a - b);
}

const unsorted = [27, 13, 42, 8];
console.log(sortNums(unsorted)); // [8, 13, 27, 42]
function sortBy<T>(arr: T[], cmpFn: (a: T, b: T) => number): T[] {
  return arr.slice().sort(cmpFn);
}
function sortNumbersASC(nums: number[]): number[] {
  return nums.slice().sort((a, b) => a - b);
}
