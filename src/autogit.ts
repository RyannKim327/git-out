function secondLargest(nums: number[]): number | undefined {
  if (nums.length < 2) return undefined; // no second element

  let largest = -Infinity;
  let second = -Infinity;

  for (const n of nums) {
    if (n > largest) {
      second = largest;
      largest = n;
    } else if (n > second && n !== largest) {
      second = n;
    }
  }

  return second === -Infinity ? undefined : second;
}
function secondLargest(nums: number[]): number | undefined {
  const unique = Array.from(new Set(nums));     // remove duplicates
  if (unique.length < 2) return undefined;      // no second element

  unique.sort((a, b) => b - a);                // descending order
  return unique[1];
}
function secondLargest(nums: number[]): number | undefined {
  if (nums.length < 2) return undefined;

  const max = Math.max(...nums);
  const second = Math.max(...nums.filter(x => x !== max));
  return second === -Infinity ? undefined : second;
}
const arr = [5, 1, 8, 7, 8, 3];

console.log(secondLargest(arr)); // 7
