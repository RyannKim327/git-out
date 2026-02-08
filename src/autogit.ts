function secondLargestSort(arr: number[]): number | null {
  // Defensive copy so we don’t mutate the caller’s data
  const sorted = [...arr].sort((a, b) => b - a); // descending

  // Find the first element that isn’t equal to the maximum
  let i = 1;
  while (i < sorted.length && sorted[i] === sorted[0]) {
    i++;
  }

  return i < sorted.length ? sorted[i] : null;
}
console.log(secondLargestSort([3, 1, 4, 4, 5])); // 4
console.log(secondLargestSort([10]));            // null
function secondLargestTwoPass(arr: number[]): number | null {
  if (arr.length < 2) return null;

  let max = -Infinity;
  let secondMax = -Infinity;

  // First pass: find the maximum
  for (const v of arr) {
    if (v > max) max = v;
  }

  // Second pass: find the largest value that is < max
  for (const v of arr) {
    if (v < max && v > secondMax) secondMax = v;
  }

  return secondMax === -Infinity ? null : secondMax;
}
console.log(secondLargestTwoPass([7, 3, 9, 1, 9])); // 7
function secondLargest(arr: number[]): number | null {
  if (arr.length < 2) return null;

  let max = -Infinity;
  let secondMax = -Infinity;

  for (const v of arr) {
    if (v > max) {
      secondMax = max; // the old max becomes second max
      max = v;
    } else if (v < max && v > secondMax) {
      secondMax = v;
    }
  }

  return secondMax === -Infinity ? null : secondMax;
}
console.log(secondLargest([5, 12, 7, 12, 9]));   // 9
console.log(secondLargest([3]));                // null
console.log(secondLargest([2, 2, 2]));          // null (no distinct second largest)
function findSecondLargest(arr: number[]): number | null {
  // Pick whichever implementation feels best
  return secondLargest(arr);
}
