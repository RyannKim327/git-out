/**
 * Merge Sort (ascending order)
 * Time: O(n log n) | Space: O(n)
 */
export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr.slice();          // already sorted

  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

/** Merge two *sorted* arrays into one sorted array */
function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append any leftovers
  return result
    .concat(left.slice(i))
    .concat(right.slice(j));
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('mergeSort', () => {
    it('sorts numbers', () => {
      expect(mergeSort([5, 3, 8, 4, 2])).toEqual([2, 3, 4, 5, 8]);
      expect(mergeSort([])).toEqual([]);
      expect(mergeSort([1])).toEqual([1]);
      expect(mergeSort([3, 3, 3])).toEqual([3, 3, 3]);
    });
  });
}
npx tsx yourFile.ts
