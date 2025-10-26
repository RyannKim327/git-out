function bubbleSort<T>(arr: T[]): T[] {
  const n = arr.length;
  const sortedArray = [...arr]; // Create a copy to avoid mutating original
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArray[j] > sortedArray[j + 1]) {
        // Swap elements
        [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
      }
    }
  }
  
  return sortedArray;
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

const strings = ["banana", "apple", "cherry", "date"];
console.log(bubbleSort(strings)); // ["apple", "banana", "cherry", "date"]
function optimizedBubbleSort<T>(arr: T[]): T[] {
  const n = arr.length;
  const sortedArray = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArray[j] > sortedArray[j + 1]) {
        // Swap elements
        [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, array is already sorted
    if (!swapped) {
      break;
    }
  }
  
  return sortedArray;
}
function bubbleSortWithComparator<T>(
  arr: T[], 
  compareFn: (a: T, b: T) => number = (a, b) => a > b ? 1 : -1
): T[] {
  const n = arr.length;
  const sortedArray = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (compareFn(sortedArray[j], sortedArray[j + 1]) > 0) {
        [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
  }
  
  return sortedArray;
}

// Usage with custom comparator
const objects = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

const sortedByAge = bubbleSortWithComparator(
  objects, 
  (a, b) => a.age - b.age
);
console.log(sortedByAge);
// [{name: "Alice", age: 25}, {name: "John", age: 30}, {name: "Bob", age: 35}]
function bubbleSortInPlace<T>(arr: T[]): void {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
  }
}

// Usage
const myArray = [5, 2, 8, 1, 9];
bubbleSortInPlace(myArray);
console.log(myArray); // [1, 2, 5, 8, 9] - original array is modified
