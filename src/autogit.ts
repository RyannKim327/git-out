function maxInArray(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined;   // nothing to compare

  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) max = nums[i];
  }
  return max;
}
function maxInArray(nums: number[]): number | undefined {
  return nums.length ? Math.max(...nums) : undefined;
}
function maxInArray(nums: number[]): number | undefined {
  return nums.reduce<number | undefined>((acc, cur) => {
    return acc === undefined ? cur : cur > acc ? cur : acc;
  }, undefined);
}
type Comparator<T> = (a: T, b: T) => number;

function maxBy<T>(arr: T[], cmp: Comparator<T>): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((max, cur) => (cmp(cur, max) > 0 ? cur : max));
}
const values = [5, 12, 3, 9];
const maxVal = maxBy(values, (a, b) => a - b); // 12

const users = [
  { id: 1, name: 'Alice' },
  { id: 42, name: 'Bob' },
  { id: 7, name: 'Carol' }
];
const top = maxBy(users, (a, b) => a.id - b.id);
// top => { id: 42, name: 'Bob' }
