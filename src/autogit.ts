/**
 * Radix sort for 32‑bit signed integers.
 * Works for any array length, including 0.
 *
 * The algorithm:
 *   – Split the input into positives and negatives
 *   – Sort each group with a stable counting‑sort pass for each decimal digit (base 10)
 *   – Negatives are sorted in reverse order of their absolute values
 *   – Concatenate negative‑part (re‑negated) then positive‑part
 */
export function radixSort(nums: number[]): number[] {
  if (nums.length === 0) return nums; // nothing to do

  /* 1️⃣  Separate positives from negatives   */
  const positives: number[] = [];
  const negatives: number[] = [];

  for (const n of nums) {
    if (n >= 0) positives.push(n);
    else negatives.push(Math.abs(n));  // store abs for later sorting
  }

  /* 2️⃣  Sort the “unsigned” parts with an inner helper   */
  const sortedPos = sortUnsigned(positives);
  const sortedNeg = sortUnsigned(negatives);

  /* 3️⃣  Negatives need to be reversed & re‑negated       */
  const finalNeg = sortedNeg.reverse().map(v => -v);

  /* 4️⃣  Merge back together – negative values come first   */
  return [...finalNeg, ...sortedPos];
}

/**
 * Internally sort an array of non‑negative numbers by radix.
 * The routine is the same as the classic radix sort used in
 * CS‑textbooks: a counting sort stable pass for each power of 10.
 */
function sortUnsigned(arr: number[]): number[] {
  if (arr.length === 0) return arr;

  // Find the largest value so we know when to stop
  const maxVal = Math.max(...arr);

  let exponent = 1;   // 10⁰, 10¹, 10² …
  let result = arr;   // we’ll keep re‑assigning

  while (Math.floor(maxVal / exponent) > 0) {
    result = countingSortByExponent(result, exponent);
    exponent *= 10;
  }

  return result;
}

/**
 * One stable counting‑sort pass for a specific digit (exponent).
 * Digits are guaranteed to be 0–9.
 */
function countingSortByExponent(nums: number[], exp: number): number[] {
  const output = new Array(nums.length);
  const count = new Array(10).fill(0);

  // 1️⃣ Count occurrences of each digit
  for (const n of nums) {
    const digit = Math.floor(n / exp) % 10;
    count[digit]++;
  }

  // 2️⃣ Turn counts into cumulative counts
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // 3️⃣ Build output array (backwards for stability)
  for (let i = nums.length - 1; i >= 0; i--) {
    const n = nums[i];
    const digit = Math.floor(n / exp) % 10;
    output[--count[digit]] = n;
  }

  return output;
}
const data = [170, 45, 75, 90, 802, 24, 2, 66, -3, -55];
const sorted = radixSort(data);
console.log(sorted);
// → [ -55, -3, 2, 24, 45, 66, 75, 90, 170, 802 ]
