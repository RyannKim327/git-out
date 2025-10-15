function quicksortBasic(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quicksortBasic(left), pivot, ...quicksortBasic(right)];
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sorted = quicksortBasic(numbers);
console.log(sorted); // [1, 1, 2, 3, 6, 8, 10]
function quicksortInPlace(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quicksortInPlace(arr, low, pivotIndex - 1);
    quicksortInPlace(arr, pivotIndex + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
quicksortInPlace(numbers);
console.log(numbers); // [1, 1, 2, 3, 6, 8, 10]
function quicksortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) return arr;
  
  const defaultCompare = (a: T, b: T): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };
  
  const compare = compareFn || defaultCompare;
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (compare(arr[i], pivot) <= 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [
    ...quicksortGeneric(left, compare),
    pivot,
    ...quicksortGeneric(right, compare)
  ];
}

// Usage with numbers
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sortedNumbers = quicksortGeneric(numbers);
console.log(sortedNumbers);

// Usage with custom objects
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 20 }
];

const sortedByAge = quicksortGeneric(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
function quicksortOptimized(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  // Random pivot selection for better average performance
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivot = arr[pivotIndex];
  
  const left: number[] = [];
  const right: number[] = [];
  const equal: number[] = [];
  
  for (const item of arr) {
    if (item < pivot) left.push(item);
    else if (item > pivot) right.push(item);
    else equal.push(item);
  }
  
  return [
    ...quicksortOptimized(left),
    ...equal,
    ...quicksortOptimized(right)
  ];
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sorted = quicksortOptimized(numbers);
console.log(sorted);
class QuickSort {
  static sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) return arr;
    
    const comparator = compareFn || this.defaultComparator;
    const pivot = arr[Math.floor(arr.length / 2)];
    
    const left: T[] = [];
    const right: T[] = [];
    const equal: T[] = [];
    
    for (const item of arr) {
      const comparison = comparator(item, pivot);
      if (comparison < 0) left.push(item);
      else if (comparison > 0) right.push(item);
      else equal.push(item);
    }
    
    return [
      ...this.sort(left, comparator),
      ...equal,
      ...this.sort(right, comparator)
    ];
  }
  
  private static defaultComparator<T>(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sorted = QuickSort.sort(numbers);
console.log(sorted);
