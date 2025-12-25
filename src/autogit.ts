/**
 * Returns the second largest *distinct* number in the array,
 * or undefined if it does not exist.
 */
function secondLargestDistinct(nums: number[]): number | undefined {
  if (nums.length < 2) return undefined;

  let max = -Infinity;
  let second = -Infinity;

  for (const n of nums) {
    if (n > max) {
      second = max;   // old max becomes second
      max = n;
    } else if (n < max && n > second) {
      // n is smaller than max but larger than current second
      second = n;
    }
  }

  return second === -Infinity ? undefined : second;
}

/* ---- usage ---- */
console.log(secondLargestDistinct([5, 2, 9, 1])); // 5
console.log(secondLargestDistinct([3, 3, 3]));    // undefined
console.log(secondLargestDistinct([7, 7, 5]));    // 5
function secondLargestAllowDup(nums: number[]): number | undefined {
  if (nums.length < 2) return undefined;

  let max = -Infinity;
  let second = -Infinity;

  for (const n of nums) {
    if (n > max) {
      second = max;
      max = n;
    } else if (n > second) {
      // n is <= max, but still larger than current second
      second = n;
    }
  }

  return second === -Infinity ? undefined : second;
}

/* ---- usage ---- */
console.log(secondLargestAllowDup([5, 2, 9, 1])); // 5
console.log(secondLargestAllowDup([3, 3, 3]));    // 3 (the second 3)
console.log(secondLargestAllowDup([7, 7, 5]));    // 7 (the second 7)
/**
 * Returns the second largest distinct element, or undefined.
 * Uses sorting, so it is O(n log n).
 */
function secondLargestBySorting(nums: number[]): number | undefined {
  if (nums.length < 2) return undefined;

  // Clone to avoid mutating the caller's array
  const sorted = [...new Set(nums)].sort((a, b) => b - a); // descending, unique

  return sorted[1]; // undefined if there is no second element
}

/* ---- usage ---- */
console.log(secondLargestBySorting([5, 2, 9, 1])); // 5
console.log(secondLargestBySorting([3, 3, 3]));    // undefined
function secondLargestFunctional(nums: number[]): number | undefined {
  if (nums.length < 2) return undefined;

  const max = Math.max(...nums);
  const withoutMax = nums.filter(v => v !== max); // drop all max values
  return withoutMax.length ? Math.max(...withoutMax) : undefined;
}

/* ---- usage ---- */
console.log(secondLargestFunctional([5, 2, 9, 1])); // 5
function secondLargestSafe(nums: unknown[]): number | undefined {
  const numbers = nums.filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  return secondLargestDistinct(numbers);
}
// utils/arrayMath.ts
export function secondLargest<T extends number>(arr: T[]): T | undefined {
  if (arr.length < 2) return undefined;

  let max = -Infinity as T;
  let second = -Infinity as T;

  for (const v of arr) {
    if (v > max) {
      second = max;
      max = v;
    } else if (v < max && v > second) {
      second = v;
    }
  }

  return second === -Infinity ? undefined : second;
}

/**
 * Variant that treats duplicates as separate entries.
 */
export function secondLargestAllowDup<T extends number>(arr: T[]): T | undefined {
  if (arr.length < 2) return undefined;

  let max = -Infinity as T;
  let second = -Infinity as T;

  for (const v of arr) {
    if (v > max) {
      second = max;
      max = v;
    } else if (v > second) {
      second = v;
    }
  }

  return second === -Infinity ? undefined : second;
}
import { secondLargest, secondLargestAllowDup } from './utils/arrayMath';

console.log(secondLargest([10, 20, 30]));          // 20
console.log(secondLargestAllowDup([10, 30, 30])); // 30
