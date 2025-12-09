function isSortedAscending<T>(array: T[]): boolean {
  // Handle edge cases: empty or single-element arrays are always sorted
  if (array.length <= 1) {
    return true;
  }

  // Start from the second element (index 1) and compare with the previous one
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) {
      return false; // Found an element that's smaller than the previous one
    }
  }
  return true; // All elements were in order
}

// Usage Examples:
const sortedNumbers = [1, 2, 3, 4, 5];
const unsortedNumbers = [5, 2, 8, 1, 3];
const singleElement = [42];
const emptyArray: number[] = [];

console.log(isSortedAscending(sortedNumbers)); // Output: true
console.log(isSortedAscending(unsortedNumbers)); // Output: false
console.log(isSortedAscending(singleElement)); // Output: true
console.log(isSortedAscending(emptyArray)); // Output: true
function isSortedAscending<T>(array: T[]): boolean {
  // For every element starting at index 1, check if it's >= the previous element.
  // The first element (i=0) has no previous element, so we skip it.
  return array.every((value, index) => index === 0 || array[index - 1] <= value);
}

// Usage is the same as above
function isSortedAscending<T>(array: T[]): boolean {
  // Create a sorted copy of the array and compare it to the original
  const sortedCopy = [...array].sort((a, b) => (a > b ? 1 : -1));
  // Compare every element. This is also O(n), making the whole function O(n log n)
  return JSON.stringify(array) === JSON.stringify(sortedCopy); 
}

// WARNING: This method is inefficient and can have issues with complex objects.
// Define an interface for your object
interface Person {
  name: string;
  age: number;
}

// The function now takes a custom comparator
function isSortedAscending<T>(
  array: T[],
  comparator: (a: T, b: T) => number
): boolean {
  if (array.length <= 1) {
    return true;
  }

  for (let i = 1; i < array.length; i++) {
    // Use the comparator. For ascending order, a previous element (a)
    // should not be GREATER than the current element (b).
    if (comparator(array[i - 1], array[i]) > 0) {
      return false;
    }
  }
  return true;
}

// Usage with custom objects:
const people: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

const unsortedPeople: Person[] = [
  { name: "Bob", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Charlie", age: 35 }
];

// Create a comparator function for the 'age' property
const ageComparator = (a: Person, b: Person) => a.age - b.age;

console.log(isSortedAscending(people, ageComparator)); // Output: true
console.log(isSortedAscending(unsortedPeople, ageComparator)); // Output: false
