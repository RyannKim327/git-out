function insertionSort<T>(
  array: T[],
  comparator: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  // Create a copy to avoid mutating the original array
  const arr = [...array];
  
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;

    // Find the correct position to insert the current element
    while (j >= 0 && comparator(arr[j], current) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert the current element at the correct position
    arr[j + 1] = current;
  }
  
  return arr;
}

// Example Usage:
const numbers = [5, 2, 4, 6, 1, 3];
const sortedNumbers = insertionSort(numbers, (a, b) => a - b);
console.log(sortedNumbers); // [1, 2, 3, 4, 5, 6]

const strings = ["cherry", "apple", "date", "banana"];
const sortedStrings = insertionSort(strings, (a, b) => a.localeCompare(b));
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]

const objects = [
  { name: "John", age: 25 },
  { name: "Alice", age: 20 },
  { name: "Bob", age: 30 }
];
const sortedObjects = insertionSort(objects, (a, b) => a.age - b.age);
console.log(sortedObjects);
// [{name: 'Alice', age: 20}, {name: 'John', age: 25}, {name: 'Bob', age: 30}]
