class HeapSort<T> {
  private heapSize: number = 0;

  public sort(array: T[]): T[] {
    if (array.length <= 1) return array;

    // Create a copy to avoid modifying the original array
    const result = [...array];
    this.heapSize = result.length;

    // Build max heap
    this.buildMaxHeap(result);

    // Extract elements from heap one by one
    for (let i = result.length - 1; i > 0; i--) {
      // Move current root to end
      this.swap(result, 0, i);
      this.heapSize--;
      
      // Call maxHeapify on the reduced heap
      this.maxHeapify(result, 0);
    }

    return result;
  }

  private buildMaxHeap(array: T[]): void {
    for (let i = Math.floor(this.heapSize / 2); i >= 0; i--) {
      this.maxHeapify(array, i);
    }
  }

  private maxHeapify(array: T[], index: number): void {
    const left = this.leftChild(index);
    const right = this.rightChild(index);
    let largest = index;

    // Compare with left child
    if (left < this.heapSize && array[left] > array[largest]) {
      largest = left;
    }

    // Compare with right child
    if (right < this.heapSize && array[right] > array[largest]) {
      largest = right;
    }

    // If largest is not the current index, swap and heapify
    if (largest !== index) {
      this.swap(array, index, largest);
      this.maxHeapify(array, largest);
    }
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private swap(array: T[], i: number, j: number): void {
    [array[i], array[j]] = [array[j], array[i]];
  }
}
class GenericHeapSort<T> {
  private heapSize: number = 0;

  public sort(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
  ): T[] {
    if (array.length <= 1) return array;

    const result = [...array];
    this.heapSize = result.length;

    this.buildMaxHeap(result, compareFn);

    for (let i = result.length - 1; i > 0; i--) {
      this.swap(result, 0, i);
      this.heapSize--;
      this.maxHeapify(result, 0, compareFn);
    }

    return result;
  }

  private buildMaxHeap(array: T[], compareFn: (a: T, b: T) => number): void {
    for (let i = Math.floor(this.heapSize / 2); i >= 0; i--) {
      this.maxHeapify(array, i, compareFn);
    }
  }

  private maxHeapify(
    array: T[], 
    index: number, 
    compareFn: (a: T, b: T) => number
  ): void {
    const left = this.leftChild(index);
    const right = this.rightChild(index);
    let largest = index;

    if (left < this.heapSize && compareFn(array[left], array[largest]) > 0) {
      largest = left;
    }

    if (right < this.heapSize && compareFn(array[right], array[largest]) > 0) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(array, index, largest);
      this.maxHeapify(array, largest, compareFn);
    }
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private swap(array: T[], i: number, j: number): void {
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function heapSort<T>(
  array: T[], 
  compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  if (array.length <= 1) return [...array];

  let heapSize = array.length;
  const result = [...array];

  const swap = (arr: T[], i: number, j: number): void => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const leftChild = (index: number): number => 2 * index + 1;
  const rightChild = (index: number): number => 2 * index + 2;

  const maxHeapify = (arr: T[], index: number): void => {
    const left = leftChild(index);
    const right = rightChild(index);
    let largest = index;

    if (left < heapSize && compareFn(arr[left], arr[largest]) > 0) {
      largest = left;
    }

    if (right < heapSize && compareFn(arr[right], arr[largest]) > 0) {
      largest = right;
    }

    if (largest !== index) {
      swap(arr, index, largest);
      maxHeapify(arr, largest);
    }
  };

  const buildMaxHeap = (arr: T[]): void => {
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
      maxHeapify(arr, i);
    }
  };

  buildMaxHeap(result);

  for (let i = result.length - 1; i > 0; i--) {
    swap(result, 0, i);
    heapSize--;
    maxHeapify(result, 0);
  }

  return result;
}
// Basic usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
const heapSort = new HeapSort<number>();
const sortedNumbers = heapSort.sort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

// Generic usage with strings
const genericHeapSort = new GenericHeapSort<string>();
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = genericHeapSort.sort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]

// Custom comparator for descending order
const sortedDesc = genericHeapSort.sort(numbers, (a, b) => b - a);
console.log(sortedDesc); // [90, 64, 34, 25, 22, 12, 11]

// Functional approach
const functionalSorted = heapSort([3, 1, 4, 1, 5, 9, 2, 6]);
console.log(functionalSorted); // [1, 1, 2, 3, 4, 5, 6, 9]
