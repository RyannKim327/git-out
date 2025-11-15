function insertionSort<T>(array: T[]): T[] {
  // Create a copy to avoid mutating the original array
  const arr = [...array];
  
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    
    // Move elements that are greater than current one position ahead
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert current at the correct position
    arr[j + 1] = current;
  }
  
  return arr;
}
function insertionSort<T>(
  array: T[],
  compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  const arr = [...array];
  
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    
    // Use the comparator function for comparison
    while (j >= 0 && compareFn(arr[j], current) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = current;
  }
  
  return arr;
}
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
// Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(insertionSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]

// Sorting strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(insertionSort(strings)); // ["apple", "banana", "cherry", "date"]

// Using custom comparator for descending order
const sortedDesc = insertionSort(numbers, (a, b) => b - a);
console.log(sortedDesc); // [90, 64, 34, 25, 22, 12, 11]

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
// [{name: "Bob", age: 25}, {name: "Alice", age: 30}, {name: "Charlie", age: 35}]
class InsertionSorter<T> {
  private array: T[];
  
  constructor(array: T[]) {
    this.array = [...array];
  }
  
  sort(compareFn?: (a: T, b: T) => number): T[] {
    const defaultCompare = (a: T, b: T) => 
      a < b ? -1 : a > b ? 1 : 0;
    
    const comparator = compareFn || defaultCompare;
    
    for (let i = 1; i < this.array.length; i++) {
      const current = this.array[i];
      let j = i - 1;
      
      while (j >= 0 && comparator(this.array[j], current) > 0) {
        this.array[j + 1] = this.array[j];
        j--;
      }
      
      this.array[j + 1] = current;
    }
    
    return this.array;
  }
  
  getSortedArray(): T[] {
    return [...this.array];
  }
}

// Usage
const sorter = new InsertionSorter([5, 2, 4, 6, 1, 3]);
console.log(sorter.sort()); // [1, 2, 3, 4, 5, 6]
