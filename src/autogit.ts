/**
 * Heap Sort Algorithm Implementation
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */

class HeapSort {
  /**
   * Main heap sort function
   * @param arr - Array to be sorted
   * @returns Sorted array
   */
  public static heapSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const n = arr.length;

    // Build max heap
    this.buildMaxHeap(arr, n);

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      
      // Call max heapify on the reduced heap
      this.maxHeapify(arr, 0, i);
    }

    return arr;
  }

  /**
   * Build max heap from the given array
   * @param arr - Array to build heap from
   * @param n - Size of heap
   */
  private static buildMaxHeap(arr: number[], n: number): void {
    // Start from the last non-leaf node and heapify each node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.maxHeapify(arr, i, n);
    }
  }

  /**
   * Maintains the max heap property
   * @param arr - Array representing the heap
   * @param i - Index of the node to heapify
   * @param n - Size of heap
   */
  private static maxHeapify(arr: number[], i: number, n: number): void {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // If largest is not root
    if (largest !== i) {
      // Swap with largest child
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      
      // Recursively heapify the affected subtree
      this.maxHeapify(arr, largest, n);
    }
  }

  /**
   * Utility method to get parent index
   * @param i - Index of child
   * @returns Parent index
   */
  private static getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  /**
   * Utility method to get left child index
   * @param i - Index of parent
   * @returns Left child index
   */
  private static getLeftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  /**
   * Utility method to get right child index
   * @param i - Index of parent
   * @returns Right child index
   */
  private static getRightChildIndex(i: number): number {
    return 2 * i + 2;
  }
}

// Example usage and testing
function demonstrateHeapSort(): void {
  // Test cases
  const testArrays = [
    [64, 34, 25, 12, 22, 11, 90], // Unsorted
    [12, 11, 13, 5, 6, 7],        // Another unsorted
    [1],                           // Single element
    [],                            // Empty array
    [3, 2, 1],                     // Reverse sorted
    [1, 2, 3]                      // Already sorted
  ];

  testArrays.forEach((arr, index) => {
    console.log(`\nTest ${index + 1}:`);
    console.log('Original:', [...arr]);
    
    const sorted = HeapSort.heapSort([...arr]);
    console.log('Sorted:  ', sorted);
    
    // Verify correctness
    const isSorted = sorted.every((value, index) => 
      index === 0 || sorted[index] >= sorted[index - 1]
    );
    console.log('Correct:', isSorted);
  });
}

// Generic version that works with any comparable type
class GenericHeapSort<T> {
  /**
   * Heap sort for generic types
   * @param arr - Array to sort
   * @param compare - Comparison function (a, b) => 0 if equal, negative if a < b, positive if a > b
   * @returns Sorted array
   */
  public static heapSort<T>(
    arr: T[], 
    compare: (a: T, b: T) => number = (a: T, b: T) => (a as any) - (b as any)
  ): T[] {
    if (arr.length <= 1) return arr;

    const n = arr.length;

    // Build max heap using custom comparator
    this.buildMaxHeap(arr, n, compare);

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.maxHeapify(arr, 0, i, compare);
    }

    return arr;
  }

  private static buildMaxHeap<T>(
    arr: T[], 
    n: number, 
    compare: (a: T, b: T) => number
  ): void {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.maxHeapify(arr, i, n, compare);
    }
  }

  private static maxHeapify<T>(
    arr: T[], 
    i: number, 
    n: number, 
    compare: (a: T, b: T) => number
  ): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && compare(arr[left], arr[largest]) > 0) {
      largest = left;
    }

    if (right < n && compare(arr[right], arr[largest]) > 0) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      this.maxHeapify(arr, largest, n, compare);
    }
  }
}

// Example usage of generic version
function demonstrateGenericHeapSort(): void {
  // Sorting strings
  const strings = ['banana', 'apple', 'cherry', 'date'];
  console.log('\nString sorting:');
  console.log('Original:', [...strings]);
  console.log('Sorted:  ', GenericHeapSort.heapSort([...strings], (a, b) => a.localeCompare(b)));
  
  // Sorting objects by age
  interface Person {
    name: string;
    age: number;
  }
  
  const people: Person[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
    { name: 'Diana', age: 28 }
  ];
  
  console.log('\nObject sorting by age:');
  console.log('Original:', JSON.stringify(people, null, 2));
  const sortedPeople = GenericHeapSort.heapSort([...people], (a, b) => a.age - b.age);
  console.log('Sorted:  ', JSON.stringify(sortedPeople, null, 2));
}

// Run demonstrations
if (require.main === module) {
  demonstrateHeapSort();
  demonstrateGenericHeapSort();
}

export { HeapSort, GenericHeapSort };
// Basic numeric sorting
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = HeapSort.heapSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// Generic sorting for strings
const fruits = ['banana', 'apple', 'cherry'];
const sortedFruits = GenericHeapSort.heapSort(fruits, (a, b) => a.localeCompare(b));
