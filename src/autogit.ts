function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(element => array2.includes(element));
}

// Example Usage:
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const common = findCommonElements(arr1, arr2); // Result: [3, 4]
function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return array1.filter(element => set2.has(element));
}

// Example Usage:
const arrA = ['a', 'b', 'c', 'c'];
const arrB = ['b', 'c', 'd'];
const common = findCommonElements(arrA, arrB); // Result: ['b', 'c', 'c']
