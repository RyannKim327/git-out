function quicksort<T>(array: T[]): T[] {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[array.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quicksort(left), pivot, ...quicksort(right)];
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sortedNumbers = quicksort(numbers);
console.log(sortedNumbers); // [1, 1, 2, 3, 6, 8, 10]
function quicksortInPlace<T>(array: T[], left = 0, right = array.length - 1): T[] {
  if (left < right) {
    const pivotIndex = partition(array, left, right);
    quicksortInPlace(array, left, pivotIndex - 1);
    quicksortInPlace(array, pivotIndex + 1, right);
  }
  return array;
}

function partition<T>(array: T[], left: number, right: number): number {
  const pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(array, i, j);
    }
  }

  swap(array, i + 1, right);
  return i + 1;
}

function swap<T>(array: T[], i: number, j: number): void {
  [array[i], array[j]] = [array[j], array[i]];
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
quicksortInPlace(numbers);
console.log(numbers); // [1, 1, 2, 3, 6, 8, 10]
function quicksort<T>(
  array: T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (array.length <= 1) return array;

  const pivot = array[array.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    const comparison = compareFn(array[i], pivot);
    if (comparison < 0) {
      left.push(array[i]);
    } else if (comparison >= 0) {
      right.push(array[i]);
    }
  }

  return [
    ...quicksort(left, compareFn),
    pivot,
    ...quicksort(right, compareFn)
  ];
}

// Usage examples
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sortedNumbers = quicksort(numbers);

const strings = ['banana', 'apple', 'cherry'];
const sortedStrings = quicksort(strings);

// Custom comparator for descending order
const descendingNumbers = quicksort(numbers, (a, b) => b - a);
console.log(descendingNumbers); // [10, 8, 6, 3, 2, 1, 1]
function optimizedQuicksort<T>(array: T[]): T[] {
  if (array.length <= 1) return array;

  // Choose pivot using median-of-three for better performance
  const mid = Math.floor(array.length / 2);
  const first = array[0];
  const middle = array[mid];
  const last = array[array.length - 1];

  let pivotIndex = 0;
  if ((first <= middle && middle <= last) || (last <= middle && middle <= first)) {
    pivotIndex = mid;
  } else if ((middle <= first && first <= last) || (last <= first && first <= middle)) {
    pivotIndex = 0;
  } else {
    pivotIndex = array.length - 1;
  }

  const pivot = array[pivotIndex];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) continue;
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...optimizedQuicksort(left), pivot, ...optimizedQuicksort(right)];
}
