function interpolationSearch(
  arr: number[],
  target: number
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // Calculate position using interpolation formula
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / 
      (arr[high] - arr[low])
    );

    if (arr[pos] === target) {
      return pos; // Element found
    }

    if (arr[pos] < target) {
      low = pos + 1; // Search right subarray
    } else {
      high = pos - 1; // Search left subarray
    }
  }

  return -1; // Element not found
}
interface Searchable {
  value: number;
  // You can add other properties if needed
}

function interpolationSearchGeneric<T extends Searchable>(
  arr: T[],
  target: number,
  keySelector: (item: T) => number = (item) => item.value
): number {
  let low = 0;
  let high = arr.length - 1;

  const lowVal = keySelector(arr[low]);
  const highVal = keySelector(arr[high]);

  if (target < lowVal || target > highVal) {
    return -1;
  }

  while (low <= high && target >= lowVal && target <= highVal) {
    const currentLowVal = keySelector(arr[low]);
    const currentHighVal = keySelector(arr[high]);

    const pos = low + Math.floor(
      ((target - currentLowVal) * (high - low)) / 
      (currentHighVal - currentLowVal)
    );

    const posVal = keySelector(arr[pos]);

    if (posVal === target) {
      return pos;
    }

    if (posVal < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1;
}
class InterpolationSearch {
  /**
   * Performs interpolation search on a sorted array
   * @param arr Sorted array of numbers
   * @param target Target value to search for
   * @returns Index of the target or -1 if not found
   */
  static search(
    arr: number[],
    target: number
  ): number {
    // Input validation
    if (!Array.isArray(arr)) {
      throw new Error('Input must be an array');
    }

    if (arr.length === 0) {
      return -1;
    }

    let low = 0;
    let high = arr.length - 1;

    // Early exit if target is out of bounds
    if (target < arr[low] || target > arr[high]) {
      return -1;
    }

    while (low <= high) {
      // Prevent division by zero
      if (arr[low] === arr[high]) {
        return arr[low] === target ? low : -1;
      }

      // Interpolation formula
      const pos = low + Math.floor(
        ((target - arr[low]) * (high - low)) / 
        (arr[high] - arr[low])
      );

      // Ensure position is within bounds
      if (pos < low || pos > high) {
        break;
      }

      if (arr[pos] === target) {
        return pos;
      }

      if (arr[pos] < target) {
        low = pos + 1;
      } else {
        high = pos - 1;
      }
    }

    return -1;
  }
}
// Example 1: Basic usage
const sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const target = 70;

const result = InterpolationSearch.search(sortedArray, target);
console.log(`Element found at index: ${result}`); // Output: 6

// Example 2: Generic usage with objects
interface Person {
  id: number;
  name: string;
  age: number;
}

const people: Person[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
  { id: 4, name: "Diana", age: 40 }
];

const ageResult = interpolationSearchGeneric(
  people,
  35,
  (person) => person.age
);
console.log(`Person with age 35 found at index: ${ageResult}`); // Output: 2

// Example 3: Edge cases
console.log(InterpolationSearch.search([], 10)); // -1
console.log(InterpolationSearch.search([5], 5)); // 0
console.log(InterpolationSearch.search([1, 2, 3], 4)); // -1
class InterpolationSearchBenchmark {
  static comparePerformance() {
    const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2); // Even numbers
    
    // Test interpolation search
    console.time('Interpolation Search');
    const result1 = InterpolationSearch.search(largeArray, 500000);
    console.timeEnd('Interpolation Search');
    
    // Test binary search for comparison
    console.time('Binary Search');
    const result2 = binarySearch(largeArray, 500000);
    console.timeEnd('Binary Search');
    
    console.log(`Results: ${result1}, ${result2}`);
  }
}

// Binary search for comparison
function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  
  return -1;
}
