function mergeSort<T>(array: T[]): T[] {
  // Base case: arrays with 0 or 1 element are already sorted
  if (array.length <= 1) {
    return array;
  }

  // Find the middle point to divide the array into two halves
  const middle = Math.floor(array.length / 2);
  
  // Divide the array into left and right halves
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  // Recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both arrays and add the smaller one to result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from left array
  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  // Add remaining elements from right array
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}
// Example usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// Example usage with strings
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]

// Example usage with custom objects
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
  { name: "Bob", age: 35 }
];

// Sort by age using a custom comparator
const sortedPeople = mergeSort(people, (a, b) => a.age - b.age);
console.log(sortedPeople);
// [{ name: "Jane", age: 25 }, { name: "John", age: 30 }, { name: "Bob", age: 35 }]
function mergeSort<T>(
  array: T[],
  comparator?: (a: T, b: T) => number
): T[] {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const sortedLeft = mergeSort(left, comparator);
  const sortedRight = mergeSort(right, comparator);

  return mergeWithComparator(sortedLeft, sortedRight, comparator);
}

function mergeWithComparator<T>(
  left: T[],
  right: T[],
  comparator?: (a: T, b: T) => number
): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  const compare = comparator || defaultComparator;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (compare(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function defaultComparator<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
