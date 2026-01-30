function secondLargest(nums: number[]): number | null {
  if (nums.length < 2) {            // not enough numbers
    return null;                    // or throw an error, or whatever feels right
  }

  let largest = Number.NEGATIVE_INFINITY;
  let second  = Number.NEGATIVE_INFINITY;

  for (const n of nums) {
    if (n > largest) {
      second = largest;   // old largest becomes second
      largest = n;
    } else if (n > second && n < largest) {   // distinct from largest
      second = n;
    }
  }

  // After the loop, `second` holds the second largest *distinct* value
  return second === Number.NEGATIVE_INFINITY ? null : second;
}
else if (n > second) {   // allow n == largest to fill second slot
  second = n;
}
function secondLargestSorted(nums: number[]): number | null {
  if (nums.length < 2) return null;
  const sorted = [...nums].sort((a, b) => b - a); // descending
  // handle duplicates if you want distinct values
  return sorted[1];
}
function secondLargest(nums: number[]): number | null {
  if (nums.length < 2) return null;

  let largest = Number.NEGATIVE_INFINITY;
  let second  = Number.NEGATIVE_INFINITY;

  for (const n of nums) {
    if (n > largest) {
      second = largest;
      largest = n;
    } else if (n > second && n < largest) {
      second = n;
    }
  }
  return second === Number.NEGATIVE_INFINITY ? null : second;
}
