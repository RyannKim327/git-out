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

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = quicksort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]
function quicksortInPlace<T>(array: T[], left = 0, right = array.length - 1): T[] {
  if (left < right) {
    const pivotIndex = partition(array, left, right);
    quicksortInPlace(array, left, pivotIndex - 1);
    quicksortInPlace(array, pivotIndex + 1, right);
  }
  return array;
}

function partition<T>(array: T[], left: number, right: number): number {
  const pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
  }

  [array[i + 1], array[right]] = [array[right], array[i + 1]]; // Swap pivot
  return i + 1;
}

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
quicksortInPlace(numbers);
console.log(numbers); // [11, 12, 22, 25, 34, 64, 90]
function quicksortWithComparator<T>(
  array: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (array.length <= 1) return array;

  const pivot = array[0];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 1; i < array.length; i++) {
    if (compare(array[i], pivot) < 0) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [
    ...quicksortWithComparator(left, compare),
    pivot,
    ...quicksortWithComparator(right, compare)
  ];
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];

// Default sorting (ascending)
console.log(quicksortWithComparator(numbers));

// Custom comparator for descending order
console.log(quicksortWithComparator(numbers, (a, b) => b - a));

// String sorting
console.log(quicksortWithComparator(strings));

// Custom object sorting
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "John", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
];

console.log(quicksortWithComparator(people, (a, b) => a.age - b.age));
class QuickSorter<T> {
  constructor(private array: T[], private compare?: (a: T, b: T) => number) {}

  sort(): T[] {
    return this.quicksort([...this.array]);
  }

  private quicksort(arr: T[]): T[] {
    if (arr.length <= 1) return arr;

    const pivot = arr[0];
    const left: T[] = [];
    const right: T[] = [];

    for (let i = 1; i < arr.length; i++) {
      if (this.compareFn(arr[i], pivot) < 0) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [
      ...this.quicksort(left),
      pivot,
      ...this.quicksort(right)
    ];
  }

  private compareFn(a: T, b: T): number {
    if (this.compare) {
      return this.compare(a, b);
    }
    
    // Default comparison
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    
    return String(a).localeCompare(String(b));
  }
}

// Usage
const sorter = new QuickSorter([64, 34, 25, 12, 22, 11, 90]);
console.log(sorter.sort());
// Optimized version with median-of-three pivot selection
function optimizedQuicksort<T>(array: T[]): T[] {
  if (array.length <= 1) return array;
  
  // Median-of-three pivot selection
  const mid = Math.floor(array.length / 2);
  const first = array[0];
  const middle = array[mid];
  const last = array[array.length - 1];
  
  // Find median of first, middle, last
  let pivotIndex = 0;
  if ((first <= middle && middle <= last) || (last <= middle && middle <= first)) {
    pivotIndex = mid;
  } else if ((middle <= first && first <= last) || (last <= first && first <= middle)) {
    pivotIndex = 0;
  } else {
    pivotIndex = array.length - 1;
  }
  
  const pivot = array[pivotIndex];
  const left: T[] = [];
  const right: T[] = [];
  
  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) continue;
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  
  return [...optimizedQuicksort(left), pivot, ...optimizedQuicksort(right)];
}
