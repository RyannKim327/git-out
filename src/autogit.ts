function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  // Select last element as pivot (basic strategy)
  const pivot = arr[arr.length - 1];
  
  // Partition elements
  const left: number[] = [];
  const middle: number[] = [];
  const right: number[] = [];

  for (const num of arr) {
    if (num < pivot) {
      left.push(num);
    } else if (num === pivot) {
      middle.push(num);
    } else {
      right.push(num);
    }
  }

  // Recursively sort partitions and combine results
  return [...quickSort(left), ...middle, ...quickSort(right)];
}
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  // Random pivot selection helps avoid O(n²) worst-case scenarios
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivot = arr[pivotIndex];

  const left: number[] = [];
  const middle: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    // Skip the pivot element itself
    if (i === pivotIndex) continue;
    
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] === pivot) {
      middle.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...middle, ...quickSort(right)];
}
const unsorted = [9, 3, 7, 4, 1, 6, 5, 2, 8];
const sorted = quickSort(unsorted);

console.log(sorted); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
function quickSortGeneric<T>(
  arr: T[],
  comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  if (arr.length <= 1) return arr;
  
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivot = arr[pivotIndex];
  
  const left: T[] = [];
  const middle: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    
    const comparison = comparator(arr[i], pivot);
    comparison < 0 ? left.push(arr[i])
      : comparison > 0 ? right.push(arr[i])
      : middle.push(arr[i]);
  }

  return [
    ...quickSortGeneric(left, comparator),
    pivot,
    ...middle,
    ...quickSortGeneric(right, comparator)
  ];
}

// Usage example:
const strings = ['cherry', 'apple', 'banana'];
const sortedStrings = quickSortGeneric(strings);
// ['apple', 'banana', 'cherry']

const objects = [{age: 25}, {age: 30}, {age: 20}];
const sortedObjects = quickSortGeneric(objects, (a, b) => a.age - b.age);
// Sorted by age property
