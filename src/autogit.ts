function quicksort<T>(array: T[]): T[] {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[Math.floor(array.length / 2)];
  const left: T[] = [];
  const right: T[] = [];
  const equal: T[] = [];

  for (const element of array) {
    if (element < pivot) {
      left.push(element);
    } else if (element > pivot) {
      right.push(element);
    } else {
      equal.push(element);
    }
  }

  return [...quicksort(left), ...equal, ...quicksort(right)];
}
function quicksortInPlace<T>(array: T[], left: number = 0, right: number = array.length - 1): T[] {
  if (left >= right) {
    return array;
  }

  const pivotIndex = partition(array, left, right);
  quicksortInPlace(array, left, pivotIndex - 1);
  quicksortInPlace(array, pivotIndex + 1, right);
  
  return array;
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
function quicksortGeneric<T>(
  array: T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (array.length <= 1) {
    return array;
  }

  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];
  
  const left: T[] = [];
  const right: T[] = [];
  const equal: T[] = [];

  for (const item of array) {
    const comparison = compareFn(item, pivot);
    if (comparison < 0) {
      left.push(item);
    } else if (comparison > 0) {
      right.push(item);
    } else {
      equal.push(item);
    }
  }

  return [
    ...quicksortGeneric(left, compareFn),
    ...equal,
    ...quicksortGeneric(right, compareFn)
  ];
}
function optimizedQuicksort<T>(array: T[], left: number = 0, right: number = array.length - 1): T[] {
  if (left < right) {
    const pivotIndex = optimizedPartition(array, left, right);
    optimizedQuicksort(array, left, pivotIndex - 1);
    optimizedQuicksort(array, pivotIndex + 1, right);
  }
  return array;
}

function optimizedPartition<T>(array: T[], left: number, right: number): number {
  // Median-of-three pivot selection
  const mid = Math.floor((left + right) / 2);
  const pivot = medianOfThree(array[left], array[mid], array[right]);
  
  // Move pivot to the end
  let pivotIndex = left;
  if (array[left] === pivot) {
    pivotIndex = left;
  } else if (array[mid] === pivot) {
    [array[mid], array[right]] = [array[right], array[mid]];
    pivotIndex = mid;
  } else {
    pivotIndex = right;
  }
  
  [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];
  
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

function medianOfThree<T>(a: T, b: T, c: T): T {
  if ((a <= b && b <= c) || (c <= b && b <= a)) return b;
  if ((b <= a && a <= c) || (c <= a && a <= b)) return a;
  return c;
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quicksort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// String sorting
const strings = ["banana", "apple", "cherry", "date"];
console.log(quicksort(strings)); // ["apple", "banana", "cherry", "date"]

// With custom comparator
const objects = [
  { name: "John", age: 25 },
  { name: "Alice", age: 30 },
  { name: "Bob", age: 20 }
];

const sortedByAge = quicksortGeneric(objects, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name: "Bob", age: 20}, {name: "John", age: 25}, {name: "Alice", age: 30}]

// In-place sorting
const arr = [3, 6, 8, 10, 1, 2, 1];
quicksortInPlace(arr);
console.log(arr); // [1, 1, 2, 3, 6, 8, 10]
