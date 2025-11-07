function quicksort<T>(array: T[]): T[] {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[0];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quicksort(left), pivot, ...quicksort(right)];
}
function quicksortInPlace<T>(array: T[], left = 0, right = array.length - 1): void {
  if (left >= right) {
    return;
  }

  const pivotIndex = partition(array, left, right);
  
  quicksortInPlace(array, left, pivotIndex - 1);
  quicksortInPlace(array, pivotIndex + 1, right);
}

function partition<T>(array: T[], left: number, right: number): number {
  const pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  [array[i + 1], array[right]] = [array[right], array[i + 1]];
  return i + 1;
}
function quicksortAdvanced<T>(
  array: T[],
  compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[0];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 1; i < array.length; i++) {
    const comparison = compareFn(array[i], pivot);
    if (comparison < 0) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [
    ...quicksortAdvanced(left, compareFn),
    pivot,
    ...quicksortAdvanced(right, compareFn)
  ];
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quicksort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Example 2: Sorting strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(quicksort(strings)); // ["apple", "banana", "cherry", "date"]

// Example 3: Using custom comparator
const objects = [
  { name: "John", age: 25 },
  { name: "Alice", age: 30 },
  { name: "Bob", age: 20 }
];

const sortedByAge = quicksortAdvanced(
  objects,
  (a, b) => a.age - b.age
);
console.log(sortedByAge);
// [{name: "Bob", age: 20}, {name: "John", age: 25}, {name: "Alice", age: 30}]

// Example 4: In-place sorting
const arr = [3, 1, 4, 1, 5, 9, 2, 6];
quicksortInPlace(arr);
console.log(arr); // [1, 1, 2, 3, 4, 5, 6, 9]
// For better performance with large arrays, you can add:
const QUICKSORT_THRESHOLD = 15;

function optimizedQuicksort<T>(array: T[]): T[] {
  if (array.length <= QUICKSORT_THRESHOLD) {
    // Use insertion sort for small arrays
    return insertionSort(array);
  }
  
  // Rest of quicksort implementation...
}

function insertionSort<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = 1; i < result.length; i++) {
    const key = result[i];
    let j = i - 1;
    
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = key;
  }
  return result;
}
