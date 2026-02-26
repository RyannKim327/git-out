/**
 * Find the majority element in an array.
 *
 * @param arr - An array of comparable items.
 * @returns The majority element, or undefined if no majority exists.
 *
 * Assumes `T` supports strict equality (===).
 */
function majorityElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;

  // 1️⃣ First pass: find a potential candidate
  let candidate: T | undefined = arr[0];
  let count = 0;

  for (const value of arr) {
    if (count === 0) {
      candidate = value;
      count = 1;
    } else {
      count += (value === candidate) ? 1 : -1;
    }
  }

  // 2️⃣ Optional second pass (remove if you know the input always contains a majority)
  if (candidate !== undefined) {
    const actual = arr.filter(v => v === candidate).length;
    if (actual > arr.length / 2) {
      return candidate;
    }
  }

  return undefined; // No majority element
}
const nums = [2, 2, 1, 1, 2, 2, 2];

const major = majorityElement(nums); // -> 2
console.log(major); // 2
