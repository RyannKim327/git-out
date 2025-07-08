function mergeSort(arr: number[]): number[] {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle index
  const mid = Math.floor(arr.length / 2);

  // Divide the array into left and right halves
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  // Merge elements in order
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Concatenate remaining elements (if any)
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage:
const arrayToSort = [34, 7, 23, 32, 5, 62];
const sortedArray = mergeSort(arrayToSort);
console.log(sortedArray); // Output: [5, 7, 23, 32, 34, 62]
