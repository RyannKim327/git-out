type Result = {
  maxSum: number;
  start: number;
  end: number;
  subarray: number[];
};

function maxSubarray(nums: number[]): Result {
  if (nums.length === 0) {
    return { maxSum: 0, start: -1, end: -1, subarray: [] };
  }

  let maxEndingHere = nums[0];
  let maxSoFar = nums[0];
  let start = 0;
  let end = 0;
  let s = 0;

  for (let i = 1; i < nums.length; i++) {
    if (maxEndingHere < 0) {
      maxEndingHere = nums[i];
      s = i;
    } else {
      maxEndingHere += nums[i];
    }

    if (maxEndingHere > maxSoFar) {
      maxSoFar = maxEndingHere;
      start = s;
      end = i;
    }
  }

  return { maxSum: maxSoFar, start, end, subarray: nums.slice(start, end + 1) };
}
const a = [−2, 1, 3, −2, 5, −1];
const res = maxSubarray(a);
console.log(res.maxSum);   // 7
console.log(res.start);    // 1
console.log(res.end);      // 4
console.log(res.subarray); // [1, 3, −2, 5]
