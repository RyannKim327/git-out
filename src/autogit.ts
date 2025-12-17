const nums: number[] = [3, 5, 3, 7, 5, 3, 9];

const unique = [...new Set(nums)];   // [3, 5, 7, 9]
function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

const strings = ["a", "b", "a", "c"];
console.log(unique(strings)); // ["a", "b", "c"]
