function insertionSort<T>(array: T[]): T[] {
  const result = [...array]; // Create a copy to avoid mutating original
  
  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;
    
    // Move elements that are greater than current
    // one position ahead of their current position
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }
    
    result[j + 1] = current;
  }
  
  return result;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = insertionSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]
function insertionSort<T>(
  array: T[],
  comparator: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
): T[] {
  const result = [...array];
  
  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;
    
    while (j >= 0 && comparator(result[j], current) > 0) {
      result[j + 1] = result[j];
      j--;
    }
    
    result[j + 1] = current;
  }
  
  return result;
}

// Example usage with custom comparator
const descendingComparator = (a: number, b: number) => b - a;
const descendingSorted = insertionSort([3, 1, 4, 1, 5], descendingComparator);
console.log(descendingSorted); // [5, 4, 3, 1, 1]

// Sorting objects
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
];

const sortedByAge = insertionSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
function insertionSortInPlace<T>(array: T[]): T[] {
  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;
    
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    
    array[j + 1] = current;
  }
  
  return array;
}

// Usage
const mutableArray = [5, 2, 8, 1, 9];
insertionSortInPlace(mutableArray);
console.log(mutableArray); // [1, 2, 5, 8, 9] - original array is modified
// Test with various data types
const testCases = [
  [5, 2, 4, 6, 1, 3],
  ['banana', 'apple', 'date', 'cherry'],
  [3.14, 1.41, 2.71, 0.577]
];

testCases.forEach(testCase => {
  console.log(`Original: ${testCase}`);
  console.log(`Sorted: ${insertionSort(testCase)}`);
});
