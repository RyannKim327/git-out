function kthSmallestSort<T>(
  arr: T[],
  k: number,
  compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T | undefined {
  if (k < 1 || k > arr.length) return undefined;
  const sorted = [...arr].sort(compareFn);
  return sorted[k - 1];
}

// Example usage:
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(kthSmallestSort(numbers, 3)); // 2 (3rd smallest element)
function kthSmallestQuickSelect<T>(
  arr: T[],
  k: number,
  compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T | undefined {
  if (k < 1 || k > arr.length) return undefined;
  const array = [...arr]; // Clone to avoid mutating original

  const partition = (left: number, right: number): number => {
    // Random pivot selection
    const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    const pivotValue = array[pivotIndex];
    [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];

    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (compareFn(array[i], pivotValue) <= 0) {
        [array[i], array[storeIndex]] = [array[storeIndex], array[i]];
        storeIndex++;
      }
    }
    [array[storeIndex], array[right]] = [array[right], array[storeIndex]];
    return storeIndex;
  };

  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const pivotIndex = partition(left, right);
    if (pivotIndex === k - 1) {
      return array[pivotIndex];
    } else if (pivotIndex < k - 1) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }
  return undefined; // Fallback (unreachable if k is valid)
}

// Example usage:
console.log(kthSmallestQuickSelect(numbers, 4)); // 3 (4th smallest element)
