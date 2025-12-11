function mergeSort<T>(array: T[]): T[] {
  // Base case: arrays with 0 or 1 element are already sorted
  if (array.length <= 1) {
    return array;
  }

  // Find the middle point to divide the array into two halves
  const middle = Math.floor(array.length / 2);
  
  // Split the array into left and right halves
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  // Recursively sort both halves and merge them
  return merge(mergeSort(left), mergeSort(right));
}

function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from left and right arrays and add smaller one to result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from left array (if any)
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from right array (if any)
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}
function mergeSortWithComparator<T>(
  array: T[], 
  comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return mergeWithComparator(
    mergeSortWithComparator(left, comparator),
    mergeSortWithComparator(right, comparator),
    comparator
  );
}

function mergeWithComparator<T>(left: T[], right: T[], comparator: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (comparator(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
function mergeSortInPlace<T>(
  array: T[], 
  comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): void {
  mergeSortHelper(array, 0, array.length - 1, comparator);
}

function mergeSortHelper<T>(
  array: T[], 
  start: number, 
  end: number, 
  comparator: (a: T, b: T) => number
): void {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);
  
  // Recursively sort left and right halves
  mergeSortHelper(array, start, mid, comparator);
  mergeSortHelper(array, mid + 1, end, comparator);
  
  // Merge the sorted halves
  mergeInPlace(array, start, mid, end, comparator);
}

function mergeInPlace<T>(
  array: T[], 
  start: number, 
  mid: number, 
  end: number, 
  comparator: (a: T, b: T) => number
): void {
  const temp: T[] = [];
  let leftIndex = start;
  let rightIndex = mid + 1;

  // Merge elements into temporary array
  while (leftIndex <= mid && rightIndex <= end) {
    if (comparator(array[leftIndex], array[rightIndex]) <= 0) {
      temp.push(array[leftIndex]);
      leftIndex++;
    } else {
      temp.push(array[rightIndex]);
      rightIndex++;
    }
  }

  // Copy remaining elements from left half
  while (leftIndex <= mid) {
    temp.push(array[leftIndex]);
    leftIndex++;
  }

  // Copy remaining elements from right half
  while (rightIndex <= end) {
    temp.push(array[rightIndex]);
    rightIndex++;
  }

  // Copy sorted elements back to original array
  for (let i = 0; i < temp.length; i++) {
    array[start + i] = temp[i];
  }
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Usage with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(mergeSort(strings)); // ["apple", "banana", "cherry", "date"]

// Usage with custom comparator
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];

// Sort by age
const sortedByAge = mergeSortWithComparator(people, (a, b) => a.age - b.age);
console.log(sortedByAge);

// In-place sorting
const arrayToSort = [3, 1, 4, 1, 5, 9, 2, 6];
mergeSortInPlace(arrayToSort);
console.log(arrayToSort); // [1, 1, 2, 3, 4, 5, 6, 9]
