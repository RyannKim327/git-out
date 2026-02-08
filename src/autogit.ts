const numbers = [3, 42, 7, -1, 20];
const biggest = Math.max(...numbers);

console.log(biggest); // 42
function findMax(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined; // or throw, or use null, whatever fits your API
  return Math.max(...nums);
}
const biggest = numbers.reduce((max, curr) => curr > max ? curr : max, -Infinity);
function findMax(nums: number[]): number | undefined {
  if (nums.length === 0) return undefined;
  return nums.reduce((max, curr) => (curr > max ? curr : max));
}
function findMax<T extends readonly (number | null | undefined)[]>(arr: T): number | undefined {
  const filtered = arr.filter(isFinite) as number[]; // strip out null/undefined if you like
  return filtered.length ? Math.max(...filtered) : undefined;
}
